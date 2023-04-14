import Image from 'next/image';
import { FC } from 'react';
import styles from './UserInfo.module.scss';
import { UserInfoProps } from './types';

const UserInfo: FC<UserInfoProps> = ({ user }) => {
	return (
		<div className={styles['user-info']}>
			<div className={styles['user-info__img-folder']}>
				<Image
					width={250}
					height={250}
					className={styles['user-info__img']}
					src={user.avatar_url}
					alt={user.login}
				/>
			</div>
			<div className={styles['user-info__description']}>
				<p>User name: {user.login}</p>
				<p>Name: {user.name ? user.name : "Name isn't set"}</p>
				<p>Location: {user.location ? user.location : 'The user did not specify a location'}</p>
				<p>Followers: {user.followers}</p>
				<p>Following: {user.following}</p>
				<p>Company: {user.company ? `"${user.company}"` : "The user hasn't a company"}</p>
				<p>Public repositories: {user.public_repos}</p>
				<p>Public gists: {user.public_gists}</p>
			</div>
		</div>
	);
};

export default UserInfo;
