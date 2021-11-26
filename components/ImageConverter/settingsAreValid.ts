import React from 'react';
import { ConversionSettings } from './ImageConverter';

const settingsAreValid = (
	settings: ConversionSettings,
	[errors, setErrors]: [string[], React.Dispatch<React.SetStateAction<string[]>>],
) => {
	const bg = settings.backgroundColor;
	// check for valid background color
	if (
		typeof bg.r !== 'number' ||
		typeof bg.g !== 'number' ||
		typeof bg.b !== 'number' ||
		typeof bg.a !== 'number' ||
		bg.r < 0 ||
		bg.g < 0 ||
		bg.b < 0 ||
		bg.a < 0 ||
		bg.r > 255 ||
		bg.g > 255 ||
		bg.g > 255 ||
		bg.a > 255
	) {
		setErrors([...errors, 'Background color values must be at least 0 and at most 255.']);
		return false;
	}

	const res = settings.resolution;
	if (res < 16) {
		setErrors([...errors, 'Resolution must be at least 16.']);
		return false;
	}

	return true;
};

export default settingsAreValid;
