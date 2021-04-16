import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {api} from '../../api/index';
import {Colors, Dimensions} from '../../constants';
import {ListItem, Avatar, Divider, SearchBar} from 'react-native-elements';
import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import {useRoute} from '@react-navigation/native';
import LoadingScreen from '../../modals/LoadingScreen';
import ShareContentScreen from '../../modals/ShareContentScreen';

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

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);
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
      setLoading(true);
      let choicesForUpdate = question.choices.map((element: Choice) => {
        if (element.choice == selectedChoice.choice) {
          return {choice: element.choice, votes: 1};
        } else {
          return {choice: element.choice, votes: 0};
        }
      });
      const questionForUpdate = {...question, choices: choicesForUpdate};
      console.log(questionForUpdate);
      api
        .put(`/questions/${questionForUpdate.id}`, {questionForUpdate})
        .then((res) => {
          console.log(res);
          setLoading(false);
          setSelectedChoice({
            choice: '',
            votes: 0,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      Alert.alert('Alert', 'You must choose one option', [
        {
          onPress: () => {
            setLoading(false);
          },
          style: 'default',
          text: 'Ok',
        },
      ]);
    }
  };

  const share = () => {
    setLoadingShare(true);
    if (shareEmail.length > 0) {
      api
        .post(
          `/share?destination_email=${shareEmail}&content_url=${
            '/questions/' + question.id.toString()
          }`,
        )
        .then((res) => {
          setLoadingShare(false);
          setShowShareModal(false);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert('Alert', 'You must type an email', [
        {
          onPress: () => {
            setLoadingShare(false);
          },
          style: 'default',
          text: 'Ok',
        },
      ]);
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
          <LoadingScreen showModal={loading} />
          <ShareContentScreen
            showModal={showShareModal}
            value={shareEmail}
            onChange={setShareEmail}
            onCancel={() => setShowShareModal(false)}
            onShare={share}
            loading={loadingShare}
          />
          <Header
            backButton
            title={'Question'}
            rightButtonName={'share'}
            rightButtonAction={() => setShowShareModal(true)}
          />
          {/* <View style={{height: '80%'}}> */}
          <Text style={styles.question}>{question.question}</Text>
          <FlatList
            data={question.choices}
            renderItem={(item) => renderItem(item)}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{flex: 1}}>
            <View style={styles.buttonContainer}>
              <DefaultButton
                color={'secondary'}
                onPress={() => setShowShareModal(true)}
                title={'Share Content'}
                // width={Dimensions.width50}
              />
            </View>
            <View style={styles.buttonContainer}>
              <DefaultButton
                color={'primary'}
                onPress={vote}
                title={'Vote'}
                // width={Dimensions.width50}
              />
            </View>
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
    height: 60,
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
