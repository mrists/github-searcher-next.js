import { removeViewedUser } from '@/store/viewedUserSlice';
import Image from 'next/image';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ViewedUser.module.scss';
import { ViewedUserProps } from './types';

const ViewedUser: FC<ViewedUserProps> = ({ login, avatar_url, id }) => {
	const dispatch = useDispatch();

	function deleteUser(e: React.MouseEvent) {
		e.preventDefault();
		dispatch(removeViewedUser(id));
	}

	return (
		<>
			<div className={styles['viewed-user']}>
				<Image
					width={50}
					height={50}
					src={avatar_url}
					alt={avatar_url}
					className={styles['viewed-user__img']}
				/>
				<p className={styles['viewed-user__login']}>{login}</p>
				<div className={styles['viewed-user__id']}>
					<span>Repo:</span>
					<span>{id}</span>
				</div>
				<div
					onClick={e => deleteUser(e)}
					className={styles['viewed-user__delete']}
				>
					<Image
						src={'/images/delete-icon.svg'}
						alt='delete'
						width={15}
						height={15}
					/>
				</div>
			</div>
		</>
	);
};

export default ViewedUser;
