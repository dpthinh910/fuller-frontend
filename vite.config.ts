import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path/posix';

const projectRootDir = path.resolve(__dirname);

export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
    ],
  },
  optimizeDeps: {
    include: ['@ant-design/icons', '@ant-design/colors'],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
