# [Emooa UI](https://docs.emooa.com/ui)

An enterprise-class UI design language and React UI library.

## ✨ Features

- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.

## 🖥 Environment Support

- Modern browsers
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| 51+ | 15+ | 55+ | 12.1+ | last 2 versions |

## Installation

```shell
npm install @emooa/ui
// or
yarn add @emooa/ui
```

## Usage

Simple example

```ts
import { Button, GeoJSON, Image, Space } from "@emooa/ui";

export default () => (
  <>
    <Space>
      <Button type="primary">Primary Button<Button/>
      <Button>Secondary Button<Button/>
    <Space/>
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

## Components

At present, common components such as `Button`, `Icon`, `Image`, `GeoJSON`, and `Space` have been implemented, and are being gradually added. For details, see [Emooa UI Components] (https://docs.emooa.com/ui ).

## License

MIT Licensed  
Copyright (c) 2023 Emooa

## Q&A

- Failed to parse source map.

  - WARNING in _*./node_modules/@emooa/ui/lib/image/index.js*_

    Module Warning (from _*./node_modules/source-map-loader/dist/cjs.js*_):

    Failed to parse source map from '_/xxx/node_modules/@emooa/ui/src/image/index.tsx_' file: Error: ENOENT: no such file or directory, open '_/xxx/node_modules/@emooa/ui/src/image/index.tsx_'

  - Actually, CRA with Webpack 5.x cause it. They are working on resolving. [https://github.com/facebook/create-react-app/pull/11752](https://github.com/facebook/create-react-app/pull/11752)

  - You can remove the warning by adding GENERATE_SOURCEMAP=false to your .env file. [Read More](https://stackoverflow.com/questions/70599784/failed-to-parse-source-map)

    ```json
    "scripts": {
      "start": "GENERATE_SOURCEMAP=false && react-scripts start",
    }
    ```
