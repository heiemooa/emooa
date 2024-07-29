---
nav: 组件
group:
  title: 其他
  order: 3
toc: content
---

# Backtop 返回顶部

## 何时使用

提供一键返回顶部的按钮，支持自定义按钮组件。

## 代码演示

<code src="../../packages/ui/examples/backtop/basic.tsx" description="当滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。">基本用法</code>  
<code src="../../packages/ui/examples/backtop/custom.tsx" description="可以自定义返回顶部的按钮。">自定义按钮</code>

## API

### Backtop

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| duration | (ms) 滚动到顶部的时间。 | `number` | 1000 |
| visibleHeight | 当滚动到这个高度时，显示返回顶部按钮。 | `number` | 400 |
| easing | 滚动到顶部的缓动方式类型, 所有类型：[easing](https://www.npmjs.com/package/b-tween)。 | `string` | quartOut |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 `DOM` 元素的函数。 | `() => HTMLElement` | () => document.documentElement |
