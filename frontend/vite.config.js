import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find:'@',
        replacement: path.resolve(path.join(__dirname, '/src'))
      }
    ]
  }
})
