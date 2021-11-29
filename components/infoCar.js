import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarUI from './carUI';

export default function Car() {
  const [data, setData] = React.useState({
    year: 'no year info',
    make: 'no make info',
    model: 'no model info',
    id: '',
  });
  const [ids, setIds] = React.useState([]);

  const saveInfo = async () => {
    setIds([data.id]);
    try {
      await AsyncStorage.setItem(ids[0], JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    try {
      await AsyncStorage.getItem(ids[0]).then(value => {
        if (value != null) {
          const info = JSON.parse(value);
          setData({
            ...data,
            year: info.year,
            make: info.make,
            model: info.model,
          });
        }
      });
    } catch (e) {
      console.log(error);
    }
  };

  const removeInfo = async () => {
    try {
      await AsyncStorage.removeItem(ids[0]);
      setData({
        ...data,
        year: `key ${data.id} was cleared`,
        make: `key ${data.id} was cleared`,
        model: `key ${data.id} was cleared`,
      });
    } catch (e) {
      console.log(error);
    }
  };

  const multiGetInfo = async () => {
    try {
      await AsyncStorage.multiGet(ids).then(value => {
        console.log(JSON.parse(value));
        if (value != null) {
          const data = JSON.parse(value);
          setDataYear(data.Year);
          setDataMake(data.Make);
          setDataModel(data.Model);
          /* setData(data); */
        }
      });
    } catch (e) {
      // read error
    }
    console.log(values);
  };

  const multiRemoveInfo = async () => {
    const keys = [id, id2];
    try {
      await AsyncStorage.multiRemove(keys);
      setDataYear(`key ${`${id} and ${id2}`} was cleared`);
      setDataMake(`key ${`${id} and ${id2}`} was cleared`);
      setDataModel(`key ${`${id} and ${id2}`} was cleared`);
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <CarUI
      save={saveInfo}
      get={getInfo}
      clean={removeInfo}
      multiGet={multiGetInfo}
      multiClean={multiRemoveInfo}
      data={data}
      setData={setData}
    />
  );
}

/* const CarChild = asyncStorageHOC(CarUI); */
