import Image from 'next/image';

const Examples = () => {
	return (
		<div>
			<h1>Examples</h1>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Image src='/example1.jpeg' width={600} height={300} alt='Example image' priority />
				<div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
					<div>
						<Image
							src='/example1-16.gif'
							width={600}
							height={300}
							alt='Example with resolution 16'
							priority
						/>
						<p>Resolution: 16</p>
					</div>
					<div>
						<Image
							src='/example1-32.gif'
							width={600}
							height={300}
							alt='Example with resolution 32'
							priority
						/>
						<p>Resolution: 32</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Examples;
