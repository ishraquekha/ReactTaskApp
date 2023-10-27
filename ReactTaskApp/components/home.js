import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getpostAsync } from '../lib/action';
// import { useNavigation } from '@react-navigation/native';

export default function Home({navigation}) {
  const [getData, setData] = useState([])
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const getPostResponse = useSelector(
    (state) => state.post.getPostResponse
  );
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      dispatch(getpostAsync())
      console.log('reload')
  });
  return focusHandler;
    
  
  }, [navigation])

  useEffect(() => {
    if (getPostResponse !== undefined) {
      setData(getPostResponse.data.body)
    }
  }, [getPostResponse])

  const Item = ({ data, i }) => (
    <><View style={i === 0 ? [styles.mainSection, styles.marginb53] : styles.mainSection}>
      <View style={styles.div1}>
        <Text style={styles.name}>{data.userName}</Text>
        <Image
          style={styles.nameImage}
          source={data.isVerified ? require('../assets/Vector.png') : null} />
      </View>
      <Text style={styles.matter}>{data.caption}</Text>
    </View>
      <View style={styles.tags}>
        {data.tags && data.tags.map((value, i) => {
          return (
            <Text key={i} style={styles.button}>{value}</Text>
          )
        })}
      </View>
      <Text style={[styles.line, styles.pdb]}></Text></>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image
          style={styles.avatar}
          source={require('../assets/ProfilePicture.png')}
        />
        <Text style={styles.mainHeading}>Chirpz</Text>
      </View>
      <Text style={[styles.line]}></Text>
      <FlatList
        data={getData}
        renderItem={({ item, index }) => <Item data={item} i={index} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={() => console.log(navigation.navigate('AddPost'))}>
        <Image style={styles.plusButton} source={require('../assets/plus.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091324',
    position: 'relative'
  },
  head: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 17,
    paddingBottom: 30,
  },
  mainHeading: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 200,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: 0,
    paddingLeft: 105,
  },
  mainSection: {
    marginLeft: 22,
  },
  div1: {
    flexDirection: 'row',
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 30,
  },
  nameImage: {
    marginLeft: 14,
    marginTop: 8,
  },
  matter: {
    marginTop: 14,
    width: 338,
    color: '#A6B6D6',
    fontWeight: 300,
    fontSize: 15,
  },
  tags: {
    marginLeft: 21,
    flexDirection: 'row',
    gap: 16,
    marginTop: 30,
    marginBottom: 17,
  },
  button: {
    display: 'flex',
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28395A',
    borderRadius: 5,
    // borderWidth:1,
    color: '#CFD7E7',
    fontSize: 12,
    fontWeight: 200,
  },
  line: {
    width: 390,
    height: 1,
    backgroundColor: '#28395A',
  },
  pdb: {
    marginBottom: 35,
  },
  marginb53: {
    marginTop: 53,
  },
  plusButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    // backgroundColor:'yellow',
  },
});
