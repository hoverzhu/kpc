---
title: 颜色
order: 1
sidebar: design
---

## 功能色

功能色用于表达特内容特殊状态，帮助用户快速识别。功能色为设计系统预留关键色。在确定品牌相关色系
时，或在同一区域应用时，应优先功能色的使用，保证功能色的突出及可识别性。

## 中性色

中性色为灰度色，主要用于文本及边框等。

## 品牌色

贯穿整体设计的主要颜色风格。品牌色主要体现在关键行动点及操作状态、重要信息高亮等场景。

```example
import Palette from '~/../src/components/palette';

export default Palette;
```

__主色：__

主色为产品中应用最频繁，且能代表品牌基调的颜色。

在确定主色的同时选择主色的深色和浅色变体用于创造界面元素的对比。如，按钮、模块标题、交互状态等。

__辅助色：__

用于强调界面中的特殊元素。辅助色应慎重使用，仅作为强调和突出。

辅助色也可以选择深色和浅色变体用于界面元素对比。如滑块与滑动条、按钮交互状态等。

__文本和图标色：__

当文本与图标应用于主色和辅助色之上时，应使文本和图标颜色明显区别于颜色背景，保证内容清晰可辨。

## 色板生成器

设计者的工作体验也应该受到重视，也应符合轻松高效的目的。为避免每一次重复调试定义新的色板，工程
师使用特殊算法通过调整色相的饱和度和亮度，制作了一款可以自动生成色板的工具，每次只需要设定色板
主色调，即可得到一组对应的色板以供设计者使用。


