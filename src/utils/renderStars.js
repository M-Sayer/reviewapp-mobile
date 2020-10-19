import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export const renderStars = rating => {
  const amt = rating.split('.');
  const stars = [];
  for (let i = 0; i < parseInt(amt[0]); i++) {
    stars.push(<Icon color='gold' name='star' type='Materialicons' />)
  }
  
  if (amt[1] === '5') stars.push(<Icon color='gold' name='star-half' type='Materialicons' />);

  return <View style={{flex: 1, flexDirection: 'row',}}>{stars}</View>;
}