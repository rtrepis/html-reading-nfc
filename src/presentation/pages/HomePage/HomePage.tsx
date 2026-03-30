import { useNFCReader } from '../../hooks/useNFCReader';
import { NFCScanner } from '../../components/NFCScanner/NFCScanner';
import { DocumentCard } from '../../components/DocumentCard/DocumentCard';
import { LanguageSelector } from '../../components/LanguageSelector/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import styles from './HomePage.module.css';

export function HomePage() {
  const { t } = useLanguage();
  const { status, document, errorType, isMockMode, startScan, cancelScan, reset } =
    useNFCReader();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{t('appTitle')}</h1>
            <p className={styles.subtitle}>{t('appSubtitle')}</p>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className={styles.main}>
        <NFCScanner
          status={status}
          errorType={errorType}
          isMockMode={isMockMode}
          onStart={startScan}
          onStop={cancelScan}
          onReset={reset}
        />

        {status === 'success' && document && (
          <section className={styles.result}>
            <h2 className={styles.resultTitle}>{t('documentInfo')}</h2>
            <DocumentCard document={document} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Web NFC API · ICAO 9303 · DNI 3.0</p>
      </footer>
    </div>
  );
}
