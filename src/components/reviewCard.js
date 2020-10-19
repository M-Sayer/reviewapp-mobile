import React from 'react';
import { parseDate } from '../utils/parseDate';
import { renderStars } from '../utils/renderStars';
import { ListItem, Icon, Text } from 'react-native-elements';
import { updateReviewPoints } from '../utils/apiService';


export const ReviewCard = props => {
  const { review, toggle, nav, showPoints } = props;
  
  const handleUpdatePoints = async (id, value) => {
    await updateReviewPoints(id, { amount: value });
    toggle() //refetch reviews
  }

  return (
    <ListItem
      key={review.id} 
      bottomDivider
      onPress={() => nav && nav.push('Review', {
        review: review,
      })}
    >
      <ListItem.Content>
        {renderStars(review.rating)}
        <ListItem.Title numberOfLines={2}>
          {review.message}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: 'grey' }}>
          {parseDate(review.created_at)}
        </ListItem.Subtitle>
      </ListItem.Content>
      {showPoints && 
        <>
          <Icon style={{ margin: 5 }} onPress={() => handleUpdatePoints(review.id, 1)} color='green' name='chevron-thin-up' type='entypo' />
          <Text>{review.points}</Text>
          <Icon style={{ margin: 5 }} onPress={() => handleUpdatePoints(review.id, -1)} color='red' name='chevron-thin-down' type='entypo'/>
        </>
      }
    </ListItem>
  )
}