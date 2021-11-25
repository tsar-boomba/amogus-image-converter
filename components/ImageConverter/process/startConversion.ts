import { ConversionSettings } from '../ImageConverter';
import createAmogus from './createAmogus';
import createResultFrames from './createResultFrames';
import getColorValues from './getColorValues';

const startConversion = async (fileInput: HTMLInputElement, settings: ConversionSettings) => {
	const GIF = (await import('gif.js.optimized')).default;

	if (!fileInput.files) throw new Error('No file recieved.');
	settings.status.set('Reading image...');
	// getting avg color value for the resolution by resoltuion area
	const colorValues = await getColorValues(fileInput, settings);

	// creating and pushing amoguses to array
	const amoguses: ImageData[][][] = [];
	settings.status.set('Creating amoguses...');
	for (let i = 0; i < colorValues.length; i++) {
		const row = [];
		for (let j = 0; j < colorValues[0].length; j++) {
			const amogusFrames = await createAmogus(colorValues[i][j], settings);
			row.push(amogusFrames);
		}
		amoguses.push(row);
	}
	settings.status.set('Composing result...');

	// putting amoguses on their point in img
	const completedFrames = await createResultFrames(amoguses, settings);

	// creating gif and putting in in img element
	const finalGif = new GIF({
		quality: 5,
		width: amoguses[0].length * settings.resolution,
		height: amoguses.length * settings.resolution,
	});
	completedFrames.forEach((frame) => finalGif.addFrame(frame, { delay: 50, copy: true }));
	finalGif.on('finished', (blob: Blob) => {
		const result = new Image();
		document.body.appendChild(result);
		const resultUrl = URL.createObjectURL(blob);
		result.src = resultUrl;
	});
	finalGif.render();
};

// const getImage = (file: Blob) => {
// 	return new Promise<HTMLImageElement>((resolve) => {
// 		const reader = new FileReader();
// 		reader.onload = (readerE) => {
// 			const img = new Image();
// 			img.onload = () => {
// 				resolve(img);
// 			};
// 			img.src = typeof readerE.target?.result === 'string' ? readerE.target.result : '';
// 		};
// 		reader.readAsDataURL(file);
// 	});
// };

export default startConversion;
