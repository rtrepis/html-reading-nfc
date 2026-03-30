import { useState, useCallback, useRef } from 'react';
import type { TinDocument } from '../../domain/entities/TinDocument';
import { ReadTinDocumentUseCase } from '../../application/useCases/ReadTinDocumentUseCase';
import { NFCReaderFactory } from '../../application/services/NFCReaderFactory';
import { SpanishDniParser } from '../../infrastructure/parsers/SpanishDniParser';
import {
  NFCNotSupportedError,
  NFCPermissionDeniedError,
  NFCReadError,
  DocumentParseError,
} from '../../domain/errors/NFCErrors';

export type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export type NFCErrorType =
  | 'not_supported'
  | 'permission_denied'
  | 'read_error'
  | 'parse_error'
  | 'unknown';

export interface UseNFCReaderResult {
  status: ScanStatus;
  document: TinDocument | null;
  errorType: NFCErrorType | null;
  isMockMode: boolean;
  startScan: () => void;
  cancelScan: () => void;
  reset: () => void;
}

function mapError(error: unknown): NFCErrorType {
  if (error instanceof NFCNotSupportedError) return 'not_supported';
  if (error instanceof NFCPermissionDeniedError) return 'permission_denied';
  if (error instanceof NFCReadError) return 'read_error';
  if (error instanceof DocumentParseError) return 'parse_error';
  return 'unknown';
}

export function useNFCReader(): UseNFCReaderResult {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [document, setDocument] = useState<TinDocument | null>(null);
  const [errorType, setErrorType] = useState<NFCErrorType | null>(null);
  const useCaseRef = useRef<ReadTinDocumentUseCase | null>(null);

  const nfcReader = NFCReaderFactory.create();
  const isMockMode = !('NDEFReader' in window);

  const startScan = useCallback(() => {
    setStatus('scanning');
    setDocument(null);
    setErrorType(null);

    const useCase = new ReadTinDocumentUseCase(nfcReader, [
      new SpanishDniParser(),
    ]);
    useCaseRef.current = useCase;

    useCase
      .execute()
      .then((doc) => {
        setDocument(doc);
        setStatus('success');
      })
      .catch((error) => {
        // Ignore abort errors (user cancelled)
        if ((error as Error).name === 'AbortError') return;
        setErrorType(mapError(error));
        setStatus('error');
      });
  }, [nfcReader]);

  const cancelScan = useCallback(() => {
    useCaseRef.current?.cancel();
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setDocument(null);
    setErrorType(null);
  }, []);

  return { status, document, errorType, isMockMode, startScan, cancelScan, reset };
}
