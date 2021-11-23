import { decompressFrames, ParsedFrame, parseGIF } from 'gifuct-js';
import { ConversionSettings } from '../ImageConverter';
import { ColorValue, ColorValues, ImageColorValues } from './getColorValues';

const createAmogus = (colorValue: ColorValue, { resolution }: ConversionSettings) => {
	return new Promise<any>((resolve) => {
		fetch('/amogus.gif')
			.then((res) => res.arrayBuffer())
			.then((arrBuf) => Buffer.from(arrBuf))
			.then((buf) => {
				const frames = decompressFrames(parseGIF(buf), true);
				frames.forEach((frame) => {
					loadImageToCanvas(frame, resolution, (canvas, ctx) => {
						const x = 0;
						const y = 0;
						for (let i = 0; i < resolution; i++) {
							for (let j = 0; j < resolution; j++) {
								const pixel = ctx.getImageData(x, y, 1, 1);
								const data = pixel.data;
								const r = data[0];
								const g = data[1];
								const b = data[2];
								const a = data[3];
								if (r === 255 && g === 255 && b === 255 && a === 255) {
									pixel.data.set([colorValue.r, colorValue.g, colorValue.b, 255]);
								}
							}
						}
						document.body.removeChild(canvas);
					});
				});
				resolve('done!');
			});
	});
};

const loadImageToCanvas = (
	frame: ParsedFrame,
	resolution: number,
	onLoad: (cavnas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void,
) => {
	const canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('No context found on canvas.');
	canvas.width = frame.dims.width;
	canvas.height = frame.dims.height;
	ctx.createImageData(frame.dims.width, frame.dims.height);
	const image = ctx.getImageData(0, 0, frame.dims.width, frame.dims.height);
	image.data.set(frame.patch);
	ctx.scale(resolution, resolution);
	canvas.width = resolution;
	canvas.height = resolution;
	onLoad(canvas, ctx);
};

export default createAmogus;
