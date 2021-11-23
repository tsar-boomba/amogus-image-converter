import { ConversionSettings } from '../ImageConverter';

export interface ColorValue {
	r: number;
	g: number;
	b: number;
	a: number;
}

export type ColorValues = ColorValue[];
export type ImageColorValues = ColorValues[];

const getColorValues = (fileInput: HTMLInputElement, { resolution }: ConversionSettings) => {
	return new Promise<ImageColorValues>((resolve) => {
		const canvas = document.createElement('canvas');
		if (!fileInput.files) throw new Error('No files found in input');
		const colorValues: ImageColorValues = [];
		loadImageFromFile(canvas, fileInput.files[0], 1, (ctx) => {
			const lengthAmogus = Math.floor(canvas.width / resolution);
			const heightAmogus = Math.floor(canvas.height / resolution);
			let currX = 0;
			let currY = 0;
			for (let i = 0; i < heightAmogus; i++) {
				const rowValues: ColorValues = [];
				for (let j = 0; j < lengthAmogus; j++) {
					const { data } = ctx.getImageData(currX, currY, resolution, resolution);
					rowValues.push(avgForSection(data, resolution));
					currX += resolution;
				}
				colorValues.push(rowValues);
				currY += resolution;
				currX = 0;
			}
			resolve(colorValues);
		});
	});
};

const avgForSection = (data: Uint8ClampedArray, resolution: number) => {
	let r = 0,
		g = 0,
		b = 0;
	for (let i = 0; i < data.length; i += 4) {
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
	}
	r = r / (resolution * resolution);
	g = g / (resolution * resolution);
	b = b / (resolution * resolution);
	return { r, g, b, a: 255 };
};

const loadImageFromFile = (
	canvas: HTMLCanvasElement,
	file: Blob,
	scale: number,
	onLoad: (ctx: CanvasRenderingContext2D) => void = () => {},
) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('No context found on canvas.');
	const reader = new FileReader();
	reader.onload = (readerE) => {
		const img = new Image();
		img.onload = () => {
			canvas.width = img.width / scale;
			canvas.height = img.height / scale;
			ctx.drawImage(img, 0, 0, img.width / scale, img.height / scale);
			onLoad(ctx);
		};
		img.src = typeof readerE.target?.result === 'string' ? readerE.target.result : '';
	};
	reader.readAsDataURL(file);
	return ctx;
};

export default getColorValues;
