import { useRef, useState } from 'react';
import { settingsPages } from '../user/settingsConfig';
import UserSettingsSidebar from '../user/userSettingsSidebar';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { setUserSettingsOpen } from '../../store/uiSlice';
import { useClickOutside } from '../../hooks/useClickOutside';

const UserSettingsModal = () => {
	const [activeTab, setActiveTab] = useState(settingsPages[0].id);
	const isOpen = useAppSelector(s => s.ui.isUserSettingsOpen);

	const dispatch = useDispatch();

	const settingsRef = useRef<HTMLDivElement>(null);

	useClickOutside(settingsRef, () => {
		dispatch(setUserSettingsOpen(false));
	});

	if (!open) return null;
	const ActiveComponent = settingsPages.find(p => p.id === activeTab)?.component;

	if (!isOpen) return null;
	return (
		<div className='app-modal'>
			{/* Modal */}
			<div ref={settingsRef} className='user-settings'>
				{/* Sidebar */}
				<UserSettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

				{/* Content */}
				<div className='user-settings-content'>
					{ActiveComponent && <ActiveComponent />}
				</div>
			</div>
		</div>
	);
};

export default UserSettingsModal;
