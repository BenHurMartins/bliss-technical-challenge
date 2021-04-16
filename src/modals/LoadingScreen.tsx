import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Dimensions} from '../constants';
import DefaultButton from '../components/DefaultButton';
interface LoadingScreenProps {
  showModal: boolean;
}

const LoadingScreen = (props: LoadingScreenProps) => {
  return (
    <>
      <Modal isVisible={props.showModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={Colors.white} size={'large'} />
        </View>
      </Modal>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    width: Dimensions.modalWidth,
    height: Dimensions.modalHeight,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
});
