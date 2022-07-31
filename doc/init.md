# Init

项目构建过程记录

## 生成 package.json

```bash
pnpm init
```

添加项目环境要求 到 [package.json](../package.json)

```json
{
  "name": "@bello-osr/monorepo",
  "scripts": {
    "preinstall": "pnpm add bin-wrapper-china -D -w && china-bin-env"
  },
  "engines": {
    "node": "^12 || >=14",
    "pnpm": "^6 || >=5"
  },
  "resolutions": {
    "bin-wrapper": "npm:bin-wrapper-china"
  }
}
```

[pnpm 常见问题解决](https://pnpm.io/zh/faq)

[bin-wrapper-china](https://www.npmjs.com/package/bin-wrapper-china) - 解决部分包安装失败, [为什么可以做到？](https://segmentfault.com/a/1190000021168459)

## pnpm Monorepo

[pnpm Monorepo 了解](https://zhuanlan.zhihu.com/p/373935751) ｜ [pnpm-workspace 官方文档](https://pnpm.io/zh/pnpm-workspace_yaml)

### 具体步骤

根目录创建 [pnpm-workspace.yaml](../pnpm-workspace.yaml)， 创建文件夹 `packages` 和 `apps`

```yaml
packages:
  # all packages in subdirs of packages/
  - 'packages/**'
  # all projects in subdirs of apps/
  - 'apps/**'
```

## 添加一个 packages

在 `packages` 中新建文件夹 `utils`, 然后进去执行 `pnpm init`，然后修改生成的 [package.json](../packages/utils/package.json)

```json
{
  "name": "@bello-osr/utils",
  "version": "1.0.0",
  "description": "工具类",
  "main": "index.ts",
  "license": "ISC"
}
```

留意 `"name": "@bello-osr/utils"` 这里 `@xxx/` 的 `xxx` 是组织名，方便整合这一系列的包

新建 [index.ts](../packages/utils/index.ts) `"main": "index.ts"` 这里所声明的入口文件

用上面的方式创建 `api` 这个包

```json
{
  "name": "@bello-osr/api",
  "version": "1.0.0",
  "description": "api地址管理",
  "main": "index.ts",
  "license": "ISC"
}
```

然后让 `@bello-osr/api` 应用 `@bello-osr/utils` 导出的方法, 在根目录执行

```bash
pnpm add @bello-osr/utils --filter @bello-osr/api
```

`--filter` 后为单独需要安装到那个 package

## 支持 `typescript`

根目录安装

```bash
pnpm add typescript -D -w
```

然后构建其配置文件

```bash
npx tsc --init
```

通过这个方式生成的配置文件会把所有可以配置的项和其含义都会列出来的。然后在上面把部分必要的项目修改一下 [](../tsconfig.json)

重点是

```json
{
  "compilerOptions": {
    "paths": {
      "@bello-osr/*": ["packages/*"]
    }
  }
}
```

这时候在 [packages/api/index.ts](../packages/api/index.ts) 就可以通过 `import { add } from "@bello-osr/utils"` 并有 IDE 的提示

## 代码规范限制

`typescript` 虽然是一部分的代码规范限制，但是还是不够的，这里需要配上 [prettier](https://prettier.io/) 和 各种 `lint`

```bash
pnpm add \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
eslint \
eslint-config-prettier \
eslint-plugin-prettier \
eslint-plugin-vue \
husky \
lint-staged \
prettier \
stylelint \
stylelint-config-prettier \
stylelint-config-recommended-vue \
stylelint-order \
postcss-html \
markdownlint-cli \
@commitlint/cli \
@commitlint/config-conventional \
-D -w
```

然后创建

- [.eslintrc.json](../.eslintrc.json)
- [.eslintignore](../.eslintignore)
- [.prettierrc.json](../.prettierrc.json)
- [.prettierignore](../.prettierignore)
- [.stylelintrc.json](../.stylelintrc.json)
- [.stylelintignore](../.stylelintignore)
- [.markdownlint.yml](../.markdownlint.yml)
- [.lintstagedrc.json](../.lintstagedrc.json)
- [.commitlintrc.json](../.commitlintrc.json)

[package.json](../package.json) 添加

```json
{
  "scripts": {
    ...
    "-------lint---------": "----------------------------",
    "lint:all:eslint": "eslint --fix --ext .ts,.vue,.js ./src",
    "lint:all:markdownlint": "pnpm lint:markdownlint \"docs/*.md\" \"*.md\"",
    "lint:all:prettier": "pnpm lint:prettier \"**/*.{js,json,css,scss,vue,html,md}\"",
    "lint:all:stylelint": "pnpm lint:stylelint \"src/**/*.{vue,scss}\"",
    "lint:eslint": "eslint --fix",
    "lint:markdownlint": "markdownlint",
    "lint:prettier": "prettier --write --loglevel warn",
    "lint:stylelint": "stylelint --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

为了配置尽量的一致和 IDE 协助提效可以配置

- [.vscode/extensions.json](../.vscode/extensions.json)
- [.vscode/settings.json](../.vscode/settings.json)

## 创建第一个 app 项目

这里选 `vite` + `vue2` 的方案来做示例, 具体流程可以[参考](https://xie.infoq.cn/article/3f941f3a2f47635d560e2659c)

以下为实际的操作流程

```bash
cd apps
npm init vite@latest
```

根据提示，输入项目名，选择 `vanilla`，`vanilla-ts`

修改 [package.json](../package.json) 提供一个方便调试开发的命令

```json
{
  "scripts": {
    ...
    "-------apps---------": "----------------------------",
    "dev": "pnpm run dev --filter @bello-osr/vite-vue2-starter"
  }
}
```

安装 `vue2` 的相关依赖

```bash
pnpm add vite-plugin-vue2 -D --filter @bello-osr/vite-vue2-starter
pnpm add vue vue-template-compiler --filter @bello-osr/vite-vue2-starter
```

因为我们是需要使用 `vue2` 所以需要去 [apps/vite-vue2-starter/package.json](../apps/vite-vue2-starter/package.json) 修改版本到 `2.x` 的版本，然后再重新安装一次依赖 `pnpm i`

创建 [apps/vite-vue2-starter/src/App.vue](../apps/vite-vue2-starter/src/App.vue)

```vue
<!-- apps/vite-vue2-starter/src/App.vue -->
<template>
  <div>Hello Vite Vue2</div>
</template>
```

修改 [apps/vite-vue2-starter/src/main.ts](../apps/vite-vue2-starter/src/main.ts)

```ts
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

添加 `.vue` 文件的 `ts` 支持到 [vite-env.d.ts](../apps/vite-vue2-starter/src//vite-env.d.ts)

```ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

添加 [apps/vite-vue2-starter/vite.config.ts](../apps/vite-vue2-starter/vite.config.ts)

```ts
import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [createVuePlugin()],
})
```

这时候可以试一下 `pnpm dev` 看看项目是否可以跑成功

接着试试应用 `packages` 内的包 `@bello-osr/utils`

```bash
pnpm add @bello-osr/utils --filter @bello-osr/vite-vue2-starter
```

[apps/vite-vue2-starter/tsconfig.json](../apps/vite-vue2-starter/tsconfig.json) 添加 `"extends": "../../tsconfig.json",`

再在 [apps/vite-vue2-starter/src/App.vue](../apps/vite-vue2-starter/src/App.vue) 替换成

```vue
<!-- apps/vite-vue2-starter/src/App.vue -->
<template>
  <div>Hello Vite Vue2, test @bello-osr/utils add func 1 + 1 = {{ a }}</div>
</template>

<script>
import { add } from '@bello-osr/utils'

export default {
  data() {
    return {
      a: add(1, 1),
    }
  },
}
</script>
```

## 构建

把 `vite` 改为根目录安装

```bash
pnpm add vite -D -w
```

先提供一个便捷的 `build` 命令和 `dev` 一样修改 [package.json](../package.json)

```json
{
  "scripts": {
    ...
    "ts-clean": "tsc --build --clean",
    // "build": "pnpm run build --filter @bello-osr/vite-vue2-starter",
    "build": "tsc && vite build ./apps/vite-vue2-starter && pnpm run ts-clean",
    "docker-build": "docker build -t vite-vue2-starter -f ./apps/vite-vue2-starter/Dockerfile .",
    "docker-run": "docker run --name test -p 8080:80 -d vite-vue2-starter",
    "docker": "pnpm run docker-build && pnpm run docker-run"
  }
}
```

`pnpm run build --filter @bello-osr/vite-vue2-starter` 在 `docker` 内跑会有死循环的情况，还没有找到破解的方法，所以暂时只能换成 `tsc && vite build ./apps/vite-vue2-starter && pnpm run ts-clean` 的形式

新建 [apps/vite-vue2-starter/Dockerfile](../apps/vite-vue2-starter/Dockerfile)

```dockerfile
FROM node:14.19.3-alpine AS build

WORKDIR /src

RUN npm install -g pnpm

COPY . /src
RUN pnpm install
RUN pnpm build

FROM nginx:1.16.1

COPY --from=build /src/apps/vite-vue2-starter/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/apps/vite-vue2-starter/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/apps/vite-vue2-starter/dist /src/dist
EXPOSE 80

ENV TZ Asia/Shanghai
```

还有 `nginx` 的相关配置 [apps/vite-vue2-starter/nginx/default.conf](../apps/vite-vue2-starter/nginx/default.conf), [apps/vite-vue2-starter/nginx/nginx.conf](../apps/vite-vue2-starter/nginx/nginx.conf)

最后在根目录运行 `pnpm run docker`，然后就可以在浏览器上访问 [http://localhost:8080/](http://localhost:8080/)

## 添加测试

这里使用 `vitest` 和 `vite` 更配，根目录安装

```bash
pnpm add vitest -D -w
```

[package.json](../package.json) 添加

```json
{
  "scripts": {
    ...
    "-------test---------": "----------------------------",
    "test": "vitest",
    "test:git": "vitest run --passWithNoTests",
    "coverage": "vitest run --coverage",
  }
}
```

然后新建 [packages/api/**tests**/index.test.ts](../packages/api/__tests__/index.test.ts)

```ts
import { test, assert } from 'vitest'
import { _add } from '../index'

test('_add', () => {
  assert.equal(_add(1, 1), 2)
})
```

最后运行 `pnpm run test`

为了方便写代码，可以提供代码块提示 [.vscode/\_sfc-blocks.code-snippets](../.vscode/_sfc-blocks.code-snippets)

## 外部组件

创建个新的 package 文件夹 `comp` ，[packages/comp/package.json](../packages/comp/package.json)

```json
{
  "name": "@bello-osr/comp",
  "version": "1.0.0",
  "description": "共用组件",
  "main": "index.ts",
  "license": "ISC",
  "dependencies": {
    "vue-demi": "^0.13.5"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.1.0",
    "vue": "^2.6.0 || ^3.2.0"
  },
  "peerDependenciesMeta": {
    "vue": {
      "optional": true
    },
    "@vue/composition-api": {
      "optional": true
    }
  }
}
```

这里用 [vue-demi](https://github.com/vueuse/vue-demi) 可以支持开发兼容 `vue2` 和 `vue3` 组件的中间库，`@vue/composition-api` 和 `vue` 都作为 `peerDependencies` 引入

再提供一个常用的兼容 `vue2` 和 `vue3` 的差异方法工具 [packages/comp/utils/h-demi.ts](../packages/comp/utils/h-demi.ts)

写第一个测试的组件 [packages/comp/TestComp/index.vue](../packages/comp/TestComp/index.vue)

```vue
<script lang="ts">
import { defineComponent } from 'vue-demi'

import { getSlot, getH } from '../utils/h-demi'

export default defineComponent({
  name: 'TestComp',
  props: {
    value: {
      type: String,
    },
  },

  render(createElement: any) {
    const h = getH(createElement)
    const slot = getSlot(this)
    const { value } = this

    return h('div', [h('div', value || slot || [])])
  },
})
</script>
```

## 相关资源

- [pnpm](https://pnpm.io/zh)
- [typescript](https://www.tslang.cn/samples/index.html)
- [prettier](https://prettier.io/)
- [eslint](https://cn.eslint.org/)
- [stylelint](https://stylelint.bootcss.com/)
- [markdownlint](https://github.com/DavidAnson/markdownlint)
- [husky](https://typicode.github.io/husky/#/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [vite](https://cn.vitejs.dev/)
- [vue2](https://cn.vuejs.org/index.html)
- [docker](https://github.com/ThomasLiu/docker-learn)
- [nginx](https://nginx.org/en/docs/)
- [vitest](https://cn.vitest.dev/)
