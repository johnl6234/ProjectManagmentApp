import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProjectSettingsModalOpen, setTaskModalOpen } from '../../store/uiSlice';
import { useRef, useState } from 'react';
import { selectActiveProject } from '../../store/projectSlice';
import { deleteProject, updateProject } from '../../services/projects';
import { openConfirm } from '../../store/confirmSlice';
import { registerConfirmAction } from '../../store/confirmationActions';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import { EditableTextArea } from '../FormInputs/EditableTextArea';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const ProjectToolbar = () => {
	const [projectOptionOpen, setProjectOptionsOpen] = useState(false);
	const [descriptionOpen, setDescriptionOpen] = useState(true);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const project = useAppSelector(selectActiveProject);

	async function deleteProjectHandler() {
		if (!project) return;

		const id = crypto.randomUUID();

		registerConfirmAction(id, async () => {
			if (window.__projectUnsubscribers) {
				window.__projectUnsubscribers.forEach(fn => fn());
				window.__projectUnsubscribers = [];
			}
			await deleteProject(project.id);
			navigate('/');
		});

		dispatch(openConfirm({ message: `Delete project "${project.name}"?`, actionId: id }));
		setProjectOptionsOpen(false);
	}

	const optionRef = useRef<HTMLDivElement>(null);
	useClickOutside(optionRef, () => setProjectOptionsOpen(false));

	if (!project) return;
	return (
		<div className='project-toolbar'>
			<div className='project-toolbar-row'>
				<h3 className='project-title'>{project?.name}</h3>
				<button
					className='add-task'
					onClick={() => dispatch(setTaskModalOpen({ open: true }))}>
					Add task +
				</button>
				<button onClick={() => setProjectOptionsOpen(prev => !prev)}>
					<HiOutlineCog8Tooth />
				</button>
			</div>
			<div className='project-toolbar-description'>
				<button onClick={() => setDescriptionOpen(prev => !prev)}>
					Description
					{descriptionOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
				</button>
				{descriptionOpen && (
					<EditableTextArea
						value={project.description!}
						onSave={async (newValue: string) =>
							await updateProject(project.id, { description: newValue })
						}
					/>
				)}
			</div>

			{/* MODAL */}
			{projectOptionOpen && (
				<div ref={optionRef} className='project-options'>
					<button
						onClick={() => {
							dispatch(setProjectSettingsModalOpen(true));
							setProjectOptionsOpen(false);
						}}>
						Settings
					</button>
					<button onClick={deleteProjectHandler}>Delete</button>
				</div>
			)}
		</div>
	);
};

export default ProjectToolbar;
