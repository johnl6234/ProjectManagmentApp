import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../services/firebase';
import { checkboxSelectors, setCheckboxes } from '../../store/checkboxSlice';
import { createChecklist } from '../../services/checklist';
import ChecklistItem from './checklistItem';
import { createCheckbox } from '../../services/checkbox';
import type { Checklist } from '../../types/checklist';
import { useAppSelector } from '../../store/hooks';

interface Props {
	projectId: string;
	taskId: string;
	checklist: Checklist;
}

const CheckList = ({ projectId, taskId, checklist }: Props) => {
	const dispatch = useDispatch();

	const checkboxes = useAppSelector(state =>
		checkboxSelectors.selectAll(state).filter(b => b.checkListId === checklist.id)
	);

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

	return (
		<>
			<button onClick={() => createChecklist(projectId, taskId)}>Add new checklist</button>
			<div className='checklist'>
				<div className='checkist-title'>{checklist.title}</div>
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
