export const getFrames = async () => {
	const reses = await Promise.all(
		Array.from(Array(6).keys()).map((_, i) =>
			fetch(`/${i}.png`, { headers: { accept: 'image/png' } }),
		),
	);

	const blobs = await Promise.all(reses.map((res) => res.blob()));

	const buffers = await Promise.all(
		blobs.map((blob) => {
			return new Promise<Buffer>((resolve) => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) throw new Error('No ctx on canvas');
				const dataUrl = URL.createObjectURL(blob);
				const img = new Image();

				img.onload = () => {
					ctx.drawImage(img, 0, 0);
					resolve(Buffer.from(ctx.getImageData(0, 0, 75, 65).data));
				};

				img.src = dataUrl;
			});
		}),
	);

	return buffers;
};
