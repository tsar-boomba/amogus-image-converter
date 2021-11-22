import { GifUtil } from 'gifwrap';
import { ImageColorValues } from './getColorValues';

const createGif = async (colorValues: ImageColorValues) => {
	const gif = await GifUtil.read('amogus.gif');
	gif.frames.forEach((frame) => {
		const buf = frame.bitmap.data;
		frame.scanAllCoords((x, y, bi) => {
			const gifR = buf[bi];
			const gifG = buf[bi + 1];
			const gifB = buf[bi + 2];
			const gifA = buf[bi + 3];
		});
	});
};

export default createGif;
