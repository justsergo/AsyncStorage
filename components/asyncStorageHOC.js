import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keyboard} from 'react-native';
import uuid from 'react-native-uuid';
import {fromPairs, values, map} from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const asyncStorageHOC = Component => {
  const [data, setData] = React.useState({});
  const [ids, setIds] = React.useState([]);
  const [infoFlatList, setInfoFlatList] = React.useState([]);

  const saveInfo = async () => {
    try {
      const newId = uuid.v4();
      await AsyncStorage.setItem(newId, JSON.stringify({...data, id: newId}));
      setIds([...ids, newId]);
      Keyboard.dismiss();
      setData('');
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    try {
      const value = await AsyncStorage.getItem(ids[ids.length - 1]);
      if (value != null) {
        const info = JSON.parse(value);
        setInfoFlatList([
          {
            ...data,
            year: info.year,
            make: info.make,
            model: info.model,
          },
        ]);
      } else {
        setInfoFlatList([
          {
            ...data,
            year: 'null',
            make: 'null',
            model: 'null',
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeInfo = async id => {
    try {
      await AsyncStorage.removeItem(id);
      setIds(ids.filter(i => i !== id));
      setInfoFlatList([
        {
          ...data,
          year: 'last item was cleared',
          make: 'last item was cleared',
          model: 'last item was cleared',
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const multiGetInfo = async () => {
    try {
      const value = await AsyncStorage.multiGet(ids);
      setInfoFlatList(map(values(fromPairs(value)), v => JSON.parse(v)));
    } catch (e) {
      console.log(e);
    }
  };

  const multiRemoveInfo = async () => {
    try {
      await AsyncStorage.clear();
      setIds([]);
      setInfoFlatList([
        {
          ...data,
          year: 'all items was cleared',
          make: 'all items was cleared',
          model: 'all items was cleared',
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Component
      setData={setData}
      data={data}
      infoFlatList={infoFlatList}
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
