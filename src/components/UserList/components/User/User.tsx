import Image from 'next/image';
import { FC } from 'react';
import styles from './User.module.scss';
import { UserProps } from './types';

const User: FC<UserProps> = ({ login, avatar_url, id }) => {
	return (
		<div className={styles['user-item']}>
			<Image
				width={50}
				height={50}
				src={avatar_url}
				alt={avatar_url}
				className={styles['user-item__img']}
			/>
			<p className={styles['user-item__login']}>{login}</p>
			<div className={styles['user-item__id']}>
				<span>Repo:</span>
				<span>{id}</span>
			</div>
		</div>
	);
};

export default User;
