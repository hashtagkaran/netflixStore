import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Fab,
  Icon,
  List,
  Text,
  ListItem,
  Left,
  Right,
  Button,
  Body,
  CheckBox,
  Title,
  H1,
  Subtitle,
  Container,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Home = ({navigation, route}) => {
  const [seasonList, setSeasonList] = useState(['sd']);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const getList = async () => {
    setLoading(true);
    const storedValue = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setSeasonList([]);
    }
    const listData = JSON.parse(storedValue);
    setSeasonList(listData);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  // const deleteSeason = async () => {
  //   const newList = await seasonList.filter((list) => list.id !== id);
  //   await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
  //   setSeasonList(newList);
  // };
  //
  // const markComplete = async (id) => {
  //   const newArr = seasonList.map((data) => {
  //     if (data.id == id) {
  //       data.watched = !data.watched;
  //     }
  //     return data;
  //   });
  //   await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
  // };

  if (loading) {
    return (
      <Container style={styles.container}>
        <Spinner color={'00b7c2'} />
      </Container>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {seasonList.length == 0 ? (
        <Container style={styles.container}>
          <H1 style={styles.heading}>
            WatchList is Empty, Please add a season
          </H1>
        </Container>
      ) : (
        <>
          <H1 style={styles.heading}>Next Series to watch</H1>
          <List>
            {seasonList.map((item) => (
              <ListItem style={styles.listItem} noBorder>
                <Left>
                  <Button style={styles.actionButton} danger>
                    <Icon name={'trash'}></Icon>
                  </Button>
                  <Button style={styles.actionButton}>
                    <Icon name="edit" type="Feather"></Icon>
                  </Button>
                </Left>
                <Body>
                  <Title style={styles.seasonName}>
                    {item ? item.name : 'jj'}
                  </Title>
                  <Text note> Seasons to Watch</Text>
                </Body>
                <Right>
                  <CheckBox />
                </Right>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Fab
        style={{backgroundColor: '#5067ff'}}
        position={'bottomRight'}
        onPress={() => navigation.navigate('Add')}>
        <Icon name="add" style={{color: 'white'}} />
      </Fab>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

export default Home;
