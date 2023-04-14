import Layout from '@/components/Layout/Layout';
import store, { wrapper } from '@/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';

const App: FC<AppProps> = ({ Component, pageProps }) => (
	<Provider store={store}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</Provider>
);

export default wrapper.withRedux(App);
