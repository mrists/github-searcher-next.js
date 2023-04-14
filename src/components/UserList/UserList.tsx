import { RootState } from '@/store';
import { IUser } from '@/types/types';
import Link from 'next/link';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './UserList.module.scss';
import User from './components/User/User';

const UserList: FC = () => {
	const { users, fetched, usersError: error } = useSelector((state: RootState) => state.users);

	const renderUsers = (user: IUser): React.ReactNode => (
		<Link
			className={styles['user-list__link']}
			key={user.id}
			href={`user/${user.id}`}
		>
			<User
				avatar_url={user.avatar_url}
				login={user.login}
				id={user.id}
			/>
		</Link>
	);

	return (
		<div className={styles['user-list']}>
			{users.length ? (
				users.map(renderUsers)
			) : fetched ? (
				<h3 className={styles['user-list__not-found']}>No user found</h3>
			) : (
				<></>
			)}
			{error && !users.length && <h3 className={styles['user-list__not-found']}>{error}</h3>}
		</div>
	);
};

export default UserList;
