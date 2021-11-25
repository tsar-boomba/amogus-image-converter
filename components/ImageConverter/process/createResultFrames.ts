import { ConversionSettings } from '../ImageConverter';

const createResultFrames = (amoguses: ImageData[][][], { resolution }: ConversionSettings) => {
	return new Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }[]>(
		(resolve) => {
			const finalWidth = resolution * amoguses[0].length;
			const finalHeight = resolution * amoguses.length;
			const frames = Array.from(Array(5).keys()).map(() => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) throw new Error('No context found on canvas.');
				canvas.height = finalHeight;
				canvas.width = finalWidth;
				return { canvas, ctx };
			});

			const newFrames = frames.map((frame, frameIndex) => {
				let x = 0;
				let y = 0;
				for (let i = 0; i < amoguses.length; i++) {
					for (let j = 0; j < amoguses[0].length; j++) {
						const amogus = amoguses[i][j][frameIndex];
						// const section = ctx.getImageData(i, j, resolution, resolution);
						// section.data.set(amogus.data);
						frame.ctx.putImageData(amogus, x, y, 0, 0, resolution, resolution);
						x += resolution;
					}
					x = 0;
					y += resolution;
				}
				return frame;
			});
			resolve(newFrames);
		},
	);
};

export default createResultFrames;
