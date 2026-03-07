import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../services/tasks';
import { removeTask } from '../../../../store/taskSlice';
import type { Task } from '../../../../types/task';

interface Props {
	task: Task;
	navigate: () => void;
}

export default function TaskRowActions({ task, navigate }: Props) {
	const dispatch = useDispatch();

	const handleDelete = async () => {
		await deleteTask(task.projectId, task.id);
		dispatch(removeTask(task.id));
	};

	return (
		<div onClick={navigate} className='task-row-actions'>
			<button>
				<HiOutlinePencil size={25} />
			</button>
			<button onClick={handleDelete}>
				<HiOutlineTrash size={25} />
			</button>
		</div>
	);
}
