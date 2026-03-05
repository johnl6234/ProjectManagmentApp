import { useRef, useState } from 'react';
import type { Column } from '../../../../types/column';
import type { Task } from '../../../../types/task';
import TaskCard from './taskCard';
import { createTask } from '../../../../services/tasks';
import { FaDotCircle } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useClickOutside } from '../../../../hooks/useClickOutside';

interface Props {
	column: Column;
	tasks: Task[];
}

const BoardColumn = ({ column, tasks }: Props) => {
	const [isAdding, setIsAdding] = useState(false);
	const [title, setTitle] = useState('');
	const [showColumnOptions, setShowColumnOptions] = useState(false);

	const iconColor = column?.color ?? '#ccc';
	const columnRef = useRef<HTMLDivElement>(null);
	useClickOutside(columnRef, () => setShowColumnOptions(false));

	const handleQuickAdd = async () => {
		if (!title.trim()) return;

		await createTask(column.projectId, {
			id: crypto.randomUUID(),
			title,
			description: '',
			status: column.status || 'todo',
			projectId: column.projectId,
			columnId: column.id,
			order: tasks.length,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			parentId: '',
		});

		setTitle('');
	};

	return (
		<div className='board-column'>
			<div className='column-header'>
				<FaDotCircle
					className='column-icon'
					style={{ '--column-color': iconColor } as React.CSSProperties}
					size={30}
				/>
				<span>{column.name}</span>

				<button onClick={() => setShowColumnOptions(prev => !prev)}>
					<BsThreeDotsVertical />
				</button>
				{showColumnOptions && (
					<div ref={columnRef} className='column-options'>
						Options
					</div>
				)}
			</div>

			<div className='task-list'>
				{tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
			{isAdding ? (
				<div className='quick-add-card'>
					<input
						autoFocus
						placeholder='Task title…'
						value={title}
						onChange={e => setTitle(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
					/>

					<div className='quick-add-actions'>
						<button onClick={handleQuickAdd}>Add</button>
						<button
							onClick={() => {
								setIsAdding(false);
								setTitle('');
							}}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<button className='quick-add-button' onClick={() => setIsAdding(true)}>
					+ Add task
				</button>
			)}
		</div>
	);
};
export default BoardColumn;
