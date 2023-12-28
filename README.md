# Presenter

> 不会吧不会吧，不会还有人在用 office 写课程报告吧？

新版 Presenter 重新实现了导出 PDF 的功能，比官方的导出方案拥有更好的 CSS 支持

* 这个模板支持一键打包

- [x] 源 Markdown 文件

- [x] 所有页面的笔记整合为单一 PDF 文件

- [x] 原始 PDF / PPTX

- [x] 按点击分页的 PDF / PPTX

- [ ] 具有更好 CSS 支持的 PDF / PPTX（由 [puppeteer](https://github.com/puppeteer/puppeteer) 驱动）

- [x] 带演讲者模式的网页应用

* 附加功能

- [x] [由 Service Worker 驱动的在线预览工具](https://pre.mufanc.xyz/)

- [ ] 静态编译的轻量级 HTTP 后端（Windows & Linux）

### Usage

```sh
git clone https://github.com/Mufanc/Presenter && cd Presenter
pnpm i

pnpm make
```

细分的构建任务参见 [package.json](./package.json)
