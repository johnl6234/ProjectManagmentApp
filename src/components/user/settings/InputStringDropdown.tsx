interface LocaleProps {
	value: string;
	label: string;
	options: string[];
	onSave: (newValue: string) => void;
}
export const InputStringDropdown = ({ value, label, options, onSave }: LocaleProps) => {
	return (
		<div className='input-group'>
			<label className='input-group-label' htmlFor={label}>
				{label}
			</label>
			<select
				value={value}
				onChange={e => {
					onSave(e.target.value);
				}}>
				{options.map(col => (
					<option key={col} value={col}>
						{col}
					</option>
				))}
			</select>
		</div>
	);
};
