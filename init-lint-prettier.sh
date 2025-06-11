#!/bin/zsh

echo "📦 安装 ESLint + Prettier + TypeScript 插件..."

npm install --save-dev \
  eslint \
  prettier \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-config-prettier \
  eslint-plugin-prettier \
  husky \
  lint-staged

echo "✅ 依赖安装完成"

# .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },
  ignorePatterns: ['dist/', 'build/', 'node_modules/'],
}
EOF

# .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
EOF

# .prettierignore
cat > .prettierignore << 'EOF'
build/
dist/
node_modules/
EOF

# VSCode settings
mkdir -p .vscode
cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
EOF

# package.json lint scripts
npx json -I -f package.json -e '
this.scripts ||= {};
this.scripts.lint = "eslint --ext .js,.jsx,.ts,.tsx src";
this.scripts.format = "prettier --write \\"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\\"";
'

# 初始化 Husky
npx husky install
npm pkg set scripts.prepare="husky install"

# 添加 Husky hook
npx husky add .husky/pre-commit "npx lint-staged"

# 添加 lint-staged config
npx json -I -f package.json -e '
this["lint-staged"] = {
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
};
'

echo "🎉 配置完成！以下功能已启用："
echo "1. ESLint & Prettier 校验"
echo "2. VSCode 保存自动格式化"
echo "3. Git 提交时自动格式修复"

echo "💡 请确保 VSCode 已安装 Prettier 和 ESLint 插件"
