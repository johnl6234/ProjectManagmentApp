import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot, type DocumentData } from 'firebase/firestore';
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
import { checklistSelectors, setChecklists } from '../store/checklistSlice';
import Checklist from '../components/tasks/checklist';

export default function TaskPage() {
	const { projectId, taskId } = useParams();
	const [task, setTask] = useState<DocumentData | null>(null);
	const dispatch = useDispatch();

	const subtasks = useAppSelector((state: RootState) =>
		taskSelectors.selectAll(state).filter(t => t.parentId === taskId)
	);
	const checklists = useAppSelector(state =>
		checklistSelectors.selectAll(state).filter(c => c.taskId === taskId)
	);
	const columns = useAppSelector(selectColumnsForProject(projectId!));

	useEffect(() => {
		if (!projectId || !taskId) return;

		const refTask = doc(db, 'projects', projectId, 'tasks', taskId);

		const unsubTasks = onSnapshot(refTask, snap => {
			if (snap.exists()) {
				const data = snap.data();
				setTask({ id: snap.id, ...data });
			}
		});
		const refCheck = collection(db, 'projects', projectId, 'tasks', taskId, 'checklists');

		const unsubCheck = onSnapshot(refCheck, snap => {
			const lists = snap.docs.map(doc => {
				const data = doc.data();

				return {
					id: doc.id,
					taskId: data.taskId ?? '',
					completed: data.completed ?? false,
					createdAt:
						typeof data.createdAt === 'string'
							? data.createdAt
							: (data.createdAt?.toMillis?.() ?? 0).toString(),
					updatedAt:
						typeof data.updatedAt === 'string'
							? data.updatedAt
							: (data.updatedAt?.toMillis?.() ?? 0).toString(),
					title: data.title ?? '',
				};
			});

			dispatch(setChecklists(lists));
		});
		window.__taskUnsubscribers = [unsubTasks, unsubCheck];

		return () => {
			unsubTasks();
			unsubCheck();
		};
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

			{/* <button>Create checklist</button> */}
			{checklists.map(list => (
				<Checklist projectId={projectId} taskId={task.id} checklist={list} />
			))}
			{/* Cost, comments, subtasks, etc. */}
		</div>
	);
}
