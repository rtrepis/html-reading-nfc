import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  isValid: boolean;
  validLabel: string;
  expiredLabel: string;
}

export function StatusBadge({ isValid, validLabel, expiredLabel }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${isValid ? styles.valid : styles.expired}`}>
      {isValid ? `✓ ${validLabel}` : `✗ ${expiredLabel}`}
    </span>
  );
}
