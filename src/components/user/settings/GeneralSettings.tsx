import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import { updateUser } from '../../../services/user';
import { updateStoreUser } from '../../../store/userSlice';
import { InputRow } from './InputRow';
import type { TimeZone } from '../../../types/timezones';
import timezones from '../../../types/timezones';
import { InputTimezoneDropdown } from './InputTimezoneDropdown';
import { InputStringDropdown } from './InputStringDropdown';

const GeneralSettings = () => {
	const user = useAppSelector(s => s.user.currentUser);

	const dispatch = useDispatch();

	const handleUpdateUser = async (field: string, value: string | TimeZone) => {
		if (!user) return;
		console.log('field ', field, ' value ', value);
		await updateUser(user.id, { [field]: value });
		dispatch(updateStoreUser({ [field]: value }));
	};

	if (!user) return null;
	return (
		<div className='flex flex-col gap-6'>
			<h2 className='text-xl font-semibold'>General Settings</h2>

			<InputRow
				onSave={(newValue: string) => handleUpdateUser('name', newValue)}
				label={'Name'}
				value={user.name}
				disabled={false}
			/>
			<InputRow
				onSave={(newValue: string) => handleUpdateUser('email', newValue)}
				label={'Email'}
				value={user.email}
				disabled={true}
			/>
			<InputStringDropdown
				value={user.locale}
				label={'Locale'}
				options={['en-US', 'en-UK']}
				onSave={(newValue: string) => handleUpdateUser('locale', newValue)}
			/>

			<InputTimezoneDropdown
				value={user.timezone}
				label={'Timezone'}
				options={timezones}
				onSave={(newValue: TimeZone) => handleUpdateUser('timezone', newValue)}
			/>

			<InputStringDropdown
				value={user.theme}
				label={'Theme'}
				options={['light', 'dark', 'system']}
				onSave={(newValue: string) => handleUpdateUser('theme', newValue)}
			/>
		</div>
	);
};

export default GeneralSettings;
