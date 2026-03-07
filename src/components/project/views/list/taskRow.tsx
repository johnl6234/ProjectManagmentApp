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

interface Props {
	projectId: string;
	task: Task;
	columns: Column[];
	isSubtask: boolean;
}

export default function TaskRow({ task, projectId, columns, isSubtask = false }: Props) {
	const [subtasksOpen, setSubtasksOpen] = useState(false);

	const navigate = useNavigate();
	const selectSubtasksMemo = useMemo(makeSelectSubtasksForTask, []);
	const subtasks = useAppSelector(state => selectSubtasksMemo(state, task.id));

	return (
		<div>
			<div className={`task-row ${isSubtask ? 'subtask-list-row' : ''}`}>
				<span onClick={() => setSubtasksOpen(prev => !prev)}>
					{subtasks.length > 0 &&
						(subtasksOpen ? <FaChevronUp size={25} /> : <FaChevronDown size={25} />)}
				</span>
				<TaskRowTitle task={task} isSubtask={isSubtask} />
				<TaskRowStatus task={task} columns={columns} />
				<TaskRowAssignee task={task} />
				<TaskRowDueDate task={task} />
				<TaskRowActions
					task={task}
					navigate={() => navigate(`/project/${projectId}/task/${task.id}`)}
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
		</div>
	);
}
