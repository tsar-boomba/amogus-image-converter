import type { NextPage } from 'next';
import Head from 'next/head';
import Examples from '../components/Examples';
import ImageConverter from '../components/ImageConverter';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Head>
					<title>Amogus Image Converter</title>
				</Head>
				<ImageConverter />
				<div>
					<Link href='/about'>
						<a style={{ fontSize: 24, color: 'blue', textDecoration: 'underline' }}>
							About
						</a>
					</Link>
				</div>
				<div>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/tsar-boomba/amogus-image-converter'
						style={{ fontSize: 24, color: 'blue', textDecoration: 'underline' }}
					>
						Source Code :)
					</a>
				</div>
				<Examples />
			</main>
		</div>
	);
};

export default Home;
