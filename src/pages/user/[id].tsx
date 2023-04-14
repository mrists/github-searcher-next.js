import RepositoriesList from '@/components/RepositoriesList/RepositoriesList';
import Input from '@/components/UI/input/Input';
import UserInfo from '@/components/UserInfo/UserInfo';
import { useDebounce } from '@/hooks/useDebounce';
import { useRepos } from '@/hooks/useRepos';
import { wrapper } from '@/store';
import { fetchUserDetails } from '@/store/userSlice';
import { addViewedUser } from '@/store/viewedUserSlice';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './UserDetails.module.scss';
import { UserDetailsProps } from './types';

export const getServerSideProps = wrapper.getServerSideProps(
	store => async (context: GetServerSidePropsContext) => {
		const { id } = context.query;

		await store.dispatch(fetchUserDetails(id as string));

		const { user, userDetailsError: error, repositories } = store.getState().users;

		console.log(user);

		return {
			props: {
				user,
				error,
				repositories,
			},
		};
	}
);

const UserDetails: FC<UserDetailsProps> = ({ user, repositories, error }) => {
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
	const [isHistoryChanged, setIsHistoryChanged] = useState<boolean>(false);

	const searchedRepositories = useRepos(repositories, debouncedSearchQuery);

	function openUserBlog(e: React.MouseEvent, url: string) {
		e.preventDefault();
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		const finalUrl = urlRegex.test(url) ? url : `https://${url}`;

		window.open(finalUrl, '_blank', 'noreferrer');
	}

	useEffect(() => {
		if (!isHistoryChanged) {
			dispatch(addViewedUser(user));
			setIsHistoryChanged(true);
		}
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
								<p>{"User has't own blog"}</p>
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
