import { UserService } from '@/API/UserService';
import RepositoriesList from '@/components/RepositoriesList/RepositoriesList';
import Input from '@/components/UI/input/Input';
import UserInfo from '@/components/UserInfo/UserInfo';
import { useDebounce } from '@/hooks/useDebounce';
import { useRepos } from '@/hooks/useRepos';
import { IRepository, User } from '@/types/types';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, useEffect, useState } from 'react';
import styles from './UserDetails.module.scss';

const UserDetails: FC = () => {
	const { query } = useRouter();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isRepositoriesLoading, setIsRepositoriesLoading] = useState<boolean>(true);
	const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
	const [user, setUser] = useState<User | any>({});
	const [repositories, setRepositories] = useState<IRepository[]>([]);
	const [errors, setErrors] = useState<Error | any>({ user: '', repositories: '' });
	const { id }: ParsedUrlQuery = query;
	const fetchUserAndRepositories = () => {
		if (!id) return;

		UserService.getUserByID(id)
			.then(({ data }) => {
				setUser(data);
				setErrors({ ...errors, user: '' });
				UserService.getRepositories(data.login)
					.then(({ data }) => {
						setRepositories(data);
						setErrors({ ...errors, repositories: '' });
					})
					.catch((error: unknown) => {
						setErrors({ ...errors, repositories: (error as Error).message });
					})
					.finally(() => {
						setIsRepositoriesLoading(false);
					});
			})
			.catch((error: unknown) => {
				setErrors({ ...errors, user: (error as Error).message });
			});
	};

	useEffect(() => {
		fetchUserAndRepositories();
	}, []);

	const searchedRepositories = useRepos(repositories, debouncedSearchQuery);

	function openUserBlog(e: React.MouseEvent, url: string) {
		e.preventDefault();
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		const finalUrl = urlRegex.test(url) ? url : `https://${url}`;

		window.open(finalUrl, '_blank', 'noreferrer');
	}

	return (
		<>
			<Head>
				<title>{user.login}</title>
				<link
					rel='shortcut icon'
					type='image/x-icon'
					href={user.avatar_url}
				></link>
			</Head>
			<div className={styles['user-details']}>
				{errors.user ? (
					<h3 className={styles['user-details__error']}>{errors.user}</h3>
				) : (
					<>
						<UserInfo user={user} />
						<div className={styles['user-details__link']}>
							{user.blog ? (
								<a
									onClick={e => openUserBlog(e, user.blog)}
									href={user.blog}
								>
									{user.blog}
								</a>
							) : (
								<p>User has not own blog</p>
							)}
						</div>
						<div className={styles['user-details__input']}>
							<Input
								styleClassName={styles['user-details__input-item']}
								type='text'
								value={searchQuery}
								placeholder="Search for User's Repositories"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearchQuery(e.target.value.trim())
								}
							/>
						</div>
						<div>
							<Link href={'/'}>
								<Image
									className={styles['user-details__btn']}
									priority
									src='/images/button.png'
									alt=''
									width={25}
									height={25}
								/>
							</Link>
						</div>
					</>
				)}
			</div>
			<RepositoriesList
				repositories={searchedRepositories}
				isRepositoriesLoading={isRepositoriesLoading}
				error={errors.repositories}
			/>
		</>
	);
};

export default UserDetails;
