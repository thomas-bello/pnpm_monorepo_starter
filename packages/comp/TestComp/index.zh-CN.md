---
map:
  # 映射到docs的路径
  path: /components/BgVideo
---

# BgVideo(背景视频播放)

可以在背景视频播放

## 代码演示

### 基本用法

<demo src="./demo/BaseDemo.vue"
  language="vue"
  title="基本用法"
  desc="点击切换。">
</demo>

## Props

| 参数    |       说明 |          类型 | 可选值 | 默认值 | 是否必填 |
| ------- | ---------: | ------------: | -----: | -----: | -------: |
| sources |   视频地址 | Array[string] |      - |      - |       是 |
| poster  | 背景图地址 |        string |      - |      - |       是 |
