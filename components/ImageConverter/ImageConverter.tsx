import React, { useEffect, useRef, useState } from 'react';
import loadImage from './loadImage';
import startConversion from './process/startConversion';
import Settings from './Settings';
import settingsAreValid from './settingsAreValid';
import Head from 'next/head';
import colors from '../../styles/colors';
import { getFrames } from './process/getFrames';

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
	frames: Promise<Buffer[]>;
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
		delay: 75,
		status: {
			value: status,
			set: setStatus,
		},
		frames: undefined as any,
	});
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (canvas.current && fileInput.current) {
			loadImage(canvas.current, fileInput.current, 4);
		}

		if (!settings.frames) {
			settings.frames = getFrames();
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
				<img ref={resultImg} alt='Result gif' style={{ marginTop: 16 }} />
			</div>
			<div
				style={{
					display: 'flex',
					flexFlow: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					backgroundColor: colors.secondary,
					color: 'white',
					margin: 32,
					padding: 16,
					borderRadius: 8,
					boxShadow: '0px 0px 24px 4px #00000080',
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
							padding: '8px',
							backgroundColor: colors.primary,
							cursor: 'pointer',
							border: 0,
							borderRadius: 8,
							boxShadow: '0px 0px 12px 4px #00000050',
						}}
						onClick={(e) => {
							e.stopPropagation();

							const fileUpload = fileInput.current;
							fileUpload && fileUpload.click();
						}}
					>
						<span id='fileName' style={{ fontWeight: 'bold' }}>
							Choose Image
						</span>
						<input
							ref={fileInput}
							style={{ position: 'absolute', left: '-99999rem' }}
							type='file'
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
					style={{
						padding: '8px',
						backgroundColor: colors.primary,
						cursor: 'pointer',
						border: 0,
						borderRadius: 8,
						boxShadow: '0px 0px 12px 4px #00000050',
						marginTop: 16,
						fontWeight: '600',
					}}
				>
					Start Conversion
				</button>
			</div>
			{errors.map((error, index) => (
				<p key={index} style={{ color: 'red', textAlign: 'center', width: 300 }}>
					{error}
				</p>
			))}
			<h1>{status}</h1>
		</>
	);
};

export default ImageConverter;
