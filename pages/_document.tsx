/* eslint-disable @next/next/no-document-import-in-page */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta property='og:title' content='Amogus Image Converter' />
				<meta
					property='og:description'
					content='Convert images into twerking amogus gifs!'
				/>
				<meta property='og:image' content='/example1-32.gif' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
