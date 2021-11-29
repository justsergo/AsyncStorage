import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from '../styles/styles';

export default function CarUI({
  save,
  get,
  clean,
  multiClean,
  multiGet,
  setData,
  data,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="id"
        onChangeText={value => setData({...data, id: value})}
      />
      <TextInput
        style={styles.textInput}
        placeholder="year"
        onChangeText={value => setData({...data, year: value})}
      />
      <TextInput
        style={styles.textInput}
        placeholder="make"
        onChangeText={value => setData({...data, make: value})}
      />
      <TextInput
        style={styles.textInput}
        placeholder="model"
        onChangeText={value => setData({...data, model: value})}
      />
      <TouchableOpacity style={styles.iconSave} onPress={save}>
        <Text>Save</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Year: {data.year}</Text>
      <Text style={styles.text}>Make: {data.make}</Text>
      <Text style={styles.text}>Model: {data.model}</Text>
      <View style={styles.button}>
        <TouchableOpacity style={styles.icon} onPress={get}>
          <Text>Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={clean}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={multiGet}>
          <Text>Multi Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={multiClean}>
          <Text>Multi Remove</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
