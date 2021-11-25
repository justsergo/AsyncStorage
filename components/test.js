import React, { Component } from 'react';
import './App.css';
import ChildWithAsyncStorage from './Child.js';  // function(props) { return <Child {...props} storage={} /> }

class App extends Component {
  render() {
    return (
      <div className="App">
          <ChildWithAsyncStorage id={'111'} />
      </div>
    );
  }
}

export default App;

///////
import React from 'react';
import {asyncStorageHOC} from './Parent.js';

const Child = ({id, storage}) => {
  const [data, setData] = React.useState({});
  
  const getData = React.useCallback(async (carId) => {
    if (!storage) return;
    const newData = await storage.get(carId);
    setData(newData);
  }, []);
  
  React.useEffect(() => {
    getData(id);
  }, []);
  
  return <div>
    <div>Model: {data.model}</div>
    <div>Year: {data.year}</div>
    <button onClick={() => getData('123')}>Get another data</button>
  </div>
}

const NewChild = asyncStorageHOC(Child); // function(props) { return <Child {...props} storage={} /> }

export default NewChild;
/////////

import React from 'react';

export const asyncStorageHOC = (Child) => {
  const get = async (id) => await AsyncStorage.get(id); 
  const set = async (id, data) => await AsyncStorage.set(id, data); 
  return function(props) {
    return <Child 
      {...props}
      storage={{ 
        get,
        set
      }} 
    />;
  }
}



