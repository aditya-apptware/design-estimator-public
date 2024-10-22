import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/design-estimator/', // Replace REPO_NAME with your GitHub repository name
});
