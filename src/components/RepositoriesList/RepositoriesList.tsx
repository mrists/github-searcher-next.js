import { IRepository } from '@/types/types';
import { FC } from 'react';
import styles from './RepositoriesList.module.scss';
import Repository from './components/Repository/Repository';
import { RepositoriesListProps } from './types';

const RepositoriesList: FC<RepositoriesListProps> = ({ repositories }) => {
	const renderRepositories = (repository: IRepository): React.ReactNode => {
		return (
			<Repository
				key={repository.id}
				name={repository.name}
				forks={repository.forks}
				stargazers_count={repository.stargazers_count}
				html_url={repository.html_url}
			/>
		);
	};

	return (
		<div className={styles.repositories}>
			{repositories.length ? (
				repositories.map(renderRepositories)
			) : (
				<h3 className={styles['repositories__not-found']}>No repositories found</h3>
			)}
		</div>
	);
};

export default RepositoriesList;
