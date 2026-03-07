import type { Task } from '../../../../types/task';

interface Props {
	task: Task;
}
export default function TaskRowDueDate({ task }: Props) {
	return <span>{task.dueDate ?? '—'}</span>;
}
