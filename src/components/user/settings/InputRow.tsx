import { EditableText } from '../../FormInputs/EditableText';

interface Props {
	label: string;
	value: string;
	disabled: boolean;
	onSave: (newValue: string) => void;
}
export const InputRow = ({ label, value, onSave, disabled }: Props) => {
	return (
		<div className='input-group'>
			<label className='input-group-label' htmlFor={label}>
				{label}
			</label>
			<EditableText
				id={label}
				value={value}
				placeholder={label}
				onSave={(newValue: string) => onSave(newValue)}
				disabled={disabled}
			/>
		</div>
	);
};
