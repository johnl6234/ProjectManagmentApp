import { useDispatch } from 'react-redux';

import type { Checkbox } from '../../types/checklist';
import { EditableText } from '../FormInputs/EditableText';
import { updateCheckbox } from '../../services/checkbox';
import { updateStoreCheckbox } from '../../store/checkboxSlice';

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
			/>
		</div>
	);
};
export default ChecklistItem;
