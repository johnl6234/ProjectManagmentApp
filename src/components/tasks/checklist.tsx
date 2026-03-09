import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../services/firebase';
import { makeSelectCheckboxesForChecklist, setCheckboxes } from '../../store/checkboxSlice';
import { deleteChecklist, updateChecklist } from '../../services/checklist';
import ChecklistItem from './checklistItem';
import { createCheckbox } from '../../services/checkbox';
import type { Checklist } from '../../types/checklist';
import { useAppSelector } from '../../store/hooks';
import { MdDeleteOutline } from 'react-icons/md';
import { registerConfirmAction } from '../../store/confirmationActions';
import { openConfirm } from '../../store/confirmSlice';
import { EditableText } from '../FormInputs/EditableText';
import { updateStoreChecklist } from '../../store/checklistSlice';

interface Props {
	projectId: string;
	taskId: string;
	checklist: Checklist;
}

const CheckList = ({ projectId, taskId, checklist }: Props) => {
	const dispatch = useDispatch();

	const selectCheckboxes = useMemo(makeSelectCheckboxesForChecklist, []);
	const checkboxes = useAppSelector(state => selectCheckboxes(state, checklist.id));

	useEffect(() => {
		if (!projectId || !taskId) return;

		const refCheck = collection(
			db,
			'projects',
			projectId,
			'tasks',
			taskId,
			'checklists',
			checklist.id,
			'checkboxes'
		);

		const unsub = onSnapshot(refCheck, snap => {
			const boxes = snap.docs.map(doc => {
				const data = doc.data();

				return {
					id: doc.id,
					checkListId: data.checklistId ?? '',
					checked: data.checked ?? false,
					createdAt:
						typeof data.createdAt === 'string'
							? data.createdAt
							: (data.createdAt?.toMillis?.() ?? 0).toString(),
					updatedAt:
						typeof data.updatedAt === 'string'
							? data.updatedAt
							: (data.updatedAt?.toMillis?.() ?? 0).toString(),
					title: data.title ?? '',
				};
			});

			dispatch(setCheckboxes(boxes));
		});

		return () => unsub();
	}, [projectId, taskId]);

	const openConfirmModal = async () => {
		if (!checklist) return;

		const id = crypto.randomUUID();

		registerConfirmAction(id, async () => {
			await deleteChecklist(projectId, taskId, checklist.id);
		});

		dispatch(
			openConfirm({
				message: `Delete ${checklist.title}!`,
				actionId: id,
			})
		);
	};

	const handleUpdate = async (newValue: string) => {
		if (!checklist || !projectId || !taskId) return;
		await updateChecklist(projectId, taskId, checklist.id, { title: newValue });
		dispatch(updateStoreChecklist({ id: checklist.id, changes: { title: newValue } }));
	};

	return (
		<>
			<div className='checklist'>
				<div className='checklist-header'>
					<EditableText
						id={checklist.id}
						value={checklist.title}
						placeholder={checklist.title}
						disabled={false}
						onSave={(newValue: string) => handleUpdate(newValue)}
					/>
					{/* <div className='checkist-title'>{checklist.title}</div> */}
					<button onClick={openConfirmModal} className='checklist-delete'>
						<MdDeleteOutline size={25} style={{ color: 'red' }} />
					</button>
				</div>
				{checkboxes.map(list => (
					<ChecklistItem
						key={list.id}
						projectId={projectId}
						taskId={taskId}
						checkbox={list}
						checklistId={checklist.id}
					/>
				))}
				<button onClick={() => createCheckbox(projectId, taskId, checklist.id)}>
					Add item
				</button>
			</div>
		</>
	);
};

export default CheckList;
