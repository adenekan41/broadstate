module.exports = {
	env: {
		test: {
			presets: [
				"@babel/env",
				{
					spec: true,
					modules: false,
					forceAllTransforms: true,
					useBuiltIns: "usage",
					targets: {
						esmodules: true,
						browsers: true,
					},
				},
				"@babel/react",
			],
			plugins: ["@babel/plugin-transform-runtime"],
		},
	},
	presets: [["@babel/env", { loose: true, modules: false }]],
};
