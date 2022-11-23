import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://api.cup2022.ir/api/v1",
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ""),
			},
			cors: false,
		},
	},
});
