import React, { useState, useRef, useEffect } from 'react';

type EditableTextProps = {
	value: string;
	placeholder: string;
	onSave: (newValue: string) => void;
	className?: string;
};

export function EditableText({ value, onSave, className, placeholder }: EditableTextProps) {
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
		<div className={className} onClick={() => !editing && setEditing(true)}>
			{editing ? (
				<input
					ref={inputRef}
					value={draft}
					placeholder={placeholder}
					onChange={e => setDraft(e.target.value)}
					onBlur={save}
					onKeyDown={handleKey}
					className='editable-input'
				/>
			) : (
				<span className='editable-text'>{value || 'Add subtask'}</span>
			)}
		</div>
	);
}
