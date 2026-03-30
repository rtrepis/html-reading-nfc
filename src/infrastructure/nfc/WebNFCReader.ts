import type { INFCReader, NFCReadResult } from '../../domain/interfaces/INFCReader';
import {
  NFCNotSupportedError,
  NFCPermissionDeniedError,
  NFCReadError,
} from '../../domain/errors/NFCErrors';

// Extend Window to include NDEFReader (Web NFC API)
declare global {
  interface Window {
    NDEFReader?: new () => NDEFReaderInstance;
  }
  interface NDEFReaderInstance {
    scan(options?: { signal?: AbortSignal }): Promise<void>;
    addEventListener(
      event: 'reading',
      handler: (event: NDEFReadingEvent) => void
    ): void;
    addEventListener(
      event: 'readingerror',
      handler: (event: Event) => void
    ): void;
  }
  interface NDEFReadingEvent extends Event {
    serialNumber: string;
    message: NDEFMessage;
  }
  interface NDEFMessage {
    records: NDEFRecord[];
  }
  interface NDEFRecord {
    recordType: string;
    data: DataView;
    mediaType?: string;
  }
}

export class WebNFCReader implements INFCReader {
  private abortController: AbortController | null = null;

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'NDEFReader' in window;
  }

  async startReading(): Promise<NFCReadResult> {
    if (!this.isSupported()) {
      throw new NFCNotSupportedError();
    }

    return new Promise((resolve, reject) => {
      this.abortController = new AbortController();

      const reader = new window.NDEFReader!();

      reader.addEventListener('reading', (event: NDEFReadingEvent) => {
        const records = event.message.records.map((record) => ({
          recordType: record.recordType,
          data: new Uint8Array(record.data.buffer),
          mediaType: record.mediaType,
        }));

        resolve({
          records,
          serialNumber: event.serialNumber,
        });
      });

      reader.addEventListener('readingerror', () => {
        reject(new NFCReadError('Hardware read error'));
      });

      reader
        .scan({ signal: this.abortController.signal })
        .catch((error: Error) => {
          if (error.name === 'NotAllowedError') {
            reject(new NFCPermissionDeniedError());
          } else {
            reject(new NFCReadError(error.message));
          }
        });
    });
  }

  stopReading(): void {
    this.abortController?.abort();
    this.abortController = null;
  }
}
