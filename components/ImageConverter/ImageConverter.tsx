import React, { useEffect, useRef, useState } from 'react';
import loadImage from './loadImage';
import startConversion from './process/startConversion';
import Settings from './Settings';
import settingsAreValid from './settingsAreValid';
import Head from 'next/head';

export interface ConversionSettings {
	resolution: number;
	backgroundColor: {
		r: number;
		g: number;
		b: number;
		a: number;
	};
	delay: number;
	status: {
		value: string;
		set: React.Dispatch<React.SetStateAction<string>>;
	};
}

const ImageConverter = () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const fileInput = useRef<HTMLInputElement>(null);
	const resultImg = useRef<HTMLImageElement>(null);
	const [status, setStatus] = useState('');
	const [settings, setSettings] = useState<ConversionSettings>({
		resolution: 32,
		backgroundColor: {
			r: 0,
			g: 0,
			b: 0,
			a: 255,
		},
		delay: 50,
		status: {
			value: status,
			set: setStatus,
		},
	});
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (canvas.current && fileInput.current) {
			loadImage(canvas.current, fileInput.current, 4);
		}
	}, []);

	return (
		<>
			<Head>
				<title>{status ? status : 'Amogus Image Converter'}</title>
			</Head>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 16,
				}}
			>
				<canvas ref={canvas} width={0} height={0} />
				<img ref={resultImg} />
			</div>
			<div
				style={{
					display: 'flex',
					flexFlow: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Settings settings={settings} setSettings={setSettings} />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginTop: 16,
					}}
				>
					<button
						style={{
							padding: '8px 16px',
							backgroundColor: 'lightblue',
							cursor: 'pointer',
						}}
						onClick={(e) => {
							e.stopPropagation();

							const fileUpload = fileInput.current;
							fileUpload && fileUpload.click();
						}}
					>
						<span id='fileName'>Choose Image</span>
						<input
							ref={fileInput}
							style={{ position: 'absolute', left: '-99999rem' }}
							type='file'
							id='fileUpload'
							accept='.png,image/png,.jpg,.jpeg,image/jpeg'
						/>
					</button>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation();

						// checking settings
						if (!settingsAreValid(settings, [errors, setErrors])) return;

						// check for files resolution and refs
						if (
							fileInput.current?.files &&
							fileInput.current?.files[0] &&
							canvas.current &&
							fileInput.current &&
							resultImg.current
						) {
							setErrors([]);
							try {
								startConversion(fileInput.current, resultImg.current, settings);
							} catch (err) {
								console.error(err);
								setStatus('There was an error converting your image D:');
							}
						} else {
							setErrors([...errors, 'Be sure you have picked an image.']);
						}
					}}
					style={{ marginTop: 16 }}
				>
					Start Conversion
				</button>
				{errors.map((error, index) => (
					<p key={index} style={{ color: 'red', textAlign: 'center', width: 300 }}>
						{error}
					</p>
				))}
			</div>
			<h1>{status}</h1>
		</>
	);
};

export default ImageConverter;
