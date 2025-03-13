import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080',  // Spring 서버 주소로 프록시 설정
    },
  },
};