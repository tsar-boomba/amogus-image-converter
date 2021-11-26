// The entry file of your WebAssembly module.

function appendToUnit8Clamped(arr1: Uint8ClampedArray, arr2: u8[]): Uint8ClampedArray {
	const tmp = new Uint8ClampedArray(arr1.byteLength + arr2.length);
	tmp.set(arr1, 0);

	// puts numbers from number arr into unit8clamped
	for (let i = 0; i < arr2.length; i++) {
		tmp[arr1.byteLength + i] = arr2[i];
	}

	return tmp;
}

export function processAmogus(
	nR: u8,
	nG: u8,
	nB: u8,
	nA: u8,
	bR: u8,
	bG: u8,
	bB: u8,
	bA: u8,
	data: Uint8ClampedArray,
): Uint8ClampedArray {
	let newData = new Uint8ClampedArray(0);
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const a = data[i + 3];
		if (r >= 250 && g >= 250 && b >= 250 && a >= 250) {
			newData = appendToUnit8Clamped(newData, [nR, nG, nB, nA]);
		} else if (r == 0 && g == 0 && b == 0 && a == 0) {
			// for adding user-defined bg color
			newData = appendToUnit8Clamped(newData, [bR, bG, bB, bA]);
		} else {
			newData = appendToUnit8Clamped(newData, [r, g, b, a]);
		}
	}
	return newData;
}

export const Uint8ClampedArrayID = idof<Uint8ClampedArray>();
