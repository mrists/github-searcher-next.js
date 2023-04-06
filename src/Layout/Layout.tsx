import Hamburger from '@/components/UI/button/hamburger/Hamburger';
import ViewedUsersList from '@/components/ViewedUsersList/ViewedUsersList';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Layout.module.scss';
import { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children }) => {
	const viewedUsers = useSelector((state: any) => state.viewedUsers.viewedUsers);
	const [isHover, setIsHover] = useState<boolean>(false);

	function showHistory() {
		document.body.style.overflow = 'hidden';
		setIsHover(true);
	}

	function hideHistory() {
		setIsHover(false);
		document.body.removeAttribute('style');
	}

	return (
		<>
			<header className='header'>
				<h1>GitHub Searcher</h1>
			</header>
			{children}
			<Hamburger
				styleClassName={styles.hamburger}
				onMouseOver={showHistory}
			></Hamburger>
			{isHover ? (
				<div
					className={styles.history}
					onMouseLeave={hideHistory}
				>
					<ViewedUsersList users={viewedUsers}></ViewedUsersList>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Layout;
