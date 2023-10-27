import React, { useEffect, useState } from 'react';
import { TextInput, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAsync, resetCreatePostAsync } from '../lib/action';
import { useNavigation } from '@react-navigation/native';

export default function AddPost() {
  const [getString, setString] = useState('')
  const [getCaption, setCaption] = useState('')
  const [getTags, setTags] = useState([])
  const [getMessage, setMessage] = useState('')
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const createPostResponse = useSelector(
    (state) => state.post.createPostResponse
  );

  useEffect(() => {
    if (createPostResponse !== undefined) {
      dispatch(resetCreatePostAsync())
      navigation.goBack();
    }
  }, [createPostResponse])

  const addTags = (data) => {
    if (getTags.includes(data) === false && getTags.length !== 3 && data !== '') {
      let newArray = [data];
      setTags([...getTags, ...newArray])
      setString('')
    } else {
      setMessage('Tag should not be empty. Only three tags can be added')
      setTimeout(() => {
        setMessage('')
      }, 2000);
    }

  }
  const insertPost = (cap, tags) => {
    console.log(cap, "captions")
    console.log(tags.length, "tagss")
    if (cap === '') {
      setMessage('Caption should not be empty.')
      setTimeout(() => {
        setMessage('')
      }, 2000);
    } else if (tags.length === 0) {
      setMessage('Tag should not be empty. Only three tags can be added')
      setTimeout(() => {
        setMessage('')
      }, 2000);
    } else {
      let data = {
        "userName": "Ishraque Khan",
        "caption": cap,
        "tags": tags
      }
      console.log(data, "data")
      dispatch(createPostAsync(data))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image
            style={styles.avatar}
            source={require('../assets/arrow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { insertPost(getCaption, getTags) }} style={styles.postButton}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={[styles.label, styles.mt74]}>Create</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => { console.log(e); setCaption(e) }}
          placeholder="What’s on your mind?"
        />

        <Text style={[styles.label, styles.mt74]}>Add Tags</Text>
        <View style={[styles.flex]}>
          <TextInput
            style={styles.input}
            onChangeText={(e) => { setString(e) }}
            placeholder="Write tags"
            value={getString}
          />
          <TouchableOpacity onPress={() => { addTags(getString) }}><Text style={[styles.label]}>Add</Text></TouchableOpacity>
        </View>

        <Text style={[styles.line]}></Text>
        <View style={styles.tags}>
          {getTags && getTags.map((value, i) => {
            return (
              <Text key={i} style={styles.button}>{value}</Text>
            )
          })}
        </View>
        {getMessage !== '' && <Text style={styles.red}>{getMessage}</Text>}
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091324',
    position: 'relative',

  },
  head: {
    flexDirection: 'row',
    paddingTop: 50,
    justifyContent: 'space-between',
    paddingLeft: 17,

  },
  postButton: {
    marginRight: 25,
    backgroundColor: "#E88607",
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 9,
    width: 80,
    height: 34,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 700,
  },
  form: {
    marginLeft: 25,
  },
  label: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 800,
  },
  input: {
    marginTop: 18,
    color: '#D4DCEC',
    fontSize: 20,
    fontWeight: 400
  },
  mt74: {
    marginTop: 74
  },
  line: {
    marginTop: 14,
    height: 1,
    backgroundColor: '#28395A',
    marginRight: 27,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginRight: 37
  },
  tags: {
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
    color: '#CFD7E7',
    fontSize: 12,
    fontWeight: 200,
  },
  red: {
    color: 'red',
    marginRight: 27,
  }
});
