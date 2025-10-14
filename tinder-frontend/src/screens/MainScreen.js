import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPeople, likePerson, dislikePerson } from '../api/peopleApi';
import SwipeableOpponentCard from '../components/organisms/SwipeableOpponentCard';
import OpponentCard from '../components/organisms/OpponentCard';
import { useSetRecoilState } from 'recoil';
import { likedPeopleAtom } from '../state/recoilAtoms';

export default function MainScreen() {
  const setLikedPeople = useSetRecoilState(likedPeopleAtom);
  const { data, isLoading } = useQuery(['people','page1'], ()=> fetchPeople({page:1, per_page:20}) );
  const [index, setIndex] = useState(0);
  const people = data?.data || [];

  async function handleLike() {
    const person = people[index];
    if (!person) return;
    await likePerson(person.id);
    setLikedPeople(prev => [person, ...prev]);
    setIndex(i=>i+1);
  }

  async function handleDislike() {
    const person = people[index];
    if (!person) return;
    await dislikePerson(person.id);
    setIndex(i=>i+1);
  }

  if (isLoading) return <SafeAreaView style={styles.center}><ActivityIndicator/></SafeAreaView>;

  const current = people[index];
  const next = people[index+1];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stack}>
        {next && <OpponentCard person={next} style={{position:'absolute', top:12, transform:[{scale:0.96}]}} />}
        {current ? <SwipeableOpponentCard person={current} onSwipeLeft={handleDislike} onSwipeRight={handleLike}/> : <Text style={styles.noMore}>No more people</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff' },
  stack:{ flex:1, alignItems:'center', justifyContent:'center' },
  center:{ flex:1, alignItems:'center', justifyContent:'center' },
  noMore:{ fontSize:20 }
});
