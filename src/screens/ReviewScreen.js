import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { CommentCard } from '../components/commentCard';
import { CommentForm } from '../components/commentForm';
import { ReviewCard } from '../components/reviewCard';
import { getCommentsForReview } from '../utils/apiService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export const ReviewScreen = ({ route }) => {
  const r = route.params.review;
  const [comments, setComments] = useState([]); // list of review comments
  const [commenting, setCommenting] = useState(false); // user leaving a comment?
  const [sortComments, setSortComments] = useState(true);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getComments() {
      const data = await getCommentsForReview(r.id);
      data && setComments(data);
      setLoading(false);
    };

    getComments();
  }, [commenting]);


  const renderComments = () => {
    const replies = [...comments];
    replies.sort((a, b) => {
      if (a.created_at < b.created_at) return -1;
      return 1;
    });

    if (!sortComments) replies.reverse();

    return replies.map(comment => <CommentCard comment={comment} />)
  }

  return (
    <KeyboardAwareScrollView>
      <ReviewCard review={r} toggle={() => setState(!state)} />
      {!commenting && 
        <Button 
          style={{ margin: 20 }} 
          title='Reply' 
          onPress={() => setCommenting(true)}
        />
      }
      {commenting && 
        <CommentForm reviewId={r.id} setCommenting={setCommenting} />
      }
      {loading && 
        <Text style={{ textAlign: 'center' }}>
          Loading comments...
        </Text>
      }
      {comments.length > 0 && 
        <View>
          <Text style={{ textAlign: 'center' }}>Comments</Text>
          <CheckBox 
            title='New comments first?' 
            checked={sortComments}
            checkedIcon='dot-circle-o'
            checkedColor='green'
            uncheckedIcon='circle-o'
            uncheckedColor='red'
            onPress={() => setSortComments(!sortComments)} 
          />
          {renderComments()}
        </View>
      }
    </KeyboardAwareScrollView>
  );
}