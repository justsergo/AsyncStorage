import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (vehicleId, vehicleDescription) => {
  await AsyncStorage.setItem(vehicleId, JSON.stringify(vehicleDescription));
};

export const get = async vehicleId => {
  return await AsyncStorage.getItem(`@${vehicleId}`);
};

export const remove = async vehicleId => {
  await AsyncStorage.removeItem(`@${vehicleId}`);
};

export const multiGet = async () => {
  let values;
  try {
    values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key']);
  } catch (e) {
    // read error
  }
  console.log(values);

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
};

export const multiRemove = async () => {
  const keys = ['@MyApp_USER_1', '@MyApp_USER_2'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }

  console.log('Done');
};
