import { useRef, useState } from 'react';
import { createProject } from '../../services/projects';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProjectModalOpen } from '../../store/uiSlice';
import { SYSTEM_ROLES, type Theme } from '../../types/project';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';

export function AddProjectModal() {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(s => s.ui.isProjectModalOpen);
	const user = useAppSelector(s => s.user.currentUser);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [description, setDescription] = useState('');

	const [hue, setHue] = useState(() => Math.floor(Math.random() * 360));

	const navigate = useNavigate();

	const modalRef = useRef<HTMLDivElement>(null);
	useClickOutside(modalRef, () => dispatch(setProjectModalOpen(false)));

	const theme: Theme = {
		name: 'custom',
		color: `hsl(${hue}, 70%, 20%)`,
		backgroundColor: `hsl(${hue}, 60%, 60%)`,
	};

	const randomiseHue = () => {
		setHue(Math.floor(Math.random() * 360));
	};

	const handleSubmit = async () => {
		if (!user) return;
		if (!name) {
			setNameError('Project name required');
			return;
		}

		try {
			const newProject = await createProject(
				{
					id: crypto.randomUUID(),
					name,
					description,
					ownerId: user.id,
					memberIds: [user.id],
					roles: { [user.id]: SYSTEM_ROLES.owner },
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					sectionIds: [],
					theme,
				},
				dispatch
			);
			setNameError('');
			dispatch(setProjectModalOpen(false));
			navigate(`/project/${newProject.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='app-modal'>
			<div ref={modalRef} className='app-modal-content'>
				<h2>Create Project</h2>

				<input
					placeholder='Project name'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
				{nameError && <span className='error'>{nameError}</span>}
				<textarea
					placeholder='Description (optional)'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				{/* --- THEME PREVIEW --- */}
				<div className='theme-preview'>
					<div
						className='project-icon-preview'
						style={{
							backgroundColor: theme.backgroundColor,
							color: theme.color,
						}}>
						{name ? name[0].toUpperCase() : 'A'}
					</div>

					<div className='theme-controls'>
						<label>Project Colour</label>

						{/* Colour picker */}
						<input
							type='color'
							value={hslToHex(hue, 60, 60)}
							onChange={e => {
								const newHue = hexToHue(e.target.value);
								setHue(newHue);
							}}
						/>

						<button onClick={randomiseHue}>Randomise</button>
					</div>
				</div>

				<div className='button-group'>
					<button className='create-btn' onClick={handleSubmit}>
						Create
					</button>
					<button
						className='cancel-btn'
						onClick={() => dispatch(setProjectModalOpen(false))}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

/* --- HELPERS --- */

// Convert HSL to HEX for <input type="color">
function hslToHex(h: number, s: number, l: number) {
	s /= 100;
	l /= 100;

	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

	const toHex = (x: number) =>
		Math.round(x * 255)
			.toString(16)
			.padStart(2, '0');

	return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// Convert HEX back to hue
function hexToHue(hex: string) {
	const r = parseInt(hex.substr(1, 2), 16) / 255;
	const g = parseInt(hex.substr(3, 2), 16) / 255;
	const b = parseInt(hex.substr(5, 2), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let h = 0;
	if (max === min) h = 0;
	else if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360;
	else if (max === g) h = 60 * ((b - r) / (max - min)) + 120;
	else h = 60 * ((r - g) / (max - min)) + 240;

	return Math.round(h);
}
