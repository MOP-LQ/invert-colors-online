# 🌍 AstroPaper 国际化 (i18n) 实施指南

## 📋 概述

本指南详细说明了如何为AstroPaper网站实现英语和德语的国际化支持。

## 🎯 已实现的功能

### ✅ 核心功能
- [x] 双语支持 (英语/德语)
- [x] 语言切换器组件
- [x] URL路径前缀 (`/en/`, `/de/`)
- [x] 自动语言检测和重定向
- [x] 语言偏好持久化
- [x] SEO优化 (hreflang标签)
- [x] 反馈表单完全翻译

### ✅ 翻译文件结构
```
src/i18n/locales/
├── en/
│   ├── common.json      # 通用翻译
│   ├── navigation.json  # 导航菜单
│   ├── tools.json      # 工具相关
│   └── feedback.json   # 反馈表单
└── de/
    ├── common.json
    ├── navigation.json
    ├── tools.json
    └── feedback.json
```

### ✅ 组件更新
- [x] `Layout.astro` - 支持多语言meta标签和hreflang
- [x] `Header.astro` - 集成语言切换器
- [x] `FeedbackForm.astro` - 完全翻译
- [x] `LanguageSwitcher.astro` - 新建语言切换组件

## 🚀 部署步骤

### 1. 文件结构检查
确保以下文件已创建：
```
src/
├── i18n/
│   ├── config.ts
│   ├── utils.ts
│   └── locales/
├── components/
│   └── LanguageSwitcher.astro
├── pages/
│   ├── en/
│   │   └── index.astro
│   ├── de/
│   │   └── index.astro
│   └── index-redirect.astro
```

### 2. 替换根页面
```bash
# 备份当前首页
mv src/pages/index.astro src/pages/index-backup.astro

# 使用重定向页面作为新首页
mv src/pages/index-redirect.astro src/pages/index.astro
```

### 3. 创建多语言页面
为每个现有页面创建语言版本：
```
src/pages/en/
├── index.astro
├── about.astro
├── posts/
├── tools/
└── search.astro

src/pages/de/
├── index.astro
├── about.astro
├── posts/
├── tools/
└── search.astro
```

## 🔧 使用方法

### 在组件中使用翻译

```astro
---
import { getCurrentLanguage } from "@/i18n/config";
import { t, preloadTranslations } from "@/i18n/utils";

const currentLanguage = getCurrentLanguage(Astro.url.pathname);
await preloadTranslations(currentLanguage, ['common', 'navigation']);

const title = await t('site.title', currentLanguage, 'common');
const homeText = await t('menu.home', currentLanguage, 'navigation');
---

<h1>{title}</h1>
<nav>
  <a href={`/${currentLanguage}/`}>{homeText}</a>
</nav>
```

### 在JavaScript中使用翻译

```javascript
<script define:vars={{ currentLanguage }}>
  const translations = {
    en: { message: "Hello" },
    de: { message: "Hallo" }
  };
  
  const t = translations[currentLanguage] || translations.en;
  console.log(t.message);
</script>
```

## 📝 添加新翻译

### 1. 更新翻译文件
在 `src/i18n/locales/en/` 和 `src/i18n/locales/de/` 中添加新的键值对。

### 2. 使用新翻译
```astro
---
const newText = await t('new.key', currentLanguage, 'namespace');
---
<p>{newText}</p>
```

## 🔗 URL结构

- **英语**: `/en/` (默认)
- **德语**: `/de/`
- **根路径**: `/` (自动重定向到用户首选语言)

## 🎨 语言切换器

语言切换器会自动：
- 显示当前语言
- 提供下拉菜单切换
- 保存用户偏好到localStorage
- 生成正确的本地化URL

## 📊 SEO优化

每个页面自动包含：
- 正确的 `lang` 属性
- hreflang标签指向所有语言版本
- 本地化的meta标题和描述

## 🔄 语言检测逻辑

1. **localStorage** - 用户之前的选择
2. **Accept-Language头** - 浏览器语言偏好
3. **默认语言** - 英语作为后备

## 🛠️ 维护建议

### 翻译文件管理
- 保持所有语言的键结构一致
- 使用有意义的键名 (如 `form.submit_button`)
- 定期检查缺失的翻译

### 新页面创建
为每个新页面创建所有语言版本：
```bash
# 创建新页面
touch src/pages/en/new-page.astro
touch src/pages/de/new-page.astro
```

### 组件国际化
- 在组件中预加载所需的翻译命名空间
- 使用 `define:vars` 传递翻译到客户端脚本
- 为动态内容提供回退文本

## 🚨 注意事项

1. **服务器端限制**: 无法在服务器端访问localStorage
2. **JavaScript依赖**: 某些功能需要JavaScript支持
3. **缓存**: 翻译会被缓存以提高性能
4. **类型安全**: 使用TypeScript确保翻译键的正确性

## 🔮 未来扩展

### 添加新语言
1. 在 `src/i18n/config.ts` 中添加语言
2. 创建翻译文件目录
3. 添加语言标志到 `LanguageSwitcher.astro`
4. 创建对应的页面目录

### 高级功能
- 日期/时间本地化
- 数字格式化
- 复数形式处理
- RTL语言支持

## 📞 支持

如果遇到问题：
1. 检查浏览器控制台的错误信息
2. 验证翻译文件的JSON格式
3. 确认所有必需的翻译键都存在
4. 测试语言切换功能
