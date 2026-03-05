import { Link } from 'react-router-dom';
import { ViewTypes, type Views } from '../../types/views';

interface Props {
	projectId: string;
	projectName: string;
	view: Views;
}

const ProjectHeader = ({ projectId, projectName, view }: Props) => {
	if (!projectName) return <></>;
	return (
		<header className='project-header'>
			<h1>{projectName}</h1>

			<div className='view-switcher'>
				{ViewTypes.map(v => (
					<Link
						key={v}
						className={`${view == v ? 'view-active' : ''}`}
						to={`/project/${projectId}/${v}`}
						onClick={() => localStorage.setItem(`lastView:${projectId}`, v)}>
						{v}
					</Link>
				))}
			</div>
		</header>
	);
};

export default ProjectHeader;
