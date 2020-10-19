import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { postComment } from '../utils/apiService';

export const CommentForm = props => {
  const initialState = {
    author: '',
    body: '',
  }

  const [input, setInput] = useState({...initialState});
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input.author || !input.body) return setError('Please fill out all fields');
    await postComment({ review_id: props.reviewId, ...input });
    setInput({...initialState});
    props.setCommenting(false);
  }

  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      {error && 
        <Text 
          style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}
        >
          {error}
        </Text>
      }
      <Input
        placeholder='name...'
        value={input.author}
        onChangeText={name => {
          setInput({ ...input, author: name });
          setError(null);
        }}
      />
      <Input
        multiline={true}
        placeholder='leave a comment...'
        value={input.body}
        onChangeText={reply => {
          setInput({ ...input, body: reply });
          setError(null);
        }}
      />
      <Button 
        buttonStyle={{ backgroundColor: 'green' }} 
        style={styles.button} 
        title='Submit' 
        onPress={() => handleSubmit()}
      />
      <Button 
        buttonStyle={{ backgroundColor: 'red' }} 
        style={{...styles.button}} 
        title='Cancel' 
        onPress={() => props.setCommenting(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
})