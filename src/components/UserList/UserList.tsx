import { IUser } from '@/types/types';
import Link from 'next/link';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './UserList.module.scss';
import User from './components/User/User';

// TODO: Rewrite fetching users with redux thunk

const UserList: FC = () => {
	const users = useSelector((state: any) => state.users.users);
	const fetched = useSelector((state: any) => state.users.fetched);
	const error = useSelector((state: any) => state.users.error);

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
