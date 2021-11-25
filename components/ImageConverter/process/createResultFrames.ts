import { ConversionSettings } from '../ImageConverter';

const createResultFrames = (amoguses: ImageData[][][], { resolution }: ConversionSettings) => {
	return new Promise<CanvasRenderingContext2D[]>((resolve) => {
		const finalWidth = resolution * amoguses[0].length;
		const finalHeight = resolution * amoguses.length;
		const frames = Array.from(Array(5).keys()).map(() => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.height = finalHeight;
			canvas.width = finalWidth;
			if (!ctx) throw new Error('No context found on canvas.');
			return ctx;
		});

		const newFrames = frames.map((frameCtx, frameIndex) => {
			let x = 0;
			let y = 0;
			for (let i = 0; i < amoguses.length; i++) {
				for (let j = 0; j < amoguses[0].length; j++) {
					const amogus = amoguses[i][j][frameIndex];
					// const section = ctx.getImageData(i, j, resolution, resolution);
					// section.data.set(amogus.data);
					frameCtx.putImageData(amogus, x, y, 0, 0, resolution, resolution);
					x += resolution;
				}
				x = 0;
				y += resolution;
			}
			return frameCtx;
		});
		resolve(newFrames);
	});
};

export default createResultFrames;
