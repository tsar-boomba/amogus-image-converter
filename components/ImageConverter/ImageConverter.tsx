import { useEffect, useRef, useState } from 'react';
import loadImage from './loadImage';
import startConversion from './process/startConversion';

export interface ConversionSettings {
	resolution: number;
}

const ImageConverter = () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const fileInput = useRef<HTMLInputElement>(null);
	const [settings, setSettings] = useState<ConversionSettings>({
		resolution: 16,
	});
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (canvas.current && fileInput.current) {
			loadImage(canvas.current, fileInput.current, 4);
		}
	}, []);

	return (
		<>
			<canvas ref={canvas} />
			<div style={{ display: 'flex', flexFlow: 'column' }}>
				<label>Resolution (lower is more detailed, but slower)</label>
				<input
					onChange={(e) =>
						setSettings({ ...settings, resolution: parseInt(e.target.value) })
					}
					placeholder='resolution'
					type='number'
				/>
				<input ref={fileInput} type='file' accept='.png,image/png' />
				<button
					onClick={(e) => {
						e.stopPropagation();
						if (
							fileInput.current?.value &&
							settings.resolution > 0 &&
							canvas.current &&
							fileInput.current
						) {
							setErrors([]);
							startConversion(fileInput.current, settings);
						} else {
							setErrors([
								...errors,
								'Be sure you have picked an image and resolution is greater than 0.',
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
		</>
	);
};

export default ImageConverter;
