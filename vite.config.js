import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // <-- 1. Import ปลั๊กอินมา

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue() // <-- 2. เรียกใช้งานปลั๊กอินในนี้
  ],
  
  // (อันนี้ของเดิมที่แก้ ngrok ไม่ต้องลบนะ)
  server: {
    allowedHosts: [
      '.ngrok-free.app' 
    ]
  }
})