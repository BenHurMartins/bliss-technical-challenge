import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
  StatusBar,
  FlatList,
} from 'react-native';
import {api} from '../../api/index';
import {Colors, Dimensions} from '../../constants';
import {ListItem, Avatar, Divider, SearchBar} from 'react-native-elements';
import DefaultButton from '../../components/DefaultButton';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

interface Question {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: Date;
  choices: Array<Choices>;
}
interface Choices {
  choice: string;
  votes: number;
}
const QuestionsListScreen: () => React.ReactElement = () => {
  const [offset, setOffset] = useState(0);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [endOfQuery, setEndOfQuery] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navigation = useNavigation();

  Linking.addEventListener('url', ({url}) => {
    console.log(url);
    switch (true) {
      case url.includes('questions?filter='):
        const urlFilter = url.split('filter=').pop();
        setFilter(urlFilter);
        setShowSearchBar(true);
        console.log(filter);
        break;
      case url.includes('questions/'):
        //if the url contains question, the app will redirect to question page
        const parameter = url.split('/').pop();
        navigation.navigate('DetailScreen', {questionId: parameter});
        break;
      default:
        console.log('nao passou em nenhum');
        break;
    }
  });

  const getQuestions = () => {
    api
      .get(
        `/questions?limit=10&offset=${offset}${
          filter.length > 1 ? `&filter=${filter}` : null
        }`,
      )
      .then((response) => {
        if (response.status == 200) {
          const questionsResponse: Array<Question> = questions.concat(
            response.data,
          );
          setQuestions(questionsResponse); // Add the new questions to the app state
          setOffset(offset + response.data.length); // Add the next offset
          setEndOfQuery(response.data.length < 10 ? true : false); //If the offset is lower than 10, then there is no more question to fetch
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const renderItem = ({item}) => {
    return (
      <>
        <ListItem
          onPress={() => navigation.navigate('DetailScreen', {question: item})}
          containerStyle={{backgroundColor: Colors.white, width: '100%'}}>
          <Avatar source={{uri: item.thumb_url}} />
          <ListItem.Content>
            <ListItem.Title>{item.question}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <Divider style={{backgroundColor: Colors.primaryColor}} />
      </>
    );
    // return <Text>{item.question}</Text>;
  };

  const keyExtractor = (item, index) => index.toString();
  const onRefresh = () => setRefreshing(false);

  const search = (text: string) => {
    setFilter(text);
    if (text.length > 3) {
      getQuestions();
    }
  };
  const searchBar = () => {
    return showSearchBar ? (
      <SearchBar
        containerStyle={{
          backgroundColor: Colors.white,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        inputContainerStyle={{
          backgroundColor: Colors.white,
          borderColor: Colors.primaryColor,
          borderBottomColor: Colors.primaryColor,
          borderWidth: 1,
          borderBottomWidth: 1,
        }}
        inputStyle={{
          color: Colors.black,
        }}
        placeholder={'Search for ...'}
        onChangeText={search}
        value={filter}
      />
    ) : (
      false
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{flex: 1}}>
          <Header
            title={'Questions'}
            rightButtonName={'search'}
            rightButtonAction={() => setShowSearchBar(!showSearchBar)}
          />
          {searchBar()}
          <View style={{height: showSearchBar ? '70%' : '80%'}}>
            <FlatList
              style={{backgroundColor: Colors.white, width: '100%'}}
              data={questions}
              renderItem={(item) => renderItem(item)}
              keyExtractor={keyExtractor}
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
            />
          </View>
          <View style={styles.buttonContainer}>
            <DefaultButton
              color={'primary'}
              onPress={getQuestions}
              title={'Load more questions'}
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
});

export default QuestionsListScreen;
