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
					rowValues.push({ r: data[0], g: data[1], b: data[2], a: data[3] });
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
			ctx?.drawImage(img, 0, 0, img.width / scale, img.height / scale);
			onLoad(ctx);
		};
		img.src = typeof readerE.target?.result === 'string' ? readerE.target.result : '';
	};
	reader.readAsDataURL(file);
	return ctx;
};

export default getColorValues;
