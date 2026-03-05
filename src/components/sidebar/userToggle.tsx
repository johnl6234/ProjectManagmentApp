import { useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SignOut } from '../../services/auth';
import { clearActiveProject } from '../../store/activeProjectSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserAvatar, selectUserName, setUser } from '../../store/userSlice';
import { setUserSettingsOpen } from '../../store/uiSlice';
import { FaRegCircleUser } from 'react-icons/fa6';

interface Props {
	collapsed: boolean;
}
const UserToggle = ({ collapsed }: Props) => {
	const [userOpen, setUserOpen] = useState(false);

	const userName = useAppSelector(selectUserName);
	const avatarURL = useAppSelector(selectUserAvatar);

	const dispatch = useAppDispatch();
	const UserMenuRef = useRef<HTMLDivElement>(null);

	useClickOutside(UserMenuRef, () => {
		setUserOpen(false);
	});

	const handleSignOut = () => {
		dispatch(clearActiveProject());
		dispatch(setUser(null));
		SignOut();
	};

	return (
		<>
			<div className='user' ref={UserMenuRef}>
				<button onClick={() => setUserOpen(prev => !prev)}>
					{avatarURL ? (
						<img
							src={avatarURL}
							alt='User'
							className='h-8 w-8 object-cover rounded-b-full'
						/>
					) : (
						<FaRegCircleUser />
					)}
					{!collapsed && <span className='font-medium'>{userName}</span>}
				</button>

				{userOpen && (
					<div className='user-popup'>
						<button
							onClick={() => {
								dispatch(setUserSettingsOpen(true));
								setUserOpen(false);
							}}
							title='User'>
							User
						</button>
						<button
							onClick={() => {
								handleSignOut();
							}}
							title='Logout'>
							Logout
						</button>
					</div>
				)}
			</div>
		</>
	);
};
export default UserToggle;
