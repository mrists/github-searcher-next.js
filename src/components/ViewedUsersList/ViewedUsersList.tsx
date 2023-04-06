import { IUser } from '@/types/types';
import Link from 'next/link';
import { FC } from 'react';
import styles from './ViewedUsersList.module.scss';
import ViewedUser from './components/ViewedUser';
import { ViewedUsersListProps } from './types';

const ViewedUsersList: FC<ViewedUsersListProps> = ({ users }) => {
	const renderUsers = (user: IUser): React.ReactNode => (
		<Link
			className={styles['viewed-users__link']}
			key={user.id}
			href={`/user/${user.id}`}
		>
			<ViewedUser
				avatar_url={user.avatar_url}
				login={user.login}
				id={user.id}
			></ViewedUser>
		</Link>
	);
	return (
		<div className={styles['viewed-users__list']}>
			{users.length ? users.map(renderUsers) : <h3>No user found</h3>}
		</div>
	);
};

export default ViewedUsersList;
