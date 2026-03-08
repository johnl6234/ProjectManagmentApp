import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../services/tasks';
import { updateStoreTask } from '../../store/taskSlice';
import type { Task } from '../../types/task';
import { HiOutlineCalendarDays } from 'react-icons/hi2';

interface Props {
	task: Task;
}

export default function EditableDatePicker({ task }: Props) {
	const dispatch = useDispatch();

	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(task.dueDate ?? '');

	const isOverDue = new Date().getDate() > new Date(task.dueDate!).getDate();

	const save = async () => {
		setEditing(false);

		await updateTask(task.projectId, task.id, { dueDate: value || '' });

		dispatch(
			updateStoreTask({
				id: task.id,
				changes: { dueDate: value || '' },
			})
		);
	};

	const cancel = () => {
		setEditing(false);
		setValue(task.dueDate ?? '');
	};

	return (
		<div className='editable-date'>
			{editing ? (
				<input
					type='date'
					value={value ?? ''}
					autoFocus
					onChange={e => setValue(e.target.value)}
					onBlur={save}
					onKeyDown={e => {
						if (e.key === 'Enter') save();
						if (e.key === 'Escape') cancel();
					}}
				/>
			) : (
				<span onClick={() => setEditing(true)} className={isOverDue ? 'overdue' : ''}>
					{task.dueDate ? formatDateForLocale(task.dueDate) : <HiOutlineCalendarDays />}
				</span>
			)}
		</div>
	);
}
const formatDateForLocale = (dateString: string | null) => {
	if (!dateString) return '—';

	const date = new Date(dateString);
	if (isNaN(date.getTime())) return '—';

	return new Intl.DateTimeFormat(navigator.language, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(date);
};
