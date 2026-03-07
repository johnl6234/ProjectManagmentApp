import { useDispatch } from 'react-redux';
import { EditableText } from '../FormInputs/EditableText';
import type { Task, TaskStatus } from '../../types/task';
import { updateStoreTask } from '../../store/taskSlice';
import { useState } from 'react';
import { createTask } from '../../services/tasks';
import { useNavigate } from 'react-router-dom';
import { FaDotCircle } from 'react-icons/fa';
import { DEFAULT_COLUMNS } from '../../types/column';
import { Tooltip } from '../tooltip';
import { useAppSelector } from '../../store/hooks';

interface Props {
	projectId: string;
	parentTaskId: string;
	subtasks: Task[];
}
const Subtasks = ({ subtasks, parentTaskId, projectId }: Props) => {
	const [addSubtaskOpen, setAddSubtaskOpen] = useState(false);
	const user = useAppSelector(s => s.user.currentUser);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function createSubtask(title: string) {
		if (!title || !user) return;

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
			assigneeId: user.id,
		};

		createTask(projectId, subtask);
	}

	const getIconColor = (status: TaskStatus) => {
		const column = DEFAULT_COLUMNS.find(c => c.status == status);

		return column?.color;
	};

	return (
		<div className={`${subtasks.length > 0 ? 'subtasks-section' : ''}`}>
			{subtasks.length > 0 && <h4>Subtasks</h4>}

			{subtasks.length > 0 ? (
				<>
					{subtasks.map(st => (
						<div key={st.id} className='subtask-row'>
							<Tooltip text='Toggle completed'>
								<FaDotCircle
									onClick={() =>
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
									className='column-icon'
									style={
										{
											'--column-color': getIconColor(st.status),
										} as React.CSSProperties
									}
									size={30}
								/>
							</Tooltip>

							<EditableText
								value={st.title}
								onSave={newTitle =>
									dispatch(
										updateStoreTask({ id: st.id, changes: { title: newTitle } })
									)
								}
								placeholder={''}
								useIcon={true}
								onExternalClick={() =>
									navigate(`/project/${projectId}/task/${st.id}`)
								}
								id={''}
								disabled={false}
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
							id={''}
							disabled={false}
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
						id={''}
						disabled={false}
					/>
				</div>
			)}
		</div>
	);
};

export default Subtasks;
