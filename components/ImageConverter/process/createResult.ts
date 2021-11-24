import { ConversionSettings } from '../ImageConverter';

const createResult = (amoguses: ImageData[][][], { resolution }: ConversionSettings) => {
	const frames = Array.from(Array(6).keys()).map(() => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('No context found on canvas.');
		return { canvas, ctx };
	});
};

export default createResult;
