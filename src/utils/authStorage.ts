import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@binjwasmm_user';

export const saveUser = async (userData: any) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving user data', e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading user data', e);
    return null;
  }
};
