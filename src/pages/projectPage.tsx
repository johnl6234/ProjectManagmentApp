import ProjectHeader from '../components/project/projectHeader';
import ProjectToolbar from '../components/project/projectToolbar';
import { useAppSelector } from '../store/hooks';
import { selectActiveProject } from '../store/projectSlice';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { setActiveProjectId } from '../store/activeProjectSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { setColumns } from '../store/columnSlice';
import { setTasks } from '../store/taskSlice';
import type { Column } from '../types/column';
import type { Task } from '../types/task';
import type { Views } from '../types/views';
import { ProjectSettingsModal } from '../components/modals/projectSettingsModal';

const ProjectPage = () => {
	const { projectId } = useParams();
	if (!projectId) return;

	const dispatch = useDispatch();

	const project = useAppSelector(selectActiveProject);
	const location = useLocation();
	const view = location.pathname.split('/').pop();

	useEffect(() => {
		if (!projectId) return;
		dispatch(setActiveProjectId(projectId));
		const qCol = query(
			collection(db, 'projects', projectId, 'columns'),
			orderBy('order', 'asc')
		);
		const unsubCols = onSnapshot(qCol, snapshot => {
			const cols = snapshot.docs.map(doc => doc.data() as Column);
			dispatch(setColumns(cols));
		});

		const qTask = query(
			collection(db, 'projects', projectId, 'tasks'),
			orderBy('order', 'asc')
		);
		const unsubTasks = onSnapshot(qTask, snapshot => {
			const tasks = snapshot.docs.map(doc => doc.data() as Task);
			dispatch(setTasks(tasks));
		});

		window.__projectUnsubscribers = [unsubCols, unsubTasks];

		return () => {
			unsubCols();
			unsubTasks();
		};
	}, [projectId]);

	if (!project || !view) {
		return <div>no project</div>;
	}
	return (
		<div className='project-page'>
			<ProjectHeader projectName={project.name} projectId={project.id} view={view as Views} />
			<ProjectToolbar />
			<div className='project-content'>
				<Outlet />
			</div>
			<ProjectSettingsModal project={project} />
		</div>
	);
};
export default ProjectPage;
