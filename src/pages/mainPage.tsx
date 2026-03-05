import { useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AddProjectModal } from '../components/modals/addProjectModal';
import { subscribeToUserProjects } from '../store/listeners';
import Navbar from '../components/navbar';
import UserSettingsModal from '../components/modals/userSettingsModal';
import { AddTaskModal } from '../components/modals/addTaskModal';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import { ConfirmationModal } from '../components/modals/confirmModal';

const MainPage = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(s => s.user.currentUser);

	useEffect(() => {
		if (!user) return;
		const unsub = subscribeToUserProjects(user.id, dispatch);
		return () => unsub();
	}, [user?.id]);

	return (
		<div className='app-layout'>
			<Sidebar />
			<div className='main'>
				<Navbar />
				<div className='content'>
					<Outlet />
				</div>
				<Footer />
			</div>
			<AddProjectModal />
			<UserSettingsModal />
			<AddTaskModal />
			<ConfirmationModal />
		</div>
	);
};
export default MainPage;
