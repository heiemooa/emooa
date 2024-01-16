
# Emooa UI

企业级 UI 设计语言和 React UI 库。

## ✨ 特点

- 🛡 用 TypeScript 编写，具有可预测的静态类型。
- ⚙️ 整套设计资源和开发工具。

## 🖥 环境支持

- 现代浏览器
- [版本](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| 51+ | 15+ | 55+ | 12.1+ | last 2 versions |

## 安装

```shell
npm install @emooa/ui
// or
yarn add @emooa/ui
```


## 用法

简单的例子

```ts
import { Image, GeoJSON } from "@emooa/ui";

export default () => (
  <>
    <Image url="https://api.emooa.com/aimg" />
    <GeoJSON
      data={{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [102.0, 0.0],
            [103.0, 1.0],
            [104.0, 0.0],
            [105.0, 1.0],
          ],
          properties: {
            strokeStyle: 'green',
          },
        },
        properties: {
          name: '线',
        },
      }}
    />
  </>
);
```

## 组件

- [Image](/docs/ui/image.md)

- [GeoJSON](/docs/ui/geojson.md)

## Licensed

MIT Licensed  
Copyright (c) 2023 Emooa

## 常见问题

- 无法解析源映射。

  - WARNING in _*./node_modules/@emooa/ui/lib/image/index.js*_

    Module Warning (from _*./node_modules/source-map-loader/dist/cjs.js*_):

    Failed to parse source map from '_/xxx/node_modules/@emooa/ui/src/image/index.tsx_' file: Error: ENOENT: no such file or directory, open '_/xxx/node_modules/@emooa/ui/src/image/index.tsx_'

  - Actually, CRA with Webpack 5.x cause it. They are working on resolving. [https://github.com/facebook/create-react-app/pull/11752](https://github.com/facebook/create-react-app/pull/11752)

  - 您可以通过将 GENERATE_SOURCEMAP=false 添加到 .env 文件来删除警告。[阅读更多](https://stackoverflow.com/questions/70599784/failed-to-parse-source-map)

    ```json
    "scripts": {
      "start": "GENERATE_SOURCEMAP=false && react-scripts start",
    }
    ```
