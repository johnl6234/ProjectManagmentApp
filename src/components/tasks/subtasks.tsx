import { useDispatch } from 'react-redux';
import { EditableText } from '../FormInputs/EditableText';
import type { Task } from '../../types/task';
import { updateStoreTask } from '../../store/taskSlice';
import { useState } from 'react';
import { createTask } from '../../services/tasks';

interface Props {
	projectId: string;
	parentTaskId: string;
	subtasks: Task[];
}
const Subtasks = ({ subtasks, parentTaskId, projectId }: Props) => {
	const [addSubtaskOpen, setAddSubtaskOpen] = useState(false);
	const dispatch = useDispatch();

	async function createSubtask(title: string) {
		const subtask: Task = {
			id: crypto.randomUUID(),
			title,
			description: '',
			status: 'todo',
			projectId: projectId,
			columnId: 'todo',
			order: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			parentId: parentTaskId,
		};

		console.log('Subtask ', subtask);
		createTask(projectId, subtask);
	}

	return (
		<div className={`${subtasks.length > 0 ? 'subtasks-section' : ''}`}>
			{subtasks.length > 0 && <h4>Subtasks</h4>}

			{subtasks.length > 0 ? (
				<>
					{subtasks.map(st => (
						<div key={st.id} className='subtask-row'>
							<input
								type='checkbox'
								checked={st.status === 'completed'}
								onChange={() =>
									dispatch(
										updateStoreTask({
											id: st.id,
											changes: {
												status:
													st.status === 'completed'
														? 'todo'
														: 'completed',
											},
										})
									)
								}
							/>

							<EditableText
								value={st.title}
								onSave={newTitle =>
									dispatch(
										updateStoreTask({ id: st.id, changes: { title: newTitle } })
									)
								}
								placeholder={''}
							/>
						</div>
					))}
					<div className='subtask-row'>
						<EditableText
							value={''}
							onSave={newTitle => {
								createSubtask(newTitle);
							}}
							placeholder={''}
						/>
					</div>
				</>
			) : !addSubtaskOpen ? (
				<button onClick={() => setAddSubtaskOpen(true)}>Add subtask</button>
			) : (
				<div className='subtask-row'>
					<EditableText
						value={''}
						onSave={newTitle => {
							createSubtask(newTitle);
						}}
						placeholder={''}
					/>
				</div>
			)}
		</div>
	);
};

export default Subtasks;
