import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface BreadcrumbsProps {
	projectId?: string;
	projectName?: string;
	taskTitle?: string;
}

export default function Breadcrumbs({ projectId, projectName, taskTitle }: BreadcrumbsProps) {
	const lastView = useAppSelector(state => state.ui.lastView);
	return (
		<nav className='breadcrumbs'>
			<Link to='/'>Dashboard</Link>

			{projectId && projectName && (
				<>
					<span>/</span>
					<Link to={`/project/${projectId}/${lastView}`}>{projectName}</Link>
				</>
			)}

			{taskTitle && (
				<>
					<span>/</span>
					<span>{taskTitle}</span>
				</>
			)}
		</nav>
	);
}
