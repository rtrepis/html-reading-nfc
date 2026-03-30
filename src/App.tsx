import { LanguageProvider } from './presentation/context/LanguageContext';
import { HomePage } from './presentation/pages/HomePage/HomePage';

export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
