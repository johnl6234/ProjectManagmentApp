import type { Task } from '../../../../types/task';
import EditableDatePicker from '../../../FormInputs/EditableDatePicker';

interface Props {
	task: Task;
}
export default function TaskRowDueDate({ task }: Props) {
	return <EditableDatePicker task={task} />;
}
