import { ConversionSettings } from '../ImageConverter';
import { ColorValue } from './getColorValues';

function adjust(color: Omit<ColorValue, 'a'> & { a?: number }, percent: number): ColorValue {
	let { r, g, b } = color;

	const calculatedPercent = (100 + percent) / 100;

	r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
	g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
	b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));

	return { r, g, b, a: 255 };
}

const replaceColors = (target: ColorValue, bg: ColorValue, data: Uint8ClampedArray) => {
	return new Promise<number[]>((resolve) => {
		const newData: number[] = [];
		const darkened = adjust(target, -30);
		setTimeout(() => {
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const a = data[i + 3];
				if (r >= 214 && g >= 224 && b >= 240 && a >= 250) {
					newData.push(target.r, target.g, target.b, target.a);
				} else if (r == 131 && g == 148 && b == 191 && a == 255) {
					newData.push(darkened.r, darkened.g, darkened.b, darkened.a);
				} else if (r == 0 && g == 0 && b == 0) {
					// for adding user-defined bg color
					newData.push(bg.r, bg.g, bg.b, bg.a);
				} else {
					newData.push(r, g, b, a);
				}
			}
			resolve(newData);
		}, 0);
	});
};

const createAmogus = async (
	colorValue: ColorValue,
	frames: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }[],
	{ resolution, backgroundColor }: ConversionSettings,
) => {
	return new Promise<ImageData[]>((resolve) => {
		const editedFrames: ImageData[] = [];
		frames.forEach(async ({ canvas, ctx }, i, arr) => {
			const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

			const newData = await replaceColors(colorValue, backgroundColor, data);

			const image = ctx.createImageData(canvas.width, canvas.height);
			image.data.set(newData);

			const tmpCanvas1 = document.createElement('canvas');
			tmpCanvas1.width = canvas.width;
			tmpCanvas1.height = canvas.height;
			const tmpCtx1 = tmpCanvas1.getContext('2d');
			const tmpCanvas2 = document.createElement('canvas');
			tmpCanvas2.width = resolution;
			tmpCanvas2.height = resolution;
			const tmpCtx2 = tmpCanvas2.getContext('2d');
			if (!tmpCtx1 || !tmpCtx2) throw new Error('No 2d context on canvas');

			tmpCtx1.putImageData(image, 0, 0);

			tmpCtx2.drawImage(tmpCanvas1, 0, 0, resolution, resolution);

			editedFrames.push(tmpCtx2.getImageData(0, 0, resolution, resolution));

			// after last amogus created, resolve
			if (i === arr.length - 1) resolve(editedFrames);
		});
	});
};

export default createAmogus;
