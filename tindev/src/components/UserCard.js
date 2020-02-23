import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';

export default function UserCad({ user, style }) {
  return (
    <View style={[styles.card, style]}>
      <Image style={styles.avatar} source={{uri: user.avatar }} />
      <View style={styles.footer}>
        <Text style={styles.name}>{user.name || '@' + user.user}</Text>
        {user.name ? <Text style={styles.username}>@{user.user}</Text> : null}
        <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  avatar: {
    flex: 1,
    height: 300,
    backgroundColor: '#fff'
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18 
  }
});