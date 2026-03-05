import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Task } from '../types/task';
import TaskInfoHeader from '../components/tasks/taskInfoHeader';
import { EditableTextArea } from '../components/FormInputs/EditableTextArea';
import { updateTask } from '../services/tasks';
import { useDispatch } from 'react-redux';
import { taskSelectors, updateStoreTask } from '../store/taskSlice';
import { selectColumnsForProject } from '../store/columnSlice';
import { EditableText } from '../components/FormInputs/EditableText';
import type { RootState } from '../store';
import { useAppSelector } from '../store/hooks';
import Subtasks from '../components/tasks/subtasks';

export default function TaskPage() {
	const { projectId, taskId } = useParams();
	const [task, setTask] = useState<DocumentData | null>(null);
	const dispatch = useDispatch();

	const subtasks = useAppSelector((state: RootState) =>
		taskSelectors.selectAll(state).filter(t => t.parentId === taskId)
	);

	const columns = useAppSelector(selectColumnsForProject(projectId!));

	useEffect(() => {
		if (!projectId || !taskId) return;

		const ref = doc(db, 'projects', projectId, 'tasks', taskId);

		const unsub = onSnapshot(ref, snap => {
			if (snap.exists()) {
				const data = snap.data();
				setTask({ id: snap.id, ...data });
			}
		});
		window.__taskUnsubscribers = [unsub];

		return () => unsub();
	}, [projectId, taskId]);

	if (!task || !projectId) return <div>Loading task…</div>;

	const updateTaskField = async (field: string, newValue: string) => {
		if (!projectId || !task) return;

		await updateTask(projectId, task.id, { [field]: newValue });
		dispatch(updateStoreTask({ id: task.id, changes: { [field]: newValue } }));

		if (field == 'status') {
			const column = columns.find(c => c.status === newValue);
			await updateTask(projectId, task.id, { columnId: column?.id });
			dispatch(updateStoreTask({ id: task.id, changes: { columnId: column?.id } }));
		}
	};

	return (
		<div className='task-page'>
			<EditableText
				value={task.title}
				onSave={(newValue: string) => updateTaskField('title', newValue)}
				placeholder={''}
			/>

			<TaskInfoHeader
				task={task as Task}
				onSave={(field: string, newValue: string) => updateTaskField(field, newValue)}
			/>

			<EditableTextArea
				value={task.description}
				onSave={(newValue: string) => updateTaskField('description', newValue)}
			/>

			<Subtasks subtasks={subtasks} projectId={projectId} parentTaskId={task.id} />

			<button>Create checklist</button>

			{/* Cost, comments, subtasks, etc. */}
		</div>
	);
}
