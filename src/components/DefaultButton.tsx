import React, {useEffect, useState} from 'react';
import {Text, Pressable, StyleSheet, TouchableHighlight} from 'react-native';
import {Colors, Dimensions} from '../constants';
interface ButtonProps {
  onPress: Function;
  color: 'primary' | 'secondary' | string;
  width?: number;
  height?: number;
  title: string;
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
            : props.color
          : Colors.white,
        width: props.width ? props.width : '90%',
        height: props.height ? props.height : 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor:
          props.color == 'primary'
            ? Colors.primaryColor
            : props.color == 'secondary'
            ? Colors.secondaryColor
            : props.color,
      },
    });

  return (
    <>
      <Pressable
        onPress={() => props.onPress()}
        style={({pressed}) => styles(pressed).buttonContainer}>
        {({pressed}) => {
          return pressed ? (
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              {props.title}
            </Text>
          ) : (
            <Text
              style={{
                color:
                  props.color == 'primary'
                    ? Colors.primaryColor
                    : props.color == 'secondary'
                    ? Colors.secondaryColor
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
