import type { Language } from './config';
import { defaultLanguage, supportedLanguages } from './config';

// 翻译数据类型
type TranslationData = Record<string, any>;

// 缓存翻译数据
const translationCache = new Map<string, TranslationData>();

// 加载翻译文件
async function loadTranslation(language: Language, namespace: string): Promise<TranslationData> {
  const cacheKey = `${language}-${namespace}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const translation = await import(`./locales/${language}/${namespace}.json`);
    const data = translation.default || translation;
    translationCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.warn(`Failed to load translation: ${language}/${namespace}`, error);
    
    // 回退到默认语言
    if (language !== defaultLanguage) {
      return loadTranslation(defaultLanguage, namespace);
    }
    
    return {};
  }
}

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// 替换占位符
function replacePlaceholders(text: string, params: Record<string, any> = {}): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
}

// 主要翻译函数
export async function t(
  key: string, 
  language: Language = defaultLanguage, 
  namespace: string = 'common',
  params: Record<string, any> = {}
): Promise<string> {
  try {
    const translations = await loadTranslation(language, namespace);
    let value = getNestedValue(translations, key);
    
    // 如果找不到翻译且不是默认语言，尝试默认语言
    if (value === undefined && language !== defaultLanguage) {
      const fallbackTranslations = await loadTranslation(defaultLanguage, namespace);
      value = getNestedValue(fallbackTranslations, key);
    }
    
    // 如果仍然找不到，返回key本身
    if (value === undefined) {
      console.warn(`Translation missing: ${namespace}.${key} for language ${language}`);
      return key;
    }
    
    // 如果是字符串，替换占位符
    if (typeof value === 'string') {
      return replacePlaceholders(value, params);
    }
    
    return String(value);
  } catch (error) {
    console.error(`Translation error for ${namespace}.${key}:`, error);
    return key;
  }
}

// 同步翻译函数（用于已缓存的翻译）
export function tSync(
  key: string, 
  language: Language = defaultLanguage, 
  namespace: string = 'common',
  params: Record<string, any> = {}
): string {
  const cacheKey = `${language}-${namespace}`;
  const translations = translationCache.get(cacheKey);
  
  if (!translations) {
    return key;
  }
  
  let value = getNestedValue(translations, key);
  
  if (value === undefined) {
    return key;
  }
  
  if (typeof value === 'string') {
    return replacePlaceholders(value, params);
  }
  
  return String(value);
}

// 预加载翻译
export async function preloadTranslations(language: Language, namespaces: string[] = ['common', 'navigation', 'tools', 'feedback']): Promise<void> {
  const promises = namespaces.map(namespace => loadTranslation(language, namespace));
  await Promise.all(promises);
}

// 获取所有支持的语言
export function getSupportedLanguages(): Language[] {
  return supportedLanguages;
}

// 检查语言是否支持
export function isLanguageSupported(language: string): language is Language {
  return supportedLanguages.includes(language as Language);
}

// 从浏览器获取首选语言
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }
  
  const browserLang = navigator.language.split('-')[0] as Language;
  return isLanguageSupported(browserLang) ? browserLang : defaultLanguage;
}

// 语言持久化
export function saveLanguagePreference(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
  }
}

export function getLanguagePreference(): Language {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }
  
  const saved = localStorage.getItem('preferred-language') as Language;
  return isLanguageSupported(saved) ? saved : getBrowserLanguage();
}
