import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'


export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        }
      }
    },
    //代理跨域
    server:{
      proxy:{
        //匹配到这个路径
        [env.VITE_APP_BASE_API]:{
          target: env.VITE_SERVER,
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})

