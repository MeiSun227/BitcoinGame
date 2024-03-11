export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
			babelConfig: false,
		},
	},
};
