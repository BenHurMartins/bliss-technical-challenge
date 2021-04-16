import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {api} from '../../api/index';
import {Colors, Dimensions} from '../../constants';
import {ListItem, Avatar, Divider, SearchBar} from 'react-native-elements';
import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import {useRoute} from '@react-navigation/native';

interface Question {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: Date;
  choices: Array<Choices>;
}
interface Choice {
  choice: string;
  votes: number;
}
const DetailScreen: () => React.ReactElement = () => {
  const route = useRoute();
  const questionParam = route.params ? route.params.question : {};

  const [offset, setOffset] = useState(0);
  const [question, setQuestion] = useState<Question>({
    choices: [],
    id: 0,
    image_url: '',
    published_at: new Date(),
    question: '',
    thumb_url: '',
  });
  const [selectedChoice, setSelectedChoice] = useState<Choice>({
    choice: '',
    votes: 0,
  });

  useEffect(() => {
    questionParam ? setQuestion(questionParam) : null;
  }, []);

  const vote = () => {
    if (selectedChoice.choice.length > 0) {
      //Continue to send vote
    } else {
      // Alert for error
    }
  };

  const renderItem = ({item}) => {
    const selected = item == selectedChoice;
    return (
      <TouchableOpacity
        onPress={() => setSelectedChoice(item)}
        style={{
          backgroundColor: selected ? Colors.primaryColor : Colors.white,
          width: Dimensions.width40,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          borderColor: Colors.primaryColor,
          margin: Dimensions.width05,
        }}>
        <Text
          style={{
            color: selected ? Colors.white : Colors.primaryColor,
            fontSize: 15,
            fontWeight: '300',
          }}>
          {item.choice}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{flex: 1}}>
          <Header backButton title={'Question'} />
          {/* <View style={{height: '80%'}}> */}
          <Text style={styles.question}>{question.question}</Text>
          <FlatList
            data={question.choices}
            renderItem={(item) => renderItem(item)}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </View> */}
          <View style={styles.buttonContainer}>
            <DefaultButton
              color={'primary'}
              onPress={vote}
              title={'Vote'}
              width={Dimensions.width50}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  question: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '300',
    marginVertical: Dimensions.width10,
    marginHorizontal: Dimensions.width05,
  },
});

export default DetailScreen;
