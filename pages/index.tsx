import type { NextPage } from 'next';
import Head from 'next/head';
import Examples from '../components/Examples';
import ImageConverter from '../components/ImageConverter';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Amogus Image Converter</title>
			</Head>
			<ImageConverter />
			<Examples />
		</div>
	);
};

export default Home;
