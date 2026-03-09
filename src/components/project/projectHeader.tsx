import { Link } from 'react-router-dom';
import { ViewTypes, type Views } from '../../types/views';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { taskSelectors } from '../../store/taskSlice';
import Breadcrumbs from './breadcrumbs';
import { setLastView } from '../../store/uiSlice';

interface Props {
	projectId: string;
	projectName: string;
	view: Views;
}

const ProjectHeader = ({ projectId, projectName, view }: Props) => {
	const { taskId } = useParams();
	const dispatch = useAppDispatch();

	const task = useAppSelector(state => (taskId ? taskSelectors.selectById(state, taskId) : null));
	if (!projectName) return <></>;
	return (
		<header className='project-header'>
			<Breadcrumbs projectId={projectId!} projectName={projectName} taskTitle={task?.title} />

			<div className='view-switcher'>
				{ViewTypes.map(v => (
					<Link
						key={v}
						className={`${view == v ? 'view-active' : ''}`}
						to={`/project/${projectId}/${v}`}
						onClick={() => dispatch(setLastView(v))}>
						{v}
					</Link>
				))}
			</div>
		</header>
	);
};

export default ProjectHeader;
