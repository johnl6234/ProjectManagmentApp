import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2';

interface Props {
	navigate: () => void;
	handleDeleteTask: () => void;
}

export default function TaskRowActions({ navigate, handleDeleteTask }: Props) {
	return (
		<div className='task-row-actions'>
			<button onClick={navigate}>
				<HiOutlinePencil size={25} />
			</button>
			<button onClick={handleDeleteTask}>
				<HiOutlineTrash size={25} />
			</button>
		</div>
	);
}
