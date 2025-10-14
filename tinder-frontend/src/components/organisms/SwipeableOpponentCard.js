import React, { useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import OpponentCard from './OpponentCard';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, interpolate, Extrapolate } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SwipeableOpponentCard({ person, onSwipeLeft, onSwipeRight }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const cardOpacity = useSharedValue(1);

  useEffect(()=> {
    translateX.value = 0; translateY.value = 0; rotateZ.value = 0; cardOpacity.value = 1;
  }, [person?.id]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => { ctx.startX = translateX.value; ctx.startY = translateY.value; },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      rotateZ.value = translateX.value / 20;
    },
    onEnd: (event) => {
      const threshold = width * 0.25;
      if (translateX.value > threshold) {
        // swipe right
        translateX.value = withTiming(width * 1.2, { duration: 300 });
        rotateZ.value = withTiming(20, { duration: 300 });
        cardOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(onSwipeRight)();
      } else if (translateX.value < -threshold) {
        translateX.value = withTiming(-width * 1.2, { duration: 300 });
        rotateZ.value = withTiming(-18, { duration: 300 });
        cardOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    }
  });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: rotateZ.value + 'deg' },
      { perspective: 1000 }
    ],
    opacity: cardOpacity.value
  }));

  const likeOpacityStyle = useAnimatedStyle(()=> {
    const o = interpolate(translateX.value, [0, width*0.3], [0,1], Extrapolate.CLAMP);
    const scale = interpolate(translateX.value, [0, width*0.3], [0.8,1.2], Extrapolate.CLAMP);
    return { opacity: o, transform: [{ scale }] };
  });

  const nopeOpacityStyle = useAnimatedStyle(()=> {
    const o = interpolate(translateX.value, [0, -width*0.3], [0,1], Extrapolate.CLAMP);
    const scale = interpolate(translateX.value, [0, -width*0.3], [0.8,1.2], Extrapolate.CLAMP);
    return { opacity: o, transform: [{ scale }] };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedCardStyle]}>
        <OpponentCard person={person} />
        <Animated.View pointerEvents="none" style={[styles.badge, styles.likeBadge, likeOpacityStyle]}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
        <Animated.View pointerEvents="none" style={[styles.badge, styles.nopeBadge, nopeOpacityStyle]}>
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container:{ alignSelf:'center' },
  badge:{ position:'absolute', top:40, padding:12, borderRadius:8, zIndex:10 },
  likeBadge:{ left:30, backgroundColor:'rgba(0,200,100,0.9)' },
  nopeBadge:{ right:30, backgroundColor:'rgba(255,50,120,0.95)' },
  likeText:{ color:'#fff', fontWeight:'900', fontSize:32 },
  nopeText:{ color:'#fff', fontWeight:'900', fontSize:32 },
});
