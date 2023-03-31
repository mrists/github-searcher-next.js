import { FC } from 'react';
import styles from './Repository.module.scss';
import { RepositoryProps } from './types';

const Repository: FC<RepositoryProps> = ({ name, forks, stargazers_count, html_url }) => {
	return (
		<a
			href={html_url}
			target='_blank'
			className={styles['repositories-item']}
		>
			<p className={styles['repositories-item__name']}>{name}</p>
			<div className={styles['repositories-item__info']}>
				<span>{forks}</span>
				<span>{stargazers_count}</span>
			</div>
		</a>
	);
};

export default Repository;
