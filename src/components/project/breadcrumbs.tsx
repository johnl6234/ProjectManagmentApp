import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
	projectId?: string;
	projectName?: string;
	taskTitle?: string;
}

export default function Breadcrumbs({ projectId, projectName, taskTitle }: BreadcrumbsProps) {
	return (
		<nav className='breadcrumbs'>
			<Link to='/'>Dashboard</Link>

			{projectId && projectName && (
				<>
					<span>/</span>
					<Link to={`/project/${projectId}/board`}>{projectName}</Link>
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
