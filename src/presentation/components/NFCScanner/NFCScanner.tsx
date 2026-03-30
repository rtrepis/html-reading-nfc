import { useLanguage } from '../../context/LanguageContext';
import type { ScanStatus, NFCErrorType } from '../../hooks/useNFCReader';
import styles from './NFCScanner.module.css';

interface NFCScannerProps {
  status: ScanStatus;
  errorType: NFCErrorType | null;
  isMockMode: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const ERROR_KEY_MAP: Record<NFCErrorType, string> = {
  not_supported: 'notSupported',
  permission_denied: 'permissionDenied',
  read_error: 'readError',
  parse_error: 'parseError',
  unknown: 'readError',
};

export function NFCScanner({
  status,
  errorType,
  isMockMode,
  onStart,
  onStop,
  onReset,
}: NFCScannerProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {isMockMode && status === 'idle' && (
        <div className={styles.mockBanner}>
          <span>⚠️</span>
          <span>{t('mockNotice')}</span>
        </div>
      )}

      {status === 'idle' && (
        <button className={styles.scanButton} onClick={onStart}>
          <span className={styles.scanIcon}>📡</span>
          <span>{t('startScan')}</span>
        </button>
      )}

      {status === 'scanning' && (
        <div className={styles.scanningState}>
          <div className={styles.pulseRing}>
            <div className={styles.pulseCore}>📡</div>
          </div>
          <p className={styles.scanningText}>{t('scanning')}</p>
          <button className={styles.cancelButton} onClick={onStop}>
            {t('stopScan')}
          </button>
        </div>
      )}

      {status === 'error' && errorType && (
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>⚠️</span>
          <h3 className={styles.errorTitle}>{t('errorTitle')}</h3>
          <p className={styles.errorMessage}>{t(ERROR_KEY_MAP[errorType])}</p>
          <button className={styles.retryButton} onClick={onReset}>
            {t('startScan')}
          </button>
        </div>
      )}

      {status === 'success' && (
        <button className={styles.scanAgainButton} onClick={onReset}>
          <span>🔄</span>
          <span>{t('scanAgain')}</span>
        </button>
      )}
    </div>
  );
}
