import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';
import {save, get, remove, multiGet, multiRemove} from './asyncStore';
import {vehicleId, vehicleDescription} from './data';

const Car = () => {
  /*  const year = () => {
    get().year;
  };
  const make = () => {
    get().make;
  };
  const model = () => {
    get().model;
  }; */
  async () => await get();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Year: {`${year}`}</Text>
      <Text>Make: {`${make}`}</Text>
      <Text>Model: {`${model}`}</Text>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.icon}
          onPress={async () => await save(vehicleId, vehicleDescription)}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={get}>
          <Text>Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={remove}>
          <Text>Rmove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={multiGet}>
          <Text>Multi Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={multiRemove}>
          <Text>Multi Remove</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Car;
