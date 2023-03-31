import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirection = () => {
	const { push } = useRouter();
	useEffect(() => {
		setTimeout(() => {
			push('/');
		}, 2000);
	}, []);
	return (
		<>
			<Head>
				<title>Error 404</title>
			</Head>
			<div className='error-404'>
				<h1>Error 404 page not found</h1>
			</div>
		</>
	);
};

export default Redirection;
