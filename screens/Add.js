import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Form, Item, Input, Button, H1} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalSeason, setTotalSeason] = useState('');
  const addToList = async () => {
    try {
      if (!name || !totalSeason) {
        return alert('Please add both fields');
        //  SnackBar here
      }
      const seasonToAdd = {
        id: shortid.generate(),
        name,
        totalSeason,
        watched: false,
      };
      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);
      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }
      navigation.navigate('Home');
      setName('');
      setTotalSeason('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 style={styles.heading}>Add to Watch List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder={'Season Name'}
              style={{color: '#eee'}}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder={'Total No of seasons'}
              style={{color: '#eee'}}
              value={totalSeason}
              onChangeText={(text) => setTotalSeason(text)}
            />
          </Item>
          <Button rounded block onPress={addToList}>
            <Text style={{color: '#eee'}}> Add</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});

export default Add;
