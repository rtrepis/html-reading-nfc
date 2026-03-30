import type { INFCReader } from '../../domain/interfaces/INFCReader';
import { WebNFCReader } from '../../infrastructure/nfc/WebNFCReader';
import { MockNFCReader } from '../../infrastructure/nfc/MockNFCReader';

export class NFCReaderFactory {
  static create(): INFCReader {
    const webReader = new WebNFCReader();

    if (webReader.isSupported()) {
      return webReader;
    }

    // Fallback to mock for dev / unsupported browsers
    return new MockNFCReader();
  }
}
