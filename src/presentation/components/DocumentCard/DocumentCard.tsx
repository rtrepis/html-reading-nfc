import type { TinDocument } from '../../../domain/entities/TinDocument';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './DocumentCard.module.css';

interface DocumentCardProps {
  document: TinDocument;
  serialNumber?: string;
}

function formatDate(date: Date | null, locale: string): string {
  if (!date) return '—';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function isDocumentValid(expiryDate: Date | null): boolean {
  if (!expiryDate) return false;
  return expiryDate > new Date();
}

export function DocumentCard({ document, serialNumber }: DocumentCardProps) {
  const { t, language } = useLanguage();

  const locale = language === 'en' ? 'en-GB' : language === 'ca' ? 'ca-ES' : 'es-ES';
  const valid = isDocumentValid(document.expiryDate);

  const genderLabel =
    document.gender === 'M' ? t('male') :
    document.gender === 'F' ? t('female') :
    t('unknown');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.docType}>
          <span className={styles.docTypeIcon}>🪪</span>
          <span className={styles.docTypeName}>{document.documentType}</span>
        </div>
        <StatusBadge
          isValid={valid}
          validLabel={t('valid')}
          expiredLabel={t('expired')}
        />
      </div>

      <div className={styles.name}>
        <h2 className={styles.fullName}>
          {[document.firstName, document.lastName1, document.lastName2]
            .filter(Boolean)
            .join(' ')}
        </h2>
        <span className={styles.docNumber}>{document.documentNumber}</span>
      </div>

      <div className={styles.grid}>
        <Field label={t('documentNumber')} value={document.documentNumber} />
        <Field label={t('documentType')} value={document.documentType} />
        <Field label={t('firstName')} value={document.firstName || '—'} />
        <Field label={t('lastName1')} value={document.lastName1 || '—'} />
        <Field label={t('lastName2')} value={document.lastName2 || '—'} />
        <Field label={t('gender')} value={genderLabel} />
        <Field label={t('nationality')} value={document.nationality || '—'} />
        <Field label={t('dateOfBirth')} value={formatDate(document.dateOfBirth, locale)} />
        <Field
          label={t('expiryDate')}
          value={formatDate(document.expiryDate, locale)}
          highlight={!valid}
        />
        {serialNumber && (
          <Field label={t('serialNumber')} value={serialNumber} mono />
        )}
      </div>

      {Object.keys(document.rawData).length > 0 && (
        <details className={styles.rawData}>
          <summary>{t('rawData')}</summary>
          <pre className={styles.rawDataContent}>
            {JSON.stringify(document.rawData, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}

function Field({ label, value, highlight, mono }: FieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={`${styles.fieldValue} ${highlight ? styles.highlight : ''} ${mono ? styles.mono : ''}`}>
        {value}
      </span>
    </div>
  );
}
