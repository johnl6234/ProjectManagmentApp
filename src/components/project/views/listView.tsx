import { useMemo } from 'react';
import { makeSelectColumnsForProject } from '../../../store/columnSlice';
import { useAppSelector } from '../../../store/hooks';
import TaskRow from './list/taskRow';
import { useParams } from 'react-router-dom';
import { makeSelectTasksForProject } from '../../../store/taskSlice';

export default function ListView() {
	const { projectId } = useParams();
	if (!projectId) return;
	const selectTasksMemo = useMemo(makeSelectTasksForProject, []);
	const tasks = useAppSelector(state => selectTasksMemo(state, projectId));

	const selectColumnsMemo = useMemo(makeSelectColumnsForProject, []);
	const columns = useAppSelector(state => selectColumnsMemo(state, projectId));

	return (
		<div className='list-view'>
			<div className='list-header'>
				<span className='col-title'>Task</span>
				<span className='col-status'>Status</span>
				<span className='col-assignee'>Assignee</span>
				<span className='col-due'>Due</span>
				<span className='col-actions'></span>
			</div>

			<div className='list-body'>
				{tasks.map(task => {
					return (
						<div key={task.id}>
							<div className='row'>
								<TaskRow
									task={task}
									columns={columns}
									isSubtask={false}
									projectId={projectId}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
