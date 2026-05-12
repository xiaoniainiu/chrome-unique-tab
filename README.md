# Unique Tab

Chrome 插件，防止重复打开相同地址的标签页。

## 功能

- 打开新标签页时，立即检测是否已有相同地址的标签页
- 地址相同：关闭新标签页，切换到已有标签页并聚焦窗口
- 地址不同：正常打开
- 忽略 URL 中的 `#` 锚点部分（`https://example.com#a` 和 `https://example.com#b` 视为相同）
- 跳过 `chrome://` 等浏览器内部页面

## 安装

1. 打开 Chrome，地址栏输入 `chrome://extensions`
2. 右上角开启 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择本项目 `chrome-unique-tag` 目录

## 使用

安装后无需额外操作，插件自动生效。打开新标签页时会自动检测并处理重复地址。

## 文件结构

```
chrome-unique-tag/
├── manifest.json    # 插件配置
├── background.js    # 核心逻辑
└── README.md
```

## 卸载

在 `chrome://extensions` 页面，点击本插件的 **移除** 按钮即可。
