import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getReviews } from '../utils/apiService';
import { ReviewCard } from '../components/reviewCard';

export const ReviewsScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);
  const [points, setPoints] = useState(false);
  const [loading, setLoading] = useState(true)

  //using to refetch when updating points in child component
  const toggle = () => setPoints(!points); 

  useEffect(() => {
    async function getData() {
      const data = await getReviews();
      data && setReviews(data);
      setLoading(false);
    }

    getData();
  }, [points]);

  const renderReviews = () => {
    return reviews.map(review => (
      <ReviewCard 
        showPoints={true} 
        review={review} 
        toggle={toggle} 
        nav={navigation} 
      />
    ));
  }

  
  return (
    <ScrollView>
      {loading && 
        <Text style={{ textAlign: 'center' }}>
          Loading...
        </Text>
      }
      {reviews && renderReviews()}
    </ScrollView>
  );
}