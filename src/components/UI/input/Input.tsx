import { FC } from 'react';
import { InputProps } from './types';

const Input: FC<InputProps> = props => {
	return (
		<input
			className={props.styleClassName}
			{...props}
		/>
	);
};

export default Input;
