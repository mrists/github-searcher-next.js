import Layout from '@/Layout/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
	<Layout>
		<Component {...pageProps} />
	</Layout>
);

export default App;
