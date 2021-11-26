import React from 'react';
import { ConversionSettings } from './ImageConverter';

interface SettingsProps {
	settings: ConversionSettings;
	setSettings: React.Dispatch<React.SetStateAction<ConversionSettings>>;
}

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
				<label>Resolution (lower is more detailed, but slower)</label>
				<input
					onChange={(e) =>
						setSettings({ ...settings, resolution: parseInt(e.target.value) })
					}
					defaultValue={16}
					placeholder='resolution'
					type='number'
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
						style={{ width: 50 }}
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
						style={{ width: 50 }}
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
						style={{ width: 50 }}
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
						style={{ width: 50 }}
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
					defaultValue={50}
					placeholder='delay (ms)'
					type='number'
					onChange={(e) => setSettings({ ...settings, delay: parseInt(e.target.value) })}
				/>
			</div>
		</>
	);
};

export default Settings;
