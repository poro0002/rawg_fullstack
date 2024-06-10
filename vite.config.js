import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Other Vite configurations...
  define: {  // <—————————— makes it so then front end can access the node env
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});
