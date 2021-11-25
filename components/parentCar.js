/* export const vehicleId = '1GT4BS5';
export const vehicleDescription = {
  year: '2011',
  make: 'Ram',
  model: 'Pickup 1500',
};

export const vehicleIdTwo = '1GT4BS7';
export const vehicleDescriptionTwo = {
  year: '2012',
  make: 'Jepp',
  model: 'Pickup 3000',
};
 */

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageHOC = CarUI => {
  const save = async (id, data) => {
    {
      try {
        await AsyncStorage.setItem(id, JSON.stringify(data));
        console.log(save());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const get = async id => {
    await AsyncStorage.getItem(id);
  };
  const remove = async () => {
    await AsyncStorage.clear();
  };

  const multiGet = async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key']);
    } catch (e) {
      // read error
    }
    console.log(values);
  };

  const multiRemove = async () => {
    const keys = ['@MyApp_USER_1', '@MyApp_USER_2'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      // remove error
    }

    console.log('Done');
  };

  const gets = async id => await AsyncStorage.get(id);
  const sets = async (id, data) => await AsyncStorage.set(id, data);
  return function (props) {
    return (
      <CarUI
        {...props}
        storage={{
          get,
          save,
          remove,
          multiGet,
          multiRemove,
        }}
      />
    );
  };
};
