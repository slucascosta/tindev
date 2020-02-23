import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import api from '../services/api'
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function LikeAndDislike({ loggedUser, getTargetUser, callback }) {
  async function handleDislike() {
    await api.dislike(loggedUser._id, getTargetUser()._id);
    callback();
  }

  async function handleLike() {
    await api.like(loggedUser._id, getTargetUser()._id);
    callback();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDislike} style={styles.button}>
        <Image source={dislike} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLike} style={styles.button}>
        <Image source={like} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    marginBottom: 30,
    zIndex: 0
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
});