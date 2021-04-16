import React, {useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Colors, Dimensions} from '../constants';
interface ButtonProps {
  onPress: Function;
  color: 'primary' | 'secondary' | 'warning';
  width?: number;
  height?: number;
  title: string;
  marginBottom?: number;
  marginTop?: number;
  loading?: boolean;
}

const Header = (props: ButtonProps) => {
  const styles = (pressed) =>
    StyleSheet.create({
      buttonContainer: {
        backgroundColor: pressed
          ? props.color == 'primary'
            ? Colors.primaryColor
            : props.color == 'secondary'
            ? Colors.secondaryColor
            : props.color == 'warning'
            ? Colors.warningColor
            : props.color
          : Colors.white,
        width: props.width ? props.width : '90%',
        height: props.height ? props.height : 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        marginTop: props.marginTop | 0,
        marginBottom: props.marginBottom | 0,
        borderColor:
          props.color == 'primary'
            ? Colors.primaryColor
            : props.color == 'secondary'
            ? Colors.secondaryColor
            : props.color == 'warning'
            ? Colors.warningColor
            : props.color,
      },
    });

  return (
    <>
      <Pressable
        disabled={props.loading}
        onPress={() => props.onPress()}
        style={({pressed}) => styles(pressed).buttonContainer}>
        {({pressed}) => {
          return pressed ? (
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              {props.title}
            </Text>
          ) : props.loading ? (
            <ActivityIndicator
              color={
                props.color == 'primary'
                  ? Colors.primaryColor
                  : props.color == 'secondary'
                  ? Colors.secondaryColor
                  : props.color == 'warning'
                  ? Colors.warningColor
                  : props.color
              }
            />
          ) : (
            <Text
              style={{
                color:
                  props.color == 'primary'
                    ? Colors.primaryColor
                    : props.color == 'secondary'
                    ? Colors.secondaryColor
                    : props.color == 'warning'
                    ? Colors.warningColor
                    : props.color,
                fontWeight: 'bold',
              }}>
              {props.title}
            </Text>
          );
        }}
      </Pressable>
    </>
  );
};

export default Header;
