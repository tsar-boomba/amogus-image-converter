import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const About = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Head>
					<title>About - Amogus Image Converter</title>
				</Head>
				<h1>About Amogus Image Converter</h1>

				<h2>Purpose</h2>
				<p>
					The purpose of this project is to bring amogus image conversion into your
					pocket.
				</p>

				<h2>Inspiration</h2>
				<p>
					I was inspired to create this by my friend{' '}
					<a
						style={{ color: 'blue', textDecoration: 'underline' }}
						href='https://github.com/hmagan'
						rel='noreferrer'
					>
						hmagan
					</a>{' '}
					after he made a version of this in python.
				</p>

				<h2>Improvements</h2>
				<ul>
					<li>Faster algorithm (Done :P)</li>
					<li>Better styling</li>
				</ul>
				<Link href='/'>
					<a style={{ fontSize: 24, color: 'blue', textDecoration: 'underline' }}>Home</a>
				</Link>
			</main>
		</div>
	);
};

export default About;
