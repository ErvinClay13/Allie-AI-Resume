// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace this with your actual repo name
const repoName = 'Allie-AI-Resume'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
