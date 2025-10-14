import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { register, login } from '../api/peopleApi';

export default function AuthStack({ onAuthDone }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit() {
    try {
      if (mode === 'register') {
        await register({ name, email, password, password_confirmation: password });
      } else {
        await login({ email, password });
      }
      onAuthDone?.();
    } catch (e) {
      alert('Auth error: ' + (e.response?.data?.message || e.message));
    }
  }

  return (
    <View style={styles.container}>
      {mode==='register' && <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title={mode==='register' ? 'Register' : 'Login'} onPress={handleSubmit} />
      <Text style={{marginTop:8}} onPress={()=>setMode(mode==='register'?'login':'register')}>{mode==='register'?'Have an account? Login':'No account? Register'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container:{ padding:12 }, input:{ borderWidth:1, borderColor:'#ccc', padding:8, marginVertical:6, borderRadius:6 } });
