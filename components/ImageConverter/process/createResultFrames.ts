import { ConversionSettings } from '../ImageConverter';

const createResultFrames = (
	amoguses: ImageData[][][],
	{ resolution, wave, waveSize }: ConversionSettings,
) => {
	const isDiagonal = wave === 'diagonal';
	return new Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }[]>(
		(resolve) => {
			const finalWidth = resolution * amoguses[0].length;
			const finalHeight = resolution * amoguses.length;
			const frames = Array.from(Array(6).keys()).map(() => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) throw new Error('No context found on canvas.');
				canvas.height = finalHeight;
				canvas.width = finalWidth;
				return { canvas, ctx };
			});

			const newFrames = frames.map((frame, frameIndex) => {
				let waveIndex = 0;
				let x = 0;
				let y = 0;

				const resetWaveIndex = () =>
					isDiagonal
						? (waveIndex = (waveIndex + 1 / (waveSize * 3)) % 6)
						: (waveIndex = (waveIndex + 1 / waveSize) % 6);

				for (let i = 0; i < amoguses.length; i++) {
					if (wave === 'horizontal') waveIndex = 0;

					for (let j = 0; j < amoguses[0].length; j++) {
						const amogus = amoguses[i][j][(frameIndex + Math.floor(waveIndex)) % 6];
						frame.ctx.putImageData(amogus, x, y, 0, 0, resolution, resolution);
						x += resolution;
						if (isDiagonal || wave === 'horizontal') resetWaveIndex();
					}

					x = 0;
					y += resolution;
					if (isDiagonal || wave === 'vertical') resetWaveIndex();
				}
				return frame;
			});
			resolve(newFrames);
		},
	);
};

export default createResultFrames;
