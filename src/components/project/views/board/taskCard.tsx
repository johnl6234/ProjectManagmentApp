import { useNavigate } from 'react-router-dom';
import type { Task } from '../../../../types/task';
import { DEFAULT_COLUMNS } from '../../../../types/column';
import { LuMessageSquare } from 'react-icons/lu';

interface Props {
	task: Task;
}

const TaskCard = ({ task }: Props) => {
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
				<LuMessageSquare size={25} />
				{commentCount}
			</div>
		</div>
	);
};
export default TaskCard;
