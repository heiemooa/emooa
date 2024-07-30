---
nav: Components
group:
  title: Other
  order: 3
toc: content
---

# Backtop

## Usage

Provides a one-click return to the top button and supports custom button components.

## 代码演示

<code src="../../packages/ui/examples/backtop/basic.tsx" description="When scrolling to a certain height, a return to top button will appear in the lower right corner.">Basic</code>  
<code src="../../packages/ui/examples/backtop/custom.tsx" description="The back to top button can be customized.">Custom button</code>

## API

### Backtop

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Backtop | `string` | - |
| style | The style of Backtop | `CSSProperties` | - |
| duration | (ms) Time to scroll to top. | `number` | 1000 |
| visibleHeight | When scrolling to this height, show the back to top button. | `number` | 400 |
| easing | Type of easing when scrolling to the top, all types: [easing](https://www.npmjs.com/package/b-tween). | `string` | quartOut |
| target | Set the element whose scroll event needs to be monitored. The value is a function that returns the corresponding `DOM` element. | `() => HTMLElement` | () => document.documentElement |
