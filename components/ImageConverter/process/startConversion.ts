import { ConversionSettings } from '../ImageConverter';
import createGif from './createGif';
import getColorValues from './getColorValues';

const startConversion = async (fileInput: HTMLInputElement, settings: ConversionSettings) => {
	const colorValues = getColorValues(fileInput, settings);
	createGif(await colorValues);
};

export default startConversion;
