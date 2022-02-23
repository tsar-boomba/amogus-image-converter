import { ParsedFrame } from 'gifuct-js';
import { ConversionSettings } from '../ImageConverter';
import { ColorValue } from './getColorValues';

const createAmogus = async (
	colorValue: ColorValue,
	frames: ParsedFrame[],
	{ resolution, backgroundColor, wa }: ConversionSettings,
) => {
	return new Promise<ImageData[]>((resolve) => {
		const editedFrames: ImageData[] = [];
		frames.forEach(async (frame) => {
			const { canvas, ctx } = loadImageToCanvas(frame, resolution);
			const { data } = ctx.getImageData(0, 0, resolution, resolution);

			let newData = new Uint8ClampedArray();

			// webassembly stuff :D, find source code in /assembly/index.ts
			const { __getUint8ClampedArray, Uint8ClampedArrayID, __newArray, processAmogus } =
				await wa;
			const dataPtr = processAmogus(
				colorValue.r,
				colorValue.g,
				colorValue.b,
				colorValue.a,
				backgroundColor.r,
				backgroundColor.g,
				backgroundColor.b,
				backgroundColor.a,
				__newArray(Uint8ClampedArrayID, data),
			);
			newData = __getUint8ClampedArray(dataPtr);

			const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
			image.data.set(newData);
			editedFrames.push(image);
			canvas.remove();
		});
		resolve(editedFrames);
	});
};

const loadImageToCanvas = (frame: ParsedFrame, resolution: number) => {
	const sides = frame.dims;
	const scale = (res: number, side: number) => side * (res / side);
	const tmpCanvas = document.createElement('canvas');
	const tmpCtx = tmpCanvas.getContext('2d');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx || !tmpCtx) throw new Error('No context found on canvas.');
	tmpCanvas.width = sides.width;
	tmpCanvas.height = sides.height;
	const image = tmpCtx.createImageData(sides.width, sides.height);
	image.data.set(frame.patch);
	tmpCtx.putImageData(image, 0, 0);
	canvas.width = scale(resolution, sides.width);
	canvas.height = scale(resolution, sides.height);
	ctx.drawImage(tmpCanvas, 0, 0, scale(resolution, sides.width), scale(resolution, sides.height));
	tmpCanvas.remove();
	return { canvas, ctx };
};

export default createAmogus;
