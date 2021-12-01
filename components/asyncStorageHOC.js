import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keyboard} from 'react-native';

// eslint-disable-next-line import/prefer-default-export
export const asyncStorageHOC = Component => {
  const [data, setData] = React.useState({});
  const [ids, setIds] = React.useState(['1']);

  const makeId = lastID => `${lastID}03a`;

  const saveInfo = async () => {
    try {
      setIds([...ids, makeId(ids[ids.length - 1])]);
      await AsyncStorage.setItem(ids[ids.length - 1], JSON.stringify(data));
      Keyboard.dismiss();
      setData('');
    } catch (error) {
      console.log('error');
    }
  };

  const getInfo = async () => {
    try {
      await AsyncStorage.getItem(ids[ids.length - 2]).then(value => {
        if (value != null) {
          const info = JSON.parse(value);
          setData([
            {
              ...data,
              year: info.year,
              make: info.make,
              model: info.model,
            },
          ]);
        } else {
          setData([
            {
              ...data,
              year: 'null',
              make: 'null',
              model: 'null',
            },
          ]);
        }
        ///
      });
    } catch (e) {
      console.log('error');
    }
  };

  const removeInfo = async () => {
    try {
      await AsyncStorage.removeItem(ids[ids.length - 2]);
      setData([
        {
          ...data,
          year: 'last item was cleared',
          make: 'last item was cleared',
          model: 'last item was cleared',
        },
      ]);
    } catch (e) {
      console.log('error');
    }
  };

  const multiGetInfo = async () => {
    try {
      await AsyncStorage.multiGet(ids.slice(0, -1)).then(value => {
        console.log(value);
        value.map((result, i, store) => {
          const info = JSON.parse(store[i][1]);
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
      });
    } catch (e) {
      console.log('error');
    }
  };

  const multiRemoveInfo = async () => {
    try {
      await AsyncStorage.clear();
      setIds(['1', '1']);
      setData([
        {
          ...data,
          year: 'all items was cleared',
          make: 'all items was cleared',
          model: 'all items was cleared',
        },
      ]);
    } catch (e) {
      console.log('error');
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
