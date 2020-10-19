import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux'; 
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import { setToken } from '../reducers/loginSlice';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '593201953663-ibgs1ch62gfkl3n3mkshv8202ol8m9ms.apps.googleusercontent.com',
        iosClientId: '593201953663-ecnplb0t363ivucaa2v6st9p6vq509dr.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      
      if (result.type === 'success') {
        dispatch(setToken(result.accessToken));
      } else {
        setError('Something went wrong, please try again.')
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center'
    }}>
      {error && <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>}
      <Button style={{ margin: 20 }} onPress={() => handleLogin()} title='Login with Google' />
    </View>
  );
}