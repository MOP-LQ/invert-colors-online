// i18n配置文件
export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

// 支持的语言列表
export const supportedLanguages = Object.keys(languages) as Language[];

// 语言配置
export const i18nConfig = {
  defaultLanguage,
  supportedLanguages,
  fallbackLanguage: 'en',
  // URL路径前缀
  pathPrefix: true,
  // 是否在默认语言URL中显示语言前缀
  showDefaultLanguage: true,
};

// 获取当前语言
export function getCurrentLanguage(pathname: string): Language {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Language;
  
  if (supportedLanguages.includes(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLanguage;
}

// 生成本地化URL
export function getLocalizedUrl(pathname: string, language: Language): string {
  const currentLang = getCurrentLanguage(pathname);
  
  // 移除当前语言前缀
  let cleanPath = pathname;
  if (pathname.startsWith(`/${currentLang}/`)) {
    cleanPath = pathname.replace(`/${currentLang}`, '');
  } else if (pathname === `/${currentLang}`) {
    cleanPath = '/';
  }
  
  // 添加新语言前缀
  if (language === defaultLanguage && !i18nConfig.showDefaultLanguage) {
    return cleanPath || '/';
  }
  
  return `/${language}${cleanPath}`;
}

// 获取语言显示名称
export function getLanguageDisplayName(language: Language): string {
  return languages[language];
}
