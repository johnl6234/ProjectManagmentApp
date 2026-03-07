import { useRef } from 'react';
import { getConfirmAction, unregisterConfirmAction } from '../../store/confirmationActions';
import { closeConfirm } from '../../store/confirmSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';

export function ConfirmationModal() {
	const dispatch = useAppDispatch();
	const { isOpen, message, actionId } = useAppSelector(s => s.confirmation);

	const confirmRef = useRef<HTMLDivElement>(null);
	useClickOutside(confirmRef, () => handleCancel());

	const handleConfirm = async () => {
		if (!actionId) return;
		const fn = getConfirmAction(actionId);
		if (fn) await fn();
		unregisterConfirmAction(actionId);
		dispatch(closeConfirm());
	};

	const handleCancel = () => {
		if (!actionId) return;
		unregisterConfirmAction(actionId);
		dispatch(closeConfirm());
	};

	if (!isOpen) return null;

	return (
		<div className='confirmation-modal-overlay'>
			<div ref={confirmRef} className='confirmation-modal'>
				<p className='confirmation-message'>{message}</p>

				<div className='confirmation-buttons'>
					<button className='confirm-btn' onClick={handleConfirm}>
						Confirm
					</button>
					<button className='cancel-btn' onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
