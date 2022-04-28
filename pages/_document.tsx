/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-document-import-in-page */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Amogus Image Converter</title>
				<meta name='description' content='Convert images into twerking amogus gifs!' />

				<meta property='og:url' content='https://img-convert.igamble.dev/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Amogus Image Converter' />
				<meta
					property='og:description'
					content='Convert images into twerking amogus gifs!'
				/>
				<meta
					property='og:image'
					content='https://img-convert.igamble.dev/example1-32.gif'
				/>

				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='img-convert.igamble.dev' />
				<meta property='twitter:url' content='https://img-convert.igamble.dev/' />
				<meta name='twitter:title' content='Amogus Image Converter' />
				<meta
					name='twitter:description'
					content='Convert images into twerking amogus gifs!'
				/>
				<meta
					name='twitter:image'
					content='https://img-convert.igamble.dev/example1-32.gif'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
