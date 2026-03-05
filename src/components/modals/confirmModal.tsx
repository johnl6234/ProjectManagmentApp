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

	if (!isOpen || !actionId) return null;

	const handleConfirm = async () => {
		const fn = getConfirmAction(actionId);
		if (fn) await fn();
		unregisterConfirmAction(actionId);
		dispatch(closeConfirm());
	};

	const handleCancel = () => {
		unregisterConfirmAction(actionId);
		dispatch(closeConfirm());
	};

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
