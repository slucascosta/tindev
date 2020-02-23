import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userAsJson').then(userAsJson => {
      if (userAsJson)
        navigation.navigate('Main', { user: JSON.parse(userAsJson) });
    })
  }, []);

  async function handleLogin() {
    const user = await api.login(userName);
    
    await AsyncStorage.setItem('userAsJson', JSON.stringify(user));
    navigation.navigate('Main', { user });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={ Platform.OS == 'ios' }
      style={ styles.container }
    >
      <Image source={ logo } />
 
      <TextInput
        autoCapitalize="none"
        autoCorrect={ false }
        placeholder="Digite seu usuário no Github" 
        placeholderTextColor="#999"
        style={ styles.input }
        value={ userName }
        onChangeText={ setUserName }
      />

      <TouchableOpacity onPress={ handleLogin } style={ styles.button }>
        <Text style={ styles.buttonText }>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});