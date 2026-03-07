import BoardColumn from './board/boardColumn';
import { useParams } from 'react-router-dom';
import { makeSelectColumnsForProject } from '../../../store/columnSlice';
import { useAppSelector } from '../../../store/hooks';
import { useMemo } from 'react';
import { makeSelectTasksForProject } from '../../../store/taskSlice';

const BoardView = () => {
	const { projectId } = useParams();
	if (!projectId) return;

	const selectColumnsMemo = useMemo(makeSelectColumnsForProject, []);
	const columns = useAppSelector(state => (projectId ? selectColumnsMemo(state, projectId) : []));

	const selectTaskMemo = useMemo(makeSelectTasksForProject, []);
	const tasks = useAppSelector(state => (projectId ? selectTaskMemo(state, projectId) : []));

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
