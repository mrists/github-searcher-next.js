import { FC } from 'react';
import { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<header className='header'>
				<h1>GitHub Searcher</h1>
			</header>
			{children}
		</>
	);
};

export default Layout;
