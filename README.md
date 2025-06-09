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

### 2023-11-15
- Standardized package management to use npm only
- Removed pnpm-lock.yaml to avoid dependency conflicts

---

Made with ❤️ for the web development community
