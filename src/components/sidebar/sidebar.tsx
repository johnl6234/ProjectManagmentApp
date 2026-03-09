import { useMemo, useRef, useState } from 'react';
import { setActiveProjectId } from '../../store/activeProjectSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { makeSelectUserProjects } from '../../store/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import UserToggle from './userToggle';
import { setProjectModalOpen, setSidebarCollapsed } from '../../store/uiSlice';
import { GrProjects } from 'react-icons/gr';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { capitalize } from '../../functionLibrary';

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(
		() => localStorage.getItem('sidebarCollapsed') === 'true'
	);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const user = useAppSelector(s => s.user.currentUser);

	const selectUserProjectsMemo = useMemo(makeSelectUserProjects, []);
	const projects = useAppSelector(state => selectUserProjectsMemo(state, user?.id || ''));

	const activeProjectId = useAppSelector(s => s.activeProject.id);

	const sidebarRef = useRef<HTMLDivElement>(null);
	const toggleSidebar = () => {
		const next = !isCollapsed;
		setIsCollapsed(next);
		localStorage.setItem('sidebarCollapsed', String(next));
		dispatch(setSidebarCollapsed(next));
	};

	useClickOutside(sidebarRef, () => {
		toggleSidebar();
	});

	const handleProjectClicked = (projectId: string) => {
		dispatch(setActiveProjectId(projectId));
		const lastView = localStorage.getItem(`lastView:${projectId}`) || 'board';

		navigate(`/project/${projectId}/${lastView}`);
	};

	return (
		<aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
			<div className='sidebar-header'>
				<button className='collapse-btn' onClick={toggleSidebar}>
					{isCollapsed ? (
						<TbLayoutSidebarRightCollapse size={30} />
					) : (
						<TbLayoutSidebarLeftCollapse size={30} />
					)}
				</button>
			</div>
			<button className='section-title' onClick={() => setDropdownOpen(prev => !prev)}>
				{!isCollapsed ? 'Your Projects' : <GrProjects size={30} />}
			</button>
			{dropdownOpen && (
				<div>
					{projects.map(project => (
						<button
							key={project.id}
							onClick={() => handleProjectClicked(project.id)}
							className={`project-item ${isCollapsed ? ' project-item-collapsed ' : ''}${activeProjectId === project.id ? 'active' : ''}`}
							style={
								{
									'--project-bg': project.theme.backgroundColor,
									'--project-text': project.theme.color,
								} as React.CSSProperties
							}>
							<div className='project-icon'>{capitalize(project.name[0])}</div>
							{!isCollapsed && <span className='project-name'>{project.name}</span>}
						</button>
					))}
				</div>
			)}
			<button className='add-project-btn' onClick={() => dispatch(setProjectModalOpen(true))}>
				{isCollapsed ? '+' : 'Add Project'}
			</button>
			<UserToggle collapsed={isCollapsed} />
		</aside>
	);
};

export default Sidebar;
