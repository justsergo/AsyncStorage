import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {styles} from '../styles/styles';

// eslint-disable-next-line import/prefer-default-export
export const CarUI = ({setData, data, storage}) => {
  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity style={styles.icon} onPress={storage.removeInfo}>
        <Text>Remove</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Year:
        {item.year}
      </Text>
      <Text style={styles.text}>
        Make:
        {item.make}
      </Text>
      <Text style={styles.text}>
        Model:
        {item.model}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="year"
        onChangeText={text => setData({...data, year: text})}
        value={data.year}
      />
      <TextInput
        style={styles.textInput}
        placeholder="make"
        onChangeText={text => setData({...data, make: text})}
        value={data.make}
      />
      <TextInput
        style={styles.textInput}
        placeholder="model"
        onChangeText={text => setData({...data, model: text})}
        value={data.model}
      />
      <TouchableOpacity style={styles.iconSave} onPress={storage.saveInfo}>
        <Text>Save info</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <TouchableOpacity style={styles.icon} onPress={storage.getInfo}>
          <Text>Get last</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={storage.multiGetInfo}>
          <Text>Multi Get</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={storage.multiRemoveInfo}>
          <Text>Multi Remove</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};
