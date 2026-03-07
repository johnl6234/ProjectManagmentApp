import { useDispatch } from 'react-redux';

import type { Checkbox } from '../../types/checklist';
import { EditableText } from '../FormInputs/EditableText';
import { deleteCheckbox, updateCheckbox } from '../../services/checkbox';
import { updateStoreCheckbox } from '../../store/checkboxSlice';
import { MdDeleteOutline } from 'react-icons/md';
import { openConfirm } from '../../store/confirmSlice';
import { registerConfirmAction } from '../../store/confirmationActions';

interface Props {
	projectId: string;
	taskId: string;
	checklistId: string;
	checkbox: Checkbox;
}
const ChecklistItem = ({ projectId, taskId, checklistId, checkbox }: Props) => {
	const dispatch = useDispatch();

	const handleUpdateCheckbox = async (field: string, value: string | boolean) => {
		await updateCheckbox(projectId, taskId, checklistId, checkbox.id, { [field]: value });
		dispatch(
			updateStoreCheckbox({
				id: checkbox.id,
				changes: { [field]: value },
			})
		);
	};

	const openConfirmModal = async () => {
		if (!checkbox) return;

		const id = crypto.randomUUID();

		registerConfirmAction(id, async () => {
			await deleteCheckbox(projectId, taskId, checklistId, checkbox.id);
		});

		dispatch(
			openConfirm({
				message: `Delete ${checkbox.title}!`,
				actionId: id,
			})
		);
	};
	return (
		<div className='checkbox-row'>
			<input
				type='checkbox'
				checked={checkbox.checked}
				onChange={e => handleUpdateCheckbox('checked', e.target.checked)}
			/>
			<EditableText
				value={checkbox.title}
				onSave={newTitle => handleUpdateCheckbox('title', newTitle)}
				placeholder={''}
				id={''}
				disabled={false}
			/>
			<button onClick={openConfirmModal} className='checkbox-delete'>
				<MdDeleteOutline size={25} style={{ color: 'red' }} />
			</button>
		</div>
	);
};
export default ChecklistItem;
