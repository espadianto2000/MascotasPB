import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../types';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type InitialScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Initial'
>;

const InitialScreen: React.FC<{ navigation: InitialScreenNavigationProp }> = ({
  navigation,
}) => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user === undefined) {
      console.log('user undefined');
    } else {
      if (user === null) {
        console.log('Navigating to Auth because user is', user);
        navigation.replace('Auth');
      } else {
        console.log('Navigating to Home because user is', user);
        navigation.replace('Home');
      }
    }
  }, [user, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return <View style={styles.container}></View>;
};

export default InitialScreen;
