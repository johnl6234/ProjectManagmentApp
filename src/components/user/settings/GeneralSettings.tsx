import { useAppSelector } from '../../../store/hooks';

const GeneralSettings = () => {
	const user = useAppSelector(s => s.user.currentUser);

	return (
		<div className='flex flex-col gap-6'>
			<h2 className='text-xl font-semibold'>General Settings</h2>

			{user && <div>{user.name}</div>}
		</div>
	);
};

export default GeneralSettings;
