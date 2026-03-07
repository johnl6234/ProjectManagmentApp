import { useDispatch } from 'react-redux';
import { updateTask } from '../../../../services/tasks';
import { updateStoreTask } from '../../../../store/taskSlice';
import type { Task } from '../../../../types/task';
import type { Column } from '../../../../types/column';

interface Props {
	task: Task;
	columns: Column[];
}
export default function TaskRowStatus({ task, columns }: Props) {
	const dispatch = useDispatch();

	const handleChange = async (e: { target: { value: any } }) => {
		const newStatus = e.target.value;
		const column = columns.find(c => c.status === newStatus);

		await updateTask(task.projectId, task.id, {
			status: newStatus,
			columnId: column?.id,
		});

		dispatch(
			updateStoreTask({
				id: task.id,
				changes: { status: newStatus, columnId: column?.id },
			})
		);
	};

	return (
		<select value={task.status} onChange={handleChange}>
			{columns.map(col => (
				<option key={col.id} value={col.status ?? ''}>
					{col.name}
				</option>
			))}
		</select>
	);
}
