import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';
import UserCad from '../components/UserCard';
import LikeAndDislike from '../components/LikeAndDislike';
import ItsAMatch from '../components/ItsAMatch';

export default function Main({ navigation }) {
  const loggedUser = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const users = await api.getUsers(loggedUser._id);
      setUsers(users);
    }

    loadUsers();
  }, [loggedUser]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: loggedUser._id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [loggedUser]);

  async function handleLogout() {
    await AsyncStorage.clear();
      
    navigation.navigate('Login');
  }

  async function handleLikeAndDislike() {
    setUsers(users.splice(1));
  }

  function getTargetUser() {
    return users && users[0];
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          style={styles.logo} 
          source={logo} />
        <Text style={styles.username}>@{loggedUser.user}</Text>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        { users.length
          ? users.map((user, index) => <UserCad key={user._id} user={user} style={{zIndex: - index }} />)
          : <Text style={styles.empty}>Acabou :(</Text>
        }
      </View>

      { users.length > 0 && <LikeAndDislike loggedUser={loggedUser} getTargetUser={getTargetUser} callback={handleLikeAndDislike} /> }

      { matchDev && <ItsAMatch user={matchDev} callback={() => setMatchDev(null)}></ItsAMatch> }
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
  },
  logo: {
    marginTop: 30
  },
  username: {
    alignSelf: 'center',
    top: 3,
    color: '#777'
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold'
  }
});