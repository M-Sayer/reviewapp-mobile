import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './screens/LoginScreen';
import { ReviewsScreen } from './screens/ReviewsScreen';
import { ReviewScreen } from './screens/ReviewScreen';

import { useSelector } from 'react-redux';
import { selectToken } from './reducers/loginSlice';

const Stack = createStackNavigator();

export const Navigation = () => {
  const token = useSelector(selectToken);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token 
          ? <Stack.Screen 
              name='Reviews' 
              component={ReviewsScreen} 
              options={{ headerLeft: null }}
            />
          : <Stack.Screen name='Login' component={LoginScreen} />
        }
        <Stack.Screen name='Review' component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}