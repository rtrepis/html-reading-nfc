import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../context/LanguageContext';
import styles from './LanguageSelector.module.css';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ca', label: 'CAT', flag: '🏴' },
  { code: 'es', label: 'ESP', flag: '🇪🇸' },
  { code: 'en', label: 'ENG', flag: '🇬🇧' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.container}>
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          className={`${styles.button} ${language === code ? styles.active : ''}`}
          onClick={() => setLanguage(code)}
          aria-label={`Switch to ${label}`}
          aria-pressed={language === code}
        >
          <span className={styles.flag}>{flag}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
}
