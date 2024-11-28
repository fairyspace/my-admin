import globals from 'globals'
import jsLint from '@eslint/js'
import tsLint from 'typescript-eslint'
import vueLint from 'eslint-plugin-vue'

export default [
  // 指定文件匹配模式 和语言选项
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] }, //["**/*.vue"]

  // 指定全局变量和环境
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12, // 使用最新的 ECMAScript 语法
      sourceType: 'module', // 代码是 ECMAScript 模块
      parserOptions: { parser: tsLint.parser } // 使用 TypeScript 解析器
    }
  },

  // 使用的扩展配置 解析器选项
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...vueLint.configs['flat/essential'],

  // 自定义规则
  {
    rules: {
      'no-console': import.meta.env === 'production' ? 'warn' : 'off', // 生产环境中警告 console 使用，开发环境中关闭规则
      'no-debugger': import.meta.env === 'production' ? 'warn' : 'off', // 生产环境中警告 debugger 使用，开发环境中关闭规则
      indent: ['warn', 2], // 缩进使用 2 个空格 而不是 4 个  error
      'linebreak-style': ['warn', 'windows'], // 使用 Unix 风格的换行符
      quotes: ['warn', 'single'], // 使用单引号
      semi: ['warn', 'never'], // 语句末尾不加分号
      'no-unused-vars': 'off', // 关闭未使用变量警告
      '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量警告
      'vue/multi-word-component-names': 'off' //Vue 组件的名称应该是多词的，以提高可读性和维护性
    }
  },
  // 忽略文件
  {
    ignores: [
      '**/dist',
      './src/main.ts',
      '.vscode',
      '.idea',
      '*.sh',
      '**/node_modules',
      '*.md',
      '*.woff',
      '*.woff',
      '*.ttf',
      'yarn.lock',
      'package-lock.json',
      '/public',
      '/docs',
      '**/output',
      '.husky',
      '.local',
      '/bin',
      'Dockerfile'
    ]
  }
]
