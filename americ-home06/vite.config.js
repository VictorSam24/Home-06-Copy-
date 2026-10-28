import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const page = (name) => resolve(import.meta.dirname, name);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('index.html'),
        'industrial-iot': page('industrial-iot.html'),
        'home06-demo': page('home06-demo.html'),
        styleguide: page('styleguide.html'),
      },
    },
  },
});
