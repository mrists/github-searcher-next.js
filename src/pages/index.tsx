import { UserService } from '@/API/UserService';
import Input from '@/components/UI/input/Input';
import UserList from '@/components/UserList/UserList';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetching } from '@/hooks/useFetching';
import styles from '@/styles/Searcher.module.scss';
import { IUser } from '@/types/types';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';

const Searcher: FC = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [userLogin, setUserLogin] = useState<string>('');
	const debouncedSearchTerm = useDebounce<string>(userLogin, 500);
	const [fetched, setFetched] = useState<boolean>(false);

	const [fetchUsers, error] = useFetching(async () => {
		if (!userLogin) {
			setUsers([]);
			setFetched(false);
			return;
		}

		const { data } = await UserService.getUsers(userLogin);

		const { items } = data;

		setFetched(true);
		setUsers([...items]);
	});

	useEffect(() => {
		fetchUsers();
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
				<UserList
					error={error}
					fetched={fetched}
					users={users}
				/>
			</div>
		</>
	);
};

export default Searcher;
