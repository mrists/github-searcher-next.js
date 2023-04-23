import { UserService } from '@/API/UserService';
import RepositoriesList from '@/components/RepositoriesList/RepositoriesList';
import Input from '@/components/UI/input/Input';
import UserInfo from '@/components/UserInfo/UserInfo';
import { useDebounce } from '@/hooks/useDebounce';
import { useRepos } from '@/hooks/useRepos';
import { addViewedUser } from '@/store/viewedUserSlice';
import { IRepository, User } from '@/types/types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';

type UserDetailsProps = {
	user: User;
	repositories: IRepository[];
	error?: string;
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
	try {
		const { id } = context.query;

		const { data: user } = await UserService.getUserByID(id as string);
		const { data: repositories } = await UserService.getRepositories(user.login);

		return {
			props: {
				user,
				repositories,
			},
		};
	} catch (error) {
		return {
			props: { error },
		};
	}
};

const UserDetails: FC<UserDetailsProps> = ({ user, repositories, error }) => {
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);

	const searchedRepositories = useRepos(repositories, debouncedSearchQuery);

	function openUserBlog(e: React.MouseEvent, url: string) {
		e.preventDefault();
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		const finalUrl = urlRegex.test(url) ? url : `https://${url}`;

		window.open(finalUrl, '_blank', 'noreferrer');
	}

	useEffect(() => {
		dispatch(addViewedUser(user));
	}, []);

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
			{error ? (
				<h3 className={styles['user-details__error']}>{error}</h3>
			) : (
				<>
					<div className={styles['user-details']}>
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
					</div>
					<RepositoriesList repositories={searchedRepositories} />
				</>
			)}
		</>
	);
};

export default UserDetails;
