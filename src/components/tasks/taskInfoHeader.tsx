import { DEFAULT_COLUMNS } from '../../types/column';
import { TaskPriorityList, type Task } from '../../types/task';
import type { User } from '../../types/user';

interface Props {
	task: Task;
	onSave: (field: string, newValue: string) => void;
}

const TaskInfoHeader = ({ task, onSave }: Props) => {
	const assignedUser = task.assigneeId ? getUserById(task.assigneeId) : null;

	return (
		<div className='task-info-header'>
			<table className='task-info-table'>
				<tbody>
					{/* STATUS */}
					<tr>
						<td className='label'>Status</td>
						<td className='value'>
							<select
								value={task.status}
								onChange={e => {
									onSave('status', e.target.value);
								}}>
								{DEFAULT_COLUMNS.map(col => (
									<option key={col.status} value={col.status}>
										{col.name}
									</option>
								))}
							</select>
						</td>
						{/* ASSIGNEE */}

						<td className='label'>Assignee</td>
						<td className='value'>
							{assignedUser ? (
								<div className='assignee'>
									<img
										src={assignedUser.avatarUrl}
										alt={assignedUser.name}
										className='avatar'
									/>
									<span>{assignedUser.name}</span>
								</div>
							) : (
								'Unassigned'
							)}
						</td>
					</tr>

					{/* DATES */}
					<tr>
						<td className='label'>Dates</td>
						<td className='value'>
							<div className='dates'>
								<div>
									<strong>Created:</strong>{' '}
									{task.createdAt
										? new Date(task.createdAt).toLocaleDateString()
										: '—'}
								</div>

								<div>
									<strong>Due:</strong>{' '}
									<input
										type='date'
										value={task.dueDate || ''}
										onChange={e => onSave('dueDate', e.target.value)}
									/>
								</div>
							</div>
						</td>
						{/* PRIORITY */}

						<td className='label'>Priority</td>
						<td className='value'>
							<select
								value={task.priority || ''}
								onChange={e => onSave('priority', e.target.value)}>
								{TaskPriorityList.map(p => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>
						</td>
					</tr>

					{/* TIME ESTIMATE */}
					<tr>
						<td className='label'>Time Estimate</td>
						<td className='value'>—</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TaskInfoHeader;

function getUserById(assigneeId: string) {
	const user: User = {
		id: assigneeId,
		name: 'testUser',
		email: 'someone@email.com',
		createdAt: Date.now().toString(),
		updatedAt: Date.now().toString(),
		timezone: {
			label: 'Europe/London (GMT+00:00)',
			tzCode: 'Europe/London',
			name: '(GMT+00:00) London, Birmingham, Liverpool, Sheffield, Bristol',
			utc: '+00:00',
		},
		locale: 'en-US',
		theme: 'system',
	};
	return user;
}
