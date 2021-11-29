import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarUI from './carUI';

export default function Car({id, id2}) {
  const [year, setYear] = React.useState('no info');
  const [make, setMake] = React.useState('no info');
  const [model, setModel] = React.useState('no info');
  const [dataYear, setDataYear] = React.useState('');
  const [dataMake, setDataMake] = React.useState('');
  const [dataModel, setDataModel] = React.useState('');

  /* const [ids, setIds] = React.useState([]);
  const [data, setData] = React.useState({
    year: '',
    make: '',
    model: '',
    id: '',
  });

  <TextInput
    style={styles.textInput}
    placeholder="id"
    onChangeText={value => setData({...data, id: value})}
  />;

  <TextInput
    style={styles.textInput}
    placeholder="make"
    onChangeText={value => setData({...data, make: value})}
  />; */

  React.useEffect(() => {
    getInfo();
  }, []);

  const saveInfo = async () => {
    try {
      /* setIds([...ids, data.id]); */
      const data = {
        Year: year,
        Make: make,
        Model: model,
      };
      await AsyncStorage.setItem(id, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    try {
      await AsyncStorage.getItem(id).then(value => {
        if (value != null) {
          const data = JSON.parse(value);
          setDataYear(data.Year);
          setDataMake(data.Make);
          setDataModel(data.Model);
          /* setData(JSON.parse(value)); */
        }
      });
    } catch (e) {
      console.log(error);
    }
  };

  const removeInfo = async () => {
    try {
      await AsyncStorage.removeItem(id);
      setDataYear(`key ${id} was cleared`);
      setDataMake(`key ${id} was cleared`);
      setDataModel(`key ${id} was cleared`);
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
      year={dataYear}
      make={dataMake}
      model={dataModel}
      setYear={setYear}
      setMake={setMake}
      setModel={setModel}
    />
  );
}

/* const CarChild = asyncStorageHOC(CarUI); */
