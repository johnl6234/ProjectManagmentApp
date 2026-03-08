import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../../services/tasks';
import { updateStoreTask } from '../../../../store/taskSlice';
import { getAllUsers } from '../../../../services/user';
import type { Task } from '../../../../types/task';
import { useClickOutside } from '../../../../hooks/useClickOutside';

interface Props {
	task: Task;
}

export default function TaskRowAssignee({ task }: Props) {
	const dispatch = useDispatch();

	const [isEditing, setIsEdititng] = useState(false);
	const [users, setUsers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const assignedRef = useRef<HTMLDivElement>(null);
	useClickOutside(assignedRef, () => setIsEdititng(false));

	useEffect(() => {
		getAllUsers()
			.then(setUsers)
			.finally(() => setLoading(false));
	}, []);

	const currentUser = users.find(u => u.id === task.assigneeId);

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newAssigneeId = e.target.value;

		await updateTask(task.projectId, task.id, {
			assigneeId: newAssigneeId || '',
		});

		dispatch(
			updateStoreTask({
				id: task.id,
				changes: { assigneeId: newAssigneeId || '' },
			})
		);
		setIsEdititng(false);
	};

	if (loading) return <span>Loading…</span>;

	return (
		<div ref={assignedRef} className='task-assignee'>
			{isEditing && (
				<select value={task.assigneeId ?? ''} onChange={handleChange}>
					<option value=''>Unassigned</option>
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
			)}

			{!isEditing && (
				<div className='task-assignee-button' onClick={() => setIsEdititng(true)}>
					{currentUser ? (
						<img
							className='avatar'
							src={currentUser.avatarUrl}
							alt={currentUser.name}
						/>
					) : (
						'-'
					)}
				</div>
			)}
		</div>
	);
}
