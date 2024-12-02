import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to login a user
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('initLogin');
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    console.log('userCredential', userCredential);
    const token = await userCredential.user.getIdToken();
    console.log('token', token);
    // Save token and user in AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));

    return { user: userCredential.user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to register a user
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('userCredential', userCredential);
    const token = await userCredential.user.getIdToken();
    console.log('token', token);
    // Save token and user in AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));

    return { user: userCredential.user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to logout a user
export const logoutUser = async () => {
  try {
    await auth().signOut();

    // Clear AsyncStorage
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to load user from AsyncStorage (for persisting login)
export const loadUserFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      return { user: JSON.parse(user), token };
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
