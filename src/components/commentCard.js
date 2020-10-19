import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { parseDate } from '../utils/parseDate';

export const CommentCard = ({ comment }) => {
  return (
    <ListItem style={{ marginTop: 5 }} key={comment.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{comment.author}</ListItem.Title>
        <Text>{comment.body}</Text>
      </ListItem.Content>
      <ListItem.Subtitle style={{ color: 'grey' }}>{parseDate(comment.created_at)}</ListItem.Subtitle>
    </ListItem>
  );
}