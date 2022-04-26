import React from 'react';
import { ConversionSettings } from './ImageConverter';

interface SettingsProps {
	settings: ConversionSettings;
	setSettings: React.Dispatch<React.SetStateAction<ConversionSettings>>;
}

const inputStyle: React.CSSProperties = {
	padding: 4,
	border: '2px solid #000000',
	borderRadius: 8,
};

const Settings: React.VFC<SettingsProps> = ({ settings, setSettings }) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 16,
				}}
			>
				<label>Resolution (32 - 64 recommended)</label>
				<input
					onChange={(e) =>
						setSettings({ ...settings, resolution: parseInt(e.target.value) })
					}
					defaultValue={32}
					placeholder='resolution'
					type='number'
					style={inputStyle}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 16,
				}}
			>
				<label>Background Color (r, g, b, a)</label>
				<div>
					<input
						style={{
							width: 50,
							color: 'red',
							borderColor: 'red',
							border: '2px solid red',
							borderRadius: 8,
							margin: 4,
						}}
						defaultValue={0}
						placeholder='r'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									r: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{
							width: 50,
							color: 'green',
							borderColor: 'green',
							border: '2px solid green',
							borderRadius: 8,
							margin: 4,
						}}
						defaultValue={0}
						placeholder='g'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									g: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{
							width: 50,
							color: 'blue',
							borderColor: 'blue',
							border: '2px solid blue',
							borderRadius: 8,
							margin: 4,
						}}
						defaultValue={0}
						placeholder='b'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									b: parseInt(e.target.value),
								},
							})
						}
					/>
					<input
						style={{
							width: 50,
							color: 'grey',
							borderColor: 'grey',
							border: '2px solid grey',
							borderRadius: 8,
							margin: 4,
						}}
						defaultValue={255}
						placeholder='a'
						type='number'
						onChange={(e) =>
							setSettings({
								...settings,
								backgroundColor: {
									...settings.backgroundColor,
									a: parseInt(e.target.value),
								},
							})
						}
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 16,
				}}
			>
				<label>Delay (milliseconds between gif frames)</label>
				<input
					defaultValue={75}
					placeholder='delay (ms)'
					type='number'
					onChange={(e) => setSettings({ ...settings, delay: parseInt(e.target.value) })}
					style={inputStyle}
				/>
			</div>
		</>
	);
};

export default Settings;
