'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, isLocale, localeMeta, locales, type Locale, translate } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'beyvip-locale';
const SKIP_SELECTOR = 'script, style, noscript, code, pre, [data-no-translate], [contenteditable="true"]';
const TRANSLATABLE_ATTRIBUTES = ['placeholder', 'title', 'aria-label'] as const;
const textOriginals = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<HTMLElement, Record<string, string>>();

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function applyDomTranslations(locale: Locale) {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = localeMeta[locale].htmlLang;
  document.documentElement.dir = localeMeta[locale].dir;

  if (locale === defaultLocale) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((node) => {
      const original = textOriginals.get(node);
      if (original) node.textContent = original;
    });

    document.querySelectorAll<HTMLElement>('input, textarea, button, a, select, [title], [aria-label]').forEach((element) => {
      const originals = attributeOriginals.get(element);
      if (originals) {
        Object.entries(originals).forEach(([attribute, value]) => element.setAttribute(attribute, value));
      }
    });
    return;
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      const source = normalizeText(textOriginals.get(node as Text) || node.textContent || '');
      if (!source || translate(source, locale) === source) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent) return;

    const original = textOriginals.get(node) || normalizeText(node.textContent || '');
    const translated = translate(original, locale);
    if (translated === original) return;

    if (!textOriginals.has(node)) textOriginals.set(node, original);

    node.textContent = translated;
  });

  document.querySelectorAll<HTMLElement>('input, textarea, button, a, select, [title], [aria-label]').forEach((element) => {
    if (element.closest(SKIP_SELECTOR)) return;

    const originalAttrs = attributeOriginals.get(element) || {};
    let changed = false;

    TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      const current = element.getAttribute(attribute);
      const original = originalAttrs[attribute] || current;
      if (!original) return;

      const translated = translate(original, locale);
      if (translated === original) return;

      originalAttrs[attribute] = original;
      element.setAttribute(attribute, translated);
      changed = true;
    });

    if (changed) {
      attributeOriginals.set(element, originalAttrs);
    }
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const isAdmin = pathname?.startsWith('/admin') || false;

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.lang = defaultLocale;
      document.documentElement.dir = 'ltr';
      return;
    }

    applyDomTranslations(locale);

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => applyDomTranslations(locale));
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [locale, pathname, isAdmin]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (text: string) => translate(text, locale),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: defaultLocale,
      setLocale: () => undefined,
      t: (text: string) => text,
    } satisfies LanguageContextValue;
  }
  return context;
}

export function LanguageSelect({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Dil seçimi</span>
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value;
          if (isLocale(nextLocale)) setLocale(nextLocale);
        }}
        className={`rounded-full border border-[rgba(195,149,58,0.24)] bg-white/78 text-[var(--dream-dark)] outline-none transition focus:border-[var(--lale-gold)] ${
          compact ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm font-medium'
        }`}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeMeta[item].nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
