import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { likedPeopleAtom } from '../state/recoilAtoms';
import OpponentCard from '../components/organisms/OpponentCard';

export default function LikedListScreen() {
  const liked = useRecoilValue(likedPeopleAtom);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={liked}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item}) => <OpponentCard person={item} style={{ marginVertical:12}} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container:{ flex:1 } });
