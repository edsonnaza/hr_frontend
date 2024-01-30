import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {loadEnv} from 'vite';

 

// https://vitejs.dev/config/
export default defineConfig(({  mode }) => { 
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins:[react()],
    server: {
      host:true
    },
    define: {
      'process.env.VITE_BASE_URL': 
      JSON.stringify(env.VITE_BASE_URL),
     // 'process.env.APP_USE_AVT': env.APP_USE_AVT,
    },
 
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import '/styles/main.scss';`,
      },
    },
  }
}
 
})