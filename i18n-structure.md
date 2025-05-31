# 国际化文件结构

```
src/
├── i18n/
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json          # 通用翻译
│   │   │   ├── navigation.json      # 导航菜单
│   │   │   ├── tools.json          # 工具相关
│   │   │   ├── feedback.json       # 反馈表单
│   │   │   ├── blog.json           # 博客相关
│   │   │   └── errors.json         # 错误信息
│   │   └── de/
│   │       ├── common.json
│   │       ├── navigation.json
│   │       ├── tools.json
│   │       ├── feedback.json
│   │       ├── blog.json
│   │       └── errors.json
│   ├── config.ts                   # i18n配置
│   └── utils.ts                    # 工具函数
├── components/
│   ├── LanguageSwitcher.astro      # 语言切换器
│   └── ...
├── layouts/
│   ├── Layout.astro                # 更新主布局
│   └── ...
└── pages/
    ├── en/                         # 英语页面
    │   ├── index.astro
    │   ├── tools/
    │   └── ...
    ├── de/                         # 德语页面
    │   ├── index.astro
    │   ├── tools/
    │   └── ...
    └── index.astro                 # 重定向到默认语言
```

## URL结构方案

推荐使用路径前缀方案：
- 英语: `/en/` (默认)
- 德语: `/de/`
- 根路径 `/` 重定向到用户首选语言或默认英语
