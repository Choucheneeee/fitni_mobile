import { StyleSheet } from 'react-native';
import { ThemeProvider } from '../../components/ThemeContext';
import HomeContent from './Home';

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <HomeContent />

    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  
});
  