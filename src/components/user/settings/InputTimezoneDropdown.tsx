import timezones, { type TimeZone } from '../../../types/timezones';

interface TimezoneProps {
	value: TimeZone;
	label: string;
	options: TimeZone[];
	onSave: (newValue: TimeZone) => void;
}
export const InputTimezoneDropdown = ({ value, label, options, onSave }: TimezoneProps) => {
	const currentIndex = options.findIndex(tz => tz.name === value.name);

	return (
		<div className='input-group'>
			<label className='input-group-label' htmlFor={label}>
				{label}
			</label>
			<select value={currentIndex} onChange={e => onSave(timezones[Number(e.target.value)])}>
				{options.map((tz, idx) => (
					<option key={idx} value={idx}>
						{tz.name}
					</option>
				))}
			</select>
		</div>
	);
};
