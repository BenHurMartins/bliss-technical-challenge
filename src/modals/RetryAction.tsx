import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Dimensions} from '../constants';
import DefaultButton from '../components/DefaultButton';
interface RetryProps {
  showModal: boolean;
  action: Function;
}

const RetryAction = (props: RetryProps) => {
  return (
    <>
      <Modal isVisible={props.showModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.mainContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Oops, something went wrong
            </Text>
            <Text style={{fontWeight: '400', fontSize: 15}}>
              The app cannot establish a connection with the server.
            </Text>
            <DefaultButton
              color={'primary'}
              onPress={props.action}
              title={'Try Again'}
              height={50}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RetryAction;

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
