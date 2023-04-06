import { FC } from 'react';
import { HamburgerProps } from './types';

const Hamburger: FC<HamburgerProps> = ({ styleClassName, onMouseOver }) => {
	return (
		<div
			className={styleClassName}
			onMouseOver={onMouseOver}
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export default Hamburger;
