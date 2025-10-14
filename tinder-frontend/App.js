import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import MainScreen from './src/screens/MainScreen';
import LikedListScreen from './src/screens/LikedListScreen';
import AuthStack from './src/screens/AuthStack';

const qc = new QueryClient();

export default function App() {
  const [route, setRoute] = useState('auth'); // start with auth for demo

  return (
    <QueryClientProvider client={qc}>
      <RecoilRoot>
        <SafeAreaView style={{flex:1}}>
          <AuthStack onAuthDone={()=>setRoute('main')} />
          { route === 'main' ? <MainScreen /> : <LikedListScreen /> }
        </SafeAreaView>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
