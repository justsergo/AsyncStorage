import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keyboard} from 'react-native';

// eslint-disable-next-line import/prefer-default-export
export const asyncStorageHOC = Component => {
  const [data, setData] = React.useState([{}]);
  const [ids, setIds] = React.useState(['1']);

  const makeId = lastID => `${lastID}03a`;

  const saveInfo = async () => {
    try {
      setIds([...ids, makeId(ids[ids.length - 1])]);
      await AsyncStorage.setItem(ids[ids.length - 1], JSON.stringify(data));
      console.log(data);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    try {
      console.log(ids[ids.length - 1]);
      await AsyncStorage.getItem(ids[ids.length - 1]).then(value => {
        const info = JSON.parse(value);
        console.log(info);
        setData([
          {
            ...data,
            year: info.year,
            make: info.make,
            model: info.model,
          },
        ]);
      });
    } catch (e) {
      console.log(error);
    }
  };

  const removeInfo = async () => {
    try {
      await AsyncStorage.removeItem(ids[ids.length - 1]);
      setData([
        {
          ...data,
          year: 'last item was cleared',
          make: 'last item was cleared',
          model: 'last item was cleared',
        },
      ]);
    } catch (e) {
      console.log(error);
    }
  };

  const multiGetInfo = async () => {
    console.log(multiGetInfo);
    try {
      await AsyncStorage.multiGet(ids).then(value => {
        console.log(value);
        const info = value[ids[ids.length - 1]][JSON.stringify(value)];
        console.log(info);
        setData([
          {
            ...data,
            year: info.year,
            make: info.make,
            model: info.model,
          },
        ]);
      });
    } catch (e) {
      // read error
    }
  };

  const multiRemoveInfo = async () => {
    try {
      await AsyncStorage.multiRemove(ids);
      setData([
        {
          ...data,
          year: 'all items was cleared',
          make: 'all items was cleared',
          model: 'all items was cleared',
        },
      ]);
      console.log(data);
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <Component
      setData={setData}
      data={data}
      storage={{
        saveInfo,
        getInfo,
        removeInfo,
        multiGetInfo,
        multiRemoveInfo,
      }}
    />
  );
};
