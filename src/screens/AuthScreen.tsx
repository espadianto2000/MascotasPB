import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../types';
import { useTheme } from '../contexts/ThemeContext';

type AuthScreenNavigationProp = StackNavigationProp<StackParamList, 'Auth'>;

const AuthScreen: React.FC<{ navigation: AuthScreenNavigationProp }> = ({
  navigation,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const { isDarkMode, toggleColorScheme } = useTheme();
  const { user, login, register } = useAuth(); // Get user, login, and register functions from context

  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    } else {
      setLoading(false);
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
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444444' : '#cccccc',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 15,
      color: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#333333' : '#ffffff',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 15,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    toggleText: {
      color: '#4CAF50',
      fontSize: 16,
    },
    modeToggle: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
  });

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (error: any) {
      console.error('Authentication error:', error.message);
    }
  };

  if (loading) {
    // Show loading spinner while checking for user data
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.modeToggle} onPress={toggleColorScheme}>
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'}
          size={24}
          color={isDarkMode ? '#ffffff' : '#000000'}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://img.icons8.com/color/452/pet.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>
        {isLogin ? 'Welcome Back!' : 'Join Our Pet Community'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
