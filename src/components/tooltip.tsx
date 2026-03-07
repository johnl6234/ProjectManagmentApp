import { useState, useRef, useEffect, type JSX } from 'react';
import { createPortal } from 'react-dom';
interface Props {
	text: string;
	children: JSX.Element;
}
export function Tooltip({ children, text }: Props) {
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const ref = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (visible && ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setCoords({
				top: rect.top - 8, // 8px above
				left: rect.left + rect.width / 2,
			});
		}
	}, [visible]);

	return (
		<>
			<span
				ref={ref}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				onFocus={() => setVisible(true)}
				onBlur={() => setVisible(false)}
				style={{ display: 'inline-flex' }}>
				{children}
			</span>

			{visible &&
				createPortal(
					<div
						className='tooltip'
						style={{
							top: coords.top,
							left: coords.left,
						}}>
						{text}
					</div>,
					document.body
				)}
		</>
	);
}
