import { settingsPages } from './settingsConfig';

interface Props {
	activeTab: string;
	setActiveTab: (tab: any) => void;
}

const UserSettingsSidebar = ({ activeTab, setActiveTab }: Props) => {
	return (
		<div className='user-settings-sidebar'>
			<h2 className=''>Settings</h2>

			<div className=''>
				{settingsPages.map(page => (
					<button
						key={page.id}
						className={activeTab ? ' active ' : ''}
						onClick={() => setActiveTab(page.id)}>
						{page.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default UserSettingsSidebar;
