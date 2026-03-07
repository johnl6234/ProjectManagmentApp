import { useState, useRef, useEffect, useMemo } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { createTask } from '../../services/tasks';
import { makeSelectColumnsForProject } from '../../store/columnSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveProject } from '../../store/projectSlice';
import { setTaskModalOpen } from '../../store/uiSlice';
import { NONE } from '../../store/constants';

export function AddTaskModal() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedColumnId, setSelectedColumnId] = useState<string>('');

	const dispatch = useAppDispatch();

	const project = useAppSelector(selectActiveProject);
	const user = useAppSelector(s => s.user.currentUser);
	const isOpen = useAppSelector(s => s.ui.isTaskModalOpen);
	const columnId = useAppSelector(s => s.ui.taskModalColumnId);

	const safeProjectId = project?.id ?? NONE;
	const selectColumnsMemo = useMemo(makeSelectColumnsForProject, []);
	const columns = useAppSelector(state => selectColumnsMemo(state, safeProjectId));

	const modalRef = useRef<HTMLDivElement>(null);
	useClickOutside(modalRef, () => dispatch(setTaskModalOpen({ open: false })));

	useEffect(() => {
		if (!columnId && columns.length > 0) {
			setSelectedColumnId(columns[0].id);
		}
	}, [columnId]);

	const handleSubmit = async () => {
		const finalColumnId = columnId ?? selectedColumnId;
		if (!user || !project || !finalColumnId) {
			console.log('final ', finalColumnId);
			return;
		}
		console.log('final ', finalColumnId);
		await createTask(project.id, {
			id: crypto.randomUUID(),
			title,
			description,
			status: columns.find(c => c.id === finalColumnId)?.status ?? 'todo',
			projectId: project.id,
			columnId: finalColumnId,
			order: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			parentId: '',
		});

		dispatch(setTaskModalOpen({ open: false }));
	};

	if (!isOpen) return null;

	return (
		<div className='app-modal'>
			<div ref={modalRef} className='app-modal-content'>
				<h2>Create Task</h2>

				<input
					placeholder='Task name'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<textarea
					placeholder='Description (optional)'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				{columnId ? (
					<p>Adding to: {columns.find(c => c.id === columnId)?.name}</p>
				) : (
					<select
						value={selectedColumnId}
						onChange={e => setSelectedColumnId(e.target.value)}>
						{columns.map(col => (
							<option key={col.id} value={col.id}>
								{col.name}
							</option>
						))}
					</select>
				)}

				<div className='button-group'>
					<button className='create-btn' onClick={handleSubmit}>
						Create
					</button>
					<button
						className='cancel-btn'
						onClick={() => dispatch(setTaskModalOpen({ open: false }))}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
