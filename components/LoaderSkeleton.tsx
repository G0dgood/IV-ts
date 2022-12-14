import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton, } from '@rneui/themed';

const SkeletonLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        <Skeleton circle width={40} height={40} style={styles.spacing} />
        <Skeleton width={330} height={40} animation="wave" />
      </View>
    </View>
  );
};

export default SkeletonLoader

const styles = StyleSheet.create({

  spacing: { paddingHorizontal: 20 },

  ContainerSkeleton: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  }
  ,
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20
  }

})