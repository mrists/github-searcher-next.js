import { FC } from 'react';
import { InputProps } from './types';

const Input: FC<InputProps> = ({ styleClassName, ...props }) => {
	return (
		<input
			className={styleClassName}
			{...props}
		/>
	);
};

export default Input;
