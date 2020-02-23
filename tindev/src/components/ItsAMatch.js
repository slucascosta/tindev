import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import itsamatch from '../assets/itsamatch.png';

export default function ItsAMatch({ user, callback }) {
  return (
    <View style={styles.container}>
      <Image style={styles.itisamatch} source={itsamatch} />
      <Image style={styles.avatar} source={{ uri: user.avatar }} />
      
      <Text style={styles.name}>{ user.name ?? '@' + user.user }</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      <TouchableOpacity onPress={() => callback()}>
        <Text style={styles.close}>FECHAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ... StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itisamatch: {
    height: 60,
    resizeMode: 'contain'
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginVertical: 30
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },
  bio: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 30
  },
  close: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold'
  }
});