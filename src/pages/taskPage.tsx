import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Task } from '../types/task';
import TaskInfoHeader from '../components/tasks/taskInfoHeader';
import { EditableTextArea } from '../components/FormInputs/EditableTextArea';
import { deleteTask, updateTask } from '../services/tasks';
import { useDispatch } from 'react-redux';
import { makeSelectSubtasksForTask, updateStoreTask } from '../store/taskSlice';
import { makeSelectColumnsForProject } from '../store/columnSlice';
import { EditableText } from '../components/FormInputs/EditableText';
import { useAppSelector } from '../store/hooks';
import Subtasks from '../components/tasks/subtasks';
import { makeSelectChecklistsForTask, setChecklists } from '../store/checklistSlice';
import Checklist from '../components/tasks/checklist';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import { useClickOutside } from '../hooks/useClickOutside';
import { registerConfirmAction } from '../store/confirmationActions';
import { openConfirm } from '../store/confirmSlice';
import { createChecklist } from '../services/checklist';

export default function TaskPage() {
	const { projectId, taskId } = useParams();
	if (!projectId || !taskId) return;

	const [task, setTask] = useState<DocumentData | null>(null);
	const [optionsOpen, setOptionsOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const optionRef = useRef<HTMLDivElement>(null);
	useClickOutside(optionRef, () => setOptionsOpen(false));

	const selectColumnsMemo = useMemo(makeSelectColumnsForProject, []);
	const columns = useAppSelector(state => selectColumnsMemo(state, projectId));

	const selectSubtasks = useMemo(makeSelectSubtasksForTask, []);
	const subtasks = useAppSelector(state => selectSubtasks(state, taskId));

	const selectChecklists = useMemo(makeSelectChecklistsForTask, []);
	const checklists = useAppSelector(state => selectChecklists(state, taskId));

	const lastView = useAppSelector(state => state.ui.lastView);

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
			console.log('list', lists);
			dispatch(setChecklists(lists));
		});
		window.__taskUnsubscribers = [unsubTasks, unsubCheck];

		return () => {
			unsubTasks();
			unsubCheck();
		};
	}, [projectId, taskId]);

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

	const openConfirmModal = async () => {
		if (!projectId || !task) return;

		const id = crypto.randomUUID();

		registerConfirmAction(id, async () => {
			await deleteTask(projectId, task.id);
			navigate(`/project/${projectId}/${lastView}`);
		});

		dispatch(
			openConfirm({
				message: `Delete ${task.title}!`,
				actionId: id,
			})
		);
	};

	if (!task || !projectId) return <div>Loading task…</div>;
	return (
		<div className='task-page'>
			<div className='task-title-header'>
				<EditableText
					value={task.title}
					onSave={(newValue: string) => updateTaskField('title', newValue)}
					placeholder={''}
					id={task.title}
					disabled={false}
				/>
				<button onClick={() => setOptionsOpen(prev => !prev)}>
					<HiOutlineCog8Tooth size={30} />
				</button>
				{optionsOpen && (
					<div ref={optionRef} className='project-options'>
						<button onClick={() => openConfirmModal()}>Delete</button>
					</div>
				)}
			</div>

			<TaskInfoHeader
				task={task as Task}
				onSave={(field: string, newValue: string) => updateTaskField(field, newValue)}
			/>

			<EditableTextArea
				value={task.description}
				onSave={(newValue: string) => updateTaskField('description', newValue)}
			/>

			<Subtasks subtasks={subtasks} projectId={projectId} parentTaskId={task.id} />

			<div className='no-padding'>
				{checklists.map(list => (
					<Checklist
						key={list.id}
						projectId={projectId}
						taskId={task.id}
						checklist={list}
					/>
				))}
				<button onClick={() => createChecklist(projectId, taskId)}>
					Add new checklist
				</button>
			</div>

			{/* Cost, comments, subtasks, etc. */}
		</div>
	);
}
