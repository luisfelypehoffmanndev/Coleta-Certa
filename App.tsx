import { EcoletaApp } from './src/screens/EcoletaApp';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <EcoletaApp />
    </SafeAreaProvider>
  );
}
