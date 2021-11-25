import React, { useEffect, useRef, useState } from 'react';
import loadImage from './loadImage';
import startConversion from './process/startConversion';

export interface ConversionSettings {
	resolution: number;
	backgroundColor: {
		r: number;
		g: number;
		b: number;
		a: number;
	};
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
		resolution: 16,
		backgroundColor: {
			r: 0,
			g: 0,
			b: 0,
			a: 255,
		},
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
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<canvas ref={canvas} />
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
				<label>Resolution (lower is more detailed, but slower)</label>
				<input
					onChange={(e) =>
						setSettings({ ...settings, resolution: parseInt(e.target.value) })
					}
					defaultValue={16}
					placeholder='resolution'
					type='number'
				/>
				<label>Background Color (r, g, b, a)</label>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<input
						style={{ width: 75 }}
						defaultValue={0}
						placeholder='r'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									r: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{ width: 75 }}
						defaultValue={0}
						placeholder='g'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									g: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{ width: 75 }}
						defaultValue={0}
						placeholder='b'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									b: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{ width: 75 }}
						defaultValue={255}
						placeholder='a'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									a: parseInt(e.target.value),
								},
							})
						}
					/>
				</div>
				<input ref={fileInput} type='file' accept='.png,image/png,.jpg,.jpeg,image/jpeg' />
				<button
					onClick={(e) => {
						e.stopPropagation();

						const bg = settings.backgroundColor;
						// check for valid background color
						if (
							bg.r < 0 ||
							bg.g < 0 ||
							bg.b < 0 ||
							bg.a < 0 ||
							bg.r > 255 ||
							bg.g > 255 ||
							bg.g > 255 ||
							bg.a > 255
						) {
							return setErrors([
								...errors,
								'Background color values must be at least 0 and at most 255.',
							]);
						}

						// check for files resolution and refs
						if (
							fileInput.current?.files &&
							settings.resolution > 15 &&
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
							setErrors([
								...errors,
								'Be sure you have picked an image and resolution is at least 16.',
							]);
						}
					}}
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
