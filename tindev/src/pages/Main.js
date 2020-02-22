import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Button } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import UserCad from '../components/UserCard';

export default function Main({ navigation }) {
  const currentUser = navigation.getParam('user');
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const users = await api.getUsers(currentUser._id);
      setUsers(users);
    }

    loadUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />
      <Button title="Voltar" onPress={() => navigation.navigate('Login', { logout: true })}></Button>

      <View style={styles.cardsContainer}>
        {users.map(user =>
          <UserCad key={user._id} user={user}></UserCad>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500
  }
});