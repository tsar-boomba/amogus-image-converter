import { decompressFrames, ParsedFrame, parseGIF } from 'gifuct-js';
import { ConversionSettings } from '../ImageConverter';
import { ColorValue } from './getColorValues';

const createAmogus = (colorValue: ColorValue, { resolution }: ConversionSettings) => {
	return new Promise<ImageData[]>((resolve) => {
		fetch('/amogus.gif')
			.then((res) => res.arrayBuffer())
			.then((arrBuf) => Buffer.from(arrBuf))
			.then((buf) => {
				const frames = decompressFrames(parseGIF(buf), true);
				const editedFrames: ImageData[] = [];
				frames.forEach((frame) => {
					const { canvas, ctx } = loadImageToCanvas(frame, resolution);
					let x = 0;
					let y = 0;
					const newData = new Uint8ClampedArray();
					for (let i = 0; i < resolution; i++) {
						for (let j = 0; j < resolution; j++) {
							const pixel = ctx.getImageData(x, y, 1, 1);
							const data = pixel.data;
							const r = data[0];
							const g = data[1];
							const b = data[2];
							const a = data[3];
							console.log({ r, g, b, a });
							if (r === 255 && g === 255 && b === 255 && a === 255) {
								newData.set(
									[colorValue.r, colorValue.g, colorValue.b],
									newData.length,
								);
							}
							x += 1;
						}
						x = 0;
						y += 1;
					}
					const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
					image.data.set(newData);
					editedFrames.push(image);
				});
				resolve(editedFrames);
			});
	});
};

const loadImageToCanvas = (frame: ParsedFrame, resolution: number) => {
	const dims = frame.dims;
	const tmpCanvas = document.createElement('canvas');
	const tmpCtx = tmpCanvas.getContext('2d');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);
	if (!ctx || !tmpCtx) throw new Error('No context found on canvas.');
	tmpCanvas.width = dims.width;
	tmpCanvas.height = dims.height;
	const image = tmpCtx.createImageData(dims.width, dims.height);
	image.data.set(frame.patch);
	tmpCtx.putImageData(image, 0, 0);
	ctx.drawImage(tmpCanvas, resolution, resolution);
	canvas.width = dims.width;
	canvas.height = dims.height;
	ctx.drawImage(tmpCanvas, dims.left, dims.top);
	ctx.scale(resolution, resolution);
	canvas.width = resolution;
	canvas.height = resolution;
	return { canvas, ctx };
};

export default createAmogus;
