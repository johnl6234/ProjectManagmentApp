import { useNavigate } from 'react-router-dom';
import type { Task } from '../../../../types/task';
import { DEFAULT_COLUMNS } from '../../../../types/column';
import { LuMessageSquare } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { getUser } from '../../../../services/user';

interface Props {
	task: Task;
}

const TaskCard = ({ task }: Props) => {
	const [assignedUser, setAssignedUser] = useState<any>(null);

	useEffect(() => {
		if (!task.assigneeId) return;

		getUser(task.assigneeId).then(setAssignedUser).catch(console.error);
	}, [task.assigneeId]);

	const column = DEFAULT_COLUMNS.find(c => c.status === task.status);
	const borderColor = column?.color ?? '#ccc';
	const navigate = useNavigate();
	const commentCount = 0; //TODO fetch real numbers

	return (
		<div className='task-card'>
			<div
				className='task-card-title'
				onClick={() => navigate(`/project/${task.projectId}/task/${task.id}`)}>
				{task.title}
			</div>
			<div
				className='task-card-body'
				style={{ '--column-color': borderColor } as React.CSSProperties}>
				{task.description && <div className='task-desc'>{task.description}</div>}
			</div>
			<div className='task-card-footer'>
				<div className='card-task-comment-count'>
					<LuMessageSquare />
					{commentCount}
				</div>
				{assignedUser && (
					<img
						src={assignedUser.avatarUrl}
						alt={assignedUser.name}
						className='task-card-assignee'
					/>
				)}
			</div>
		</div>
	);
};
export default TaskCard;
