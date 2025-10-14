import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function OpponentCard({ person, style, overlayBadge }) {
  const image = person?.pictures?.[0]?.url || 'https://picsum.photos/600/900';
  return (
    <View style={[styles.card, style]}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      {overlayBadge}
      <View style={styles.info}>
        <Text style={styles.name}>{person.name} <Text style={styles.age}>{person.age}</Text></Text>
        <Text style={styles.loc}>~ {person.latitude ? `${person.latitude}, ${person.longitude}` : 'unknown'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: height * 0.75,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  info: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: 10
  },
  name: { color: '#fff', fontSize: 24, fontWeight: '700' },
  age: { fontWeight: '600', color: '#fff', fontSize: 22 },
  loc: { color: '#fff', marginTop: 4 }
});
