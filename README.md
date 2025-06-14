# Invert Colors Online

A free, privacy-focused online image color inverter tool built with Astro. Transform images instantly with negative effects, improve accessibility, and process images locally for complete privacy.

## 🌟 Features

- **🔄 Image Color Inversion**: Instantly invert image colors with negative effects
- **🖼️ Multiple Image Formats**: Support for JPG, PNG, GIF, and WebP
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔒 Privacy First**: All image processing happens locally in your browser
- **📋 Clipboard Support**: Paste images directly with Ctrl+V/Cmd+V
- **⬇️ Easy Download**: One-click download of processed images
- **🌐 Multilingual**: English and German language support
- **📝 SEO Optimized**: Built-in blog with image processing tutorials
- **🔍 Search Functionality**: Powered by Pagefind for fast content search
- **💬 User Feedback**: Integrated feedback system with Supabase

## 🚀 Live Demo

Visit the live site: https://flipix.online/

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **Language**: TypeScript
- **Search**: [Pagefind](https://pagefind.app/)
- **Internationalization**: astro-i18next
- **Database**: [Supabase](https://supabase.com/) (for feedback system)
- **Deployment**: Cloudflare Pages

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── ImageInverter.astro    # Main image processing tool
│   │   ├── FeedbackForm.astro     # User feedback component
│   │   └── LanguageSwitcher.astro # i18n language toggle
│   ├── pages/
│   │   ├── api/            # API endpoints
│   │   ├── tools/          # Tool pages
│   │   ├── posts/          # Blog posts
│   │   ├── de/             # German language pages
│   │   └── en/             # English language pages
│   ├── content/            # Markdown content
│   ├── i18n/              # Translation files
│   ├── styles/            # Global CSS styles
│   └── utils/             # Utility functions
├── public/                # Static assets
└── docs/                  # Documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the [AstroPaper](https://github.com/satnaing/astro-paper) template
- Image processing powered by HTML5 Canvas API
- Search functionality by [Pagefind](https://pagefind.app/)
- Icons and styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/MOP-LQ/invert-colors-online/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/MOP-LQ/invert-colors-online/discussions)
- 🐦 **Follow Updates**: [@Mark119M](https://x.com/Mark119M)

---

## 📝 Changelog

### 2025-01-31
- ✅ 集成Google AdSense广告系统
  - 在Layout.astro的<head>部分添加AdSense脚本
  - 脚本位置：Google Analytics代码之后
  - 代码位置：src/layouts/Layout.astro第156-162行
- ✅ 创建ads.txt文件用于Google AdSense验证
  - 文件位置：public/ads.txt
  - 包含Google AdSense发布商验证信息
- ✅ 添加新的德语博客文章：Online-Farbinversion
  - 文件：src/data/blog/online-farbinversion-einfachheit-und-effizienz-fuer-ihre-designs.md
  - 主题：在线颜色反转工具的简单性和效率
  - 标签：farbinversion, webdesign, accessibility, online-tools, grafikdesign, bildbearbeitung
  - 包含完整的前置内容、目录结构和SEO优化描述

### 2025-01-27
- Integrated Google AdSense advertising system
- Added AdSense script to Layout.astro for monetization support
- Positioned AdSense code in head section alongside Google Analytics
- Created ads.txt file in public directory for Google AdSense verification

### 2025-06-09
- Fixed Cloudflare Pages deployment issue by explicitly setting packageManager to npm in package.json
- Ensured consistent npm usage across all deployment platforms
- Fixed JSON syntax error in German translation file (src/i18n/locales/de/tools.json)

### 2023-11-15
- Standardized package management to use npm only
- Removed pnpm-lock.yaml to avoid dependency conflicts

---

Made with ❤️ for the web development community
