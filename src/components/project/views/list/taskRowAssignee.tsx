import type { Task } from '../../../../types/task';

interface Props {
	task: Task;
}
export default function TaskRowAssignee({ task }: Props) {
	return <span>{task.assigneeId ?? 'Unassigned'}</span>;
}
