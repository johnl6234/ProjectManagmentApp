import React, { useState, useRef, useEffect } from 'react';

type EditableTextAreaProps = {
	value: string;
	onSave: (newValue: string) => void;
	className?: string;
};

export function EditableTextArea({ value, onSave, className }: EditableTextAreaProps) {
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);
	const ref = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (editing && ref.current) {
			ref.current.focus();
			ref.current.select();
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
		if (e.key === 'Escape') cancel();
		if (e.key === 'Enter' && e.metaKey) save(); // optional: Cmd+Enter to save
	};

	return (
		<div className={className} onClick={() => !editing && setEditing(true)}>
			{editing ? (
				<textarea
					ref={ref}
					value={draft}
					onChange={e => setDraft(e.target.value)}
					onBlur={save}
					onKeyDown={handleKey}
					className='editable-textarea'
				/>
			) : (
				<p className='editable-text'>{value || 'Add description...'}</p>
			)}
		</div>
	);
}
