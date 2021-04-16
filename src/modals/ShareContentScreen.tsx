import React from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Text, Input, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {Colors, Dimensions} from '../constants';
import DefaultButton from '../components/DefaultButton';
interface ShareContentScreenProps {
  showModal: boolean;
  value: string;
  onChange: Function;
  onShare: () => void;
  onCancel: () => void;
  loading: boolean;
}

const ShareContentScreen = (props: ShareContentScreenProps) => {
  return (
    <Modal isVisible={props.showModal} style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text h3>Share Content</Text>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Input
            placeholder={'Email'}
            value={props.value}
            onChangeText={(text) => props.onChange(text)}
            selectionColor={Colors.primaryColor}
            leftIcon={<Icon name="email" size={24} color={Colors.black} />}
            inputContainerStyle={{borderBottomColor: Colors.black}}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
          <DefaultButton
            title={'Share'}
            color={'primary'}
            onPress={() => props.onShare()}
            marginBottom={20}
            loading={props.loading}
          />
          <DefaultButton
            title={'Cancel'}
            color={'warning'}
            onPress={() => props.onCancel()}
            loading={props.loading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShareContentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    // padding: 20,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
});
