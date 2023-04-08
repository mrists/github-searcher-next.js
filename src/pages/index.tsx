import Input from '@/components/UI/input/Input';
import UserList from '@/components/UserList';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchUsers, setError, setFetched, setUsers } from '@/store/UserSlice';
import styles from '@/styles/Searcher.module.scss';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Searcher: FC = () => {
	const [userLogin, setUserLogin] = useState<string>('');
	const debouncedSearchTerm = useDebounce<string>(userLogin, 500);
	const dispatch = useDispatch<Dispatch<AnyAction> | any>();

	useEffect(() => {
		(async () => {
			if (!debouncedSearchTerm) {
				dispatch(setUsers([]));
				dispatch(setFetched(false));
				dispatch(setError(null));
				return;
			}
			await dispatch(fetchUsers(debouncedSearchTerm));
		})();
	}, [debouncedSearchTerm]);

	return (
		<>
			<Head>
				<title>Searcher</title>
				<link
					rel='shortcut icon'
					type='image/x-icon'
					href='/images/GitHub-Mark.png'
				></link>
			</Head>
			<div className={styles.searcher}>
				<Input
					styleClassName={styles.searcher__input}
					value={userLogin}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserLogin(e.target.value.trim())}
					type='text'
					placeholder='Enter the user login...'
				/>
				<UserList />
			</div>
		</>
	);
};

export default Searcher;
