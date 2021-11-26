const loadImage = (canvas: HTMLCanvasElement, fileInput: HTMLInputElement, scale: number) => {
	const ctx = canvas.getContext('2d');
	fileInput.onchange = (inputE: any) => {
		const fileName = document.getElementById('fileName');
		if (!fileName) return;
		fileName.innerHTML = fileInput.value.split('\\')[2] || 'Choose Image';
		if (!fileInput.files || !fileInput.files[0]) {
			canvas.width = 0;
			canvas.height = 0;
			return;
		}
		const reader = new FileReader();
		reader.onload = (readerE) => {
			const img = new Image();
			img.onload = () => {
				canvas.style.display = 'inline-block';
				canvas.width = img.width / scale;
				canvas.height = img.height / scale;
				ctx?.drawImage(img, 0, 0, img.width / scale, img.height / scale);
			};
			img.src = typeof readerE.target?.result === 'string' ? readerE.target.result : '';
		};
		reader.readAsDataURL(inputE.target.files[0]);
	};
};

export default loadImage;
