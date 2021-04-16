import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Dimensions} from '../constants';
import {Divider, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
interface HeaderProps {
  title: string;
  backButton?: boolean;
  rightButtonName?: string;
  rightButtonAction?: () => void;
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%'}}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 30}}>
          {props.backButton ? <Icon name={'chevron-left'} size={30} /> : null}
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity
          style={{width: 30}}
          onPress={() => props.rightButtonAction()}>
          {props.rightButtonName ? (
            <Icon name={props.rightButtonName} size={25} />
          ) : null}
        </TouchableOpacity>
      </View>
      <Divider style={{backgroundColor: Colors.primaryColor}} />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
