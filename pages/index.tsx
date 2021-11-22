import type { NextPage } from 'next';
import Head from 'next/head';
import ImageConverter from '../components/ImageConverter';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Amogus Image Converter</title>
			</Head>
			<ImageConverter />
		</div>
	);
};

export default Home;
