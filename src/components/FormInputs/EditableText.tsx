import React, { useState, useRef, useEffect } from 'react';
import { GoPencil } from 'react-icons/go';
import { Tooltip } from '../tooltip';

type EditableTextProps = {
	id: string;
	value: string;
	placeholder: string;
	disabled: boolean;
	onSave: (newValue: string) => void;
	className?: string;
	useIcon?: boolean;
	onExternalClick?: () => void;
};

export function EditableText({
	id,
	value,
	onSave,
	useIcon,
	disabled,
	className,
	placeholder,
	onExternalClick,
}: EditableTextProps) {
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [editing]);

	const save = () => {
		setEditing(false);
		if (draft.trim() !== value.trim()) {
			onSave(draft.trim());
		}
	};

	const cancel = () => {
		setEditing(false);
		setDraft(value);
	};

	const handleKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') save();
		if (e.key === 'Escape') cancel();
	};

	return (
		<div className={className}>
			{editing ? (
				<input
					id={id}
					ref={inputRef}
					value={draft}
					placeholder={placeholder}
					onChange={e => setDraft(e.target.value)}
					onBlur={save}
					onKeyDown={handleKey}
					className='editable-input'
				/>
			) : (
				<div className='editable-text-row'>
					<span
						onClick={() =>
							!disabled && !useIcon
								? !editing && setEditing(true)
								: onExternalClick && onExternalClick()
						}
						className='editable-text'>
						{value || 'Add subtask'}
					</span>
					{useIcon && (
						<Tooltip text='Edit text'>
							<button onClick={() => !disabled && !editing && setEditing(true)}>
								<GoPencil />
							</button>
						</Tooltip>
					)}
				</div>
			)}
		</div>
	);
}
