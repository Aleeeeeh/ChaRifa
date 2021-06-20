import React from 'react';
import { LogBox } from 'react-native';
import Routes from './src/router';

export default function App() {
  LogBox.ignoreAllLogs();
  return(
    <>
      <Routes />
    </>
  );
}
