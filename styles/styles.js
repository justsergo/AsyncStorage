import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  icon: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  iconSave: {
    flex: 0,
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  textInput: {
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 25,
    color: 'black',
  },
});
