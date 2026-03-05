import BoardColumn from './board/boardColumn';
import { useParams } from 'react-router-dom';
import { selectColumnsForProject, selectTasksForProject } from '../../../store/columnSlice';
import { useAppSelector } from '../../../store/hooks';

const BoardView = () => {
	const { projectId } = useParams();
	if (!projectId) return;

	const columns = useAppSelector(selectColumnsForProject(projectId));
	const tasks = useAppSelector(selectTasksForProject(projectId));

	return (
		<div className='board'>
			<div className='board-container'>
				{columns.map(col => (
					<BoardColumn
						key={col.id}
						column={col}
						tasks={tasks.filter(t => t.columnId === col.id)}
					/>
				))}
			</div>
		</div>
	);
};
export default BoardView;
