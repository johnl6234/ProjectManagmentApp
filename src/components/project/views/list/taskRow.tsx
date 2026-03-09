import { useNavigate } from 'react-router-dom';
import type { Column } from '../../../../types/column';
import type { Task } from '../../../../types/task';
import TaskRowActions from './taskRowAction';
import TaskRowAssignee from './taskRowAssignee';
import TaskRowDueDate from './taskRowDueDate';
import TaskRowStatus from './taskRowStatus';
import TaskRowTitle from './taskRowTitle';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { makeSelectSubtasksForTask } from '../../../../store/taskSlice';
import { deleteTask } from '../../../../services/tasks';
import { registerConfirmAction } from '../../../../store/confirmationActions';
import { openConfirm } from '../../../../store/confirmSlice';
import { useDispatch } from 'react-redux';

interface Props {
	projectId: string;
	task: Task;
	columns: Column[];
	isSubtask: boolean;
}

export default function TaskRow({ task, projectId, columns, isSubtask = false }: Props) {
	const [subtasksOpen, setSubtasksOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const selectSubtasksMemo = useMemo(makeSelectSubtasksForTask, []);
	const subtasks = useAppSelector(state => selectSubtasksMemo(state, task.id));

	const handleDeleteTask = async () => {
		if (!projectId || !task) return;

		const id = crypto.randomUUID();

		registerConfirmAction(id, async () => {
			await deleteTask(projectId, task.id);
		});

		dispatch(
			openConfirm({
				message: `Delete ${task.title}!`,
				actionId: id,
			})
		);
	};
	return (
		<>
			<div className={`task-row ${isSubtask ? 'subtask-list-row' : ''}`}>
				<div className='border-hover align-center'>
					<span className='no-padding' onClick={() => setSubtasksOpen(prev => !prev)}>
						{subtasks.length > 0 &&
							(subtasksOpen ? (
								<FaChevronUp size={25} />
							) : (
								<FaChevronDown size={25} />
							))}
					</span>
				</div>
				<div className='border-hover align-center'>
					<TaskRowTitle task={task} />
				</div>
				<div className='border-hover'>
					<TaskRowStatus task={task} columns={columns} />
				</div>
				<div className='border-hover'>
					<TaskRowAssignee task={task} />
				</div>
				<div className='border-hover'>
					{' '}
					<TaskRowDueDate task={task} />
				</div>
				<TaskRowActions
					navigate={() => navigate(`/project/${projectId}/task/${task.id}`)}
					handleDeleteTask={handleDeleteTask}
				/>
			</div>
			{subtasksOpen &&
				subtasks.map(sub => (
					<TaskRow
						projectId={projectId}
						key={sub.id}
						task={sub}
						columns={columns}
						isSubtask={true}
					/>
				))}
		</>
	);
}
