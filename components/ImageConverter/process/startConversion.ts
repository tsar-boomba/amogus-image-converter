import { ConversionSettings } from '../ImageConverter';
import createAmogus from './createAmogus';
import getColorValues from './getColorValues';

const startConversion = async (fileInput: HTMLInputElement, settings: ConversionSettings) => {
	settings.status.set('Reading image...');
	const colorValues = await getColorValues(fileInput, settings);
	const amoguses = [];
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
};

export default startConversion;
