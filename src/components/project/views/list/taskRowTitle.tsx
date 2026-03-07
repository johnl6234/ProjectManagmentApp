import { useDispatch } from 'react-redux';
import { updateTask } from '../../../../services/tasks';
import { updateStoreTask } from '../../../../store/taskSlice';
import type { Task } from '../../../../types/task';
import { EditableText } from '../../../FormInputs/EditableText';

interface Props {
	task: Task;
	isSubtask: boolean;
}
export default function TaskRowTitle({ task, isSubtask = false }: Props) {
	const dispatch = useDispatch();

	const handleSave = async (newTitle: string) => {
		await updateTask(task.projectId, task.id, { title: newTitle });
		dispatch(updateStoreTask({ id: task.id, changes: { title: newTitle } }));
	};

	return (
		<EditableText
			value={task.title}
			onSave={handleSave}
			placeholder='Untitled task'
			id={task.id}
			disabled={false}
		/>
	);
}
