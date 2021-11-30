import React from 'react';
import {asyncStorageHOC} from './components/asyncStorageHOC';
import {CarUI} from './components/carUI';

const App = () => asyncStorageHOC(CarUI);
export default App;
