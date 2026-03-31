import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'ca' | 'es' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ca: {
    appTitle: 'Lector NFC - TIN / DNI',
    appSubtitle: 'Acosta el teu DNI o document TIN al dispositiu',
    startScan: 'Iniciar Lectura NFC',
    stopScan: 'Aturar Lectura',
    scanning: 'Llegint NFC...',
    scanAgain: 'Llegir un altre document',
    documentInfo: 'Informació del Document',
    documentNumber: 'Número de document',
    documentType: 'Tipus de document',
    firstName: 'Nom',
    lastName1: 'Primer cognom',
    lastName2: 'Segon cognom',
    dateOfBirth: 'Data de naixement',
    expiryDate: 'Data de caducitat',
    gender: 'Gènere',
    nationality: 'Nacionalitat',
    serialNumber: 'Número de sèrie NFC',
    male: 'Masculí',
    female: 'Femení',
    unknown: 'Desconegut',
    errorTitle: 'Error de lectura',
    notSupported: 'Web NFC no és compatible en aquest navegador. Usa Chrome a Android.',
    permissionDenied: 'Permís NFC denegat. Accepta el permís al navegador.',
    readError: 'Error llegint el document. Torna-ho a provar.',
    parseError: 'Error processant el document. Potser no és compatible.',
    mockNotice: 'Mode demostració actiu (el navegador no suporta Web NFC. Usa Chrome a Android)',
    browserRequirementsTitle: 'Requisits per usar NFC',
    browserRequirement1: 'Navegador Chrome (versió 89 o superior)',
    browserRequirement2: 'Dispositiu Android (iOS no és compatible)',
    browserRequirement3: 'NFC activat a la configuració del mòbil (verifica manualment)',
    browserRequirement4: 'Pàgina servida per HTTPS o localhost',
    rawData: 'Dades en brut (TLV)',
    expired: 'Caducat',
    valid: 'Vàlid',
  },
  es: {
    appTitle: 'Lector NFC - TIN / DNI',
    appSubtitle: 'Acerca tu DNI o documento TIN al dispositivo',
    startScan: 'Iniciar Lectura NFC',
    stopScan: 'Detener Lectura',
    scanning: 'Leyendo NFC...',
    scanAgain: 'Leer otro documento',
    documentInfo: 'Información del Documento',
    documentNumber: 'Número de documento',
    documentType: 'Tipo de documento',
    firstName: 'Nombre',
    lastName1: 'Primer apellido',
    lastName2: 'Segundo apellido',
    dateOfBirth: 'Fecha de nacimiento',
    expiryDate: 'Fecha de caducidad',
    gender: 'Género',
    nationality: 'Nacionalidad',
    serialNumber: 'Número de serie NFC',
    male: 'Masculino',
    female: 'Femenino',
    unknown: 'Desconocido',
    errorTitle: 'Error de lectura',
    notSupported: 'Web NFC no es compatible en este navegador. Usa Chrome en Android.',
    permissionDenied: 'Permiso NFC denegado. Acepta el permiso en el navegador.',
    readError: 'Error leyendo el documento. Inténtalo de nuevo.',
    parseError: 'Error procesando el documento. Puede que no sea compatible.',
    mockNotice: 'Modo demostración activo (el navegador no soporta Web NFC. Usa Chrome en Android)',
    browserRequirementsTitle: 'Requisitos para usar NFC',
    browserRequirement1: 'Navegador Chrome (versión 89 o superior)',
    browserRequirement2: 'Dispositivo Android (iOS no es compatible)',
    browserRequirement3: 'NFC activado en la configuración del móvil (verifica manualmente)',
    browserRequirement4: 'Página servida por HTTPS o localhost',
    rawData: 'Datos en bruto (TLV)',
    expired: 'Caducado',
    valid: 'Válido',
  },
  en: {
    appTitle: 'NFC Reader - TIN / DNI',
    appSubtitle: 'Bring your ID or TIN document close to the device',
    startScan: 'Start NFC Reading',
    stopScan: 'Stop Reading',
    scanning: 'Reading NFC...',
    scanAgain: 'Read another document',
    documentInfo: 'Document Information',
    documentNumber: 'Document number',
    documentType: 'Document type',
    firstName: 'First name',
    lastName1: 'First surname',
    lastName2: 'Second surname',
    dateOfBirth: 'Date of birth',
    expiryDate: 'Expiry date',
    gender: 'Gender',
    nationality: 'Nationality',
    serialNumber: 'NFC serial number',
    male: 'Male',
    female: 'Female',
    unknown: 'Unknown',
    errorTitle: 'Read error',
    notSupported: 'Web NFC is not supported in this browser. Use Chrome on Android.',
    permissionDenied: 'NFC permission denied. Accept the permission in the browser.',
    readError: 'Error reading document. Please try again.',
    parseError: 'Error processing document. It may not be compatible.',
    mockNotice: 'Demo mode active (Web NFC not supported in this browser. Use Chrome on Android)',
    browserRequirementsTitle: 'Requirements to use NFC',
    browserRequirement1: 'Chrome browser (version 89 or higher)',
    browserRequirement2: 'Android device (iOS is not supported)',
    browserRequirement3: 'NFC enabled in phone settings (check manually)',
    browserRequirement4: 'Page served over HTTPS or localhost',
    rawData: 'Raw data (TLV)',
    expired: 'Expired',
    valid: 'Valid',
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ca');

  const t = (key: string): string =>
    translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
