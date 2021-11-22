import { ConversionSettings } from '../ImageConverter';
import getColorValues from './getColorValues';

const startConversion = async (fileInput: HTMLInputElement, settings: ConversionSettings) => {
	const colorValues = getColorValues(fileInput, settings);
	console.log(await colorValues);
};

export default startConversion;
