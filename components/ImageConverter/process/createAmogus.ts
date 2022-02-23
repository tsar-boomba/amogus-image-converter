import { ConversionSettings } from '../ImageConverter';
import { ColorValue } from './getColorValues';

const createAmogus = async (
	colorValue: ColorValue,
	frames: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }[],
	{ resolution, backgroundColor, wa }: ConversionSettings,
) => {
	return new Promise<ImageData[]>((resolve) => {
		const editedFrames: ImageData[] = [];
		frames.forEach(async ({ canvas, ctx }) => {
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

export default createAmogus;
