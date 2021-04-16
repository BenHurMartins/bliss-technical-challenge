import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import {Colors, Dimensions} from '../constants';
import DefaultButton from '../components/DefaultButton';
interface RetryProps {
  showModal: boolean;
}

const NoConnection = (props: RetryProps) => {
  return (
    <>
      <Modal isVisible={props.showModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.mainContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Oops, you have no connection with internet {'\n'}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NoConnection;

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
