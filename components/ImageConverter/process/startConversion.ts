import { ConversionSettings } from '../ImageConverter';
import createAmogus from './createAmogus';
import getColorValues from './getColorValues';

const startConversion = async (fileInput: HTMLInputElement, settings: ConversionSettings) => {
	const colorValues = await getColorValues(fileInput, settings);
	console.log(await createAmogus(colorValues[0][0], settings));
};

export default startConversion;
