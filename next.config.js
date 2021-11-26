/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.output.webassemblyModuleFilename = 'public/wasm/[modulehash].wasm';
		config.experiments = { asyncWebAssembly: true };
		return config;
	},
};
