import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {asyncStorageHOC} from './parentCar';
import {styles} from '../styles/styles';
/* import {save, get, remove, multiGet, multiRemove} from './asyncStore'; */

const CarUI = ({id, storage}) => {
  const [year, setYear] = React.useState(null);
  const [make, setMake] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [dataYear, setDataYear] = React.useState('');
  const [dataMake, setDataMake] = React.useState('');
  const [dataModel, setDataModel] = React.useState('');

  const getInfo = async id => {
    if (!storage) return;
    const info = await storage.get(id);
    setDataYear(info.year);
    setDataMake(info.make);
    setDataModel(info.model);
  };

  React.useEffect(() => {
    getInfo(id);
  }, []);

  const saveData = async id => {
    if (!storage) return;
    await storage.save(id, (data = {year, make, model}));
  };

  const removeData = async () => {
    if (!storage) return;
    await storage.remove();
    setDataYear('');
    setDataMake('');
    setDataModel('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="year"
        onChangeText={value => setYear(value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="make"
        onChangeText={value => setMake(value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="model"
        onChangeText={value => setModel(value)}
      />
      <TouchableOpacity
        style={styles.iconSave}
        onPress={async () => await saveData(id)}>
        <Text>Save</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Year: {dataYear}</Text>
      <Text style={styles.text}>Make: {dataMake}</Text>
      <Text style={styles.text}>Model: {dataModel}</Text>
      <View style={styles.button}>
        <TouchableOpacity style={styles.icon} onPress={() => getInfo(id)}>
          <Text>Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => removeData()}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={async () => await multiGet()}>
          <Text>Multi Get</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={async () => await multiRemove()}>
          <Text>Multi Remove</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const CarChild = asyncStorageHOC(CarUI);

export default CarChild;
