import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Share, Linking, Platform, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Vendor_My_Business({ navigation }) {
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  
  // Sample review data
  const reviews = [
    {
      id: '1',
      name: 'Courtney Henry',
      rating: 4,
      time: '2 mins ago',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      comment: 'Consequat sed risus felis enim in. Id reprehend at sad tempor adipiscing et vulputate duis et eros etiam.'
    },
    {
      id: '2',
      name: 'Cameron Williamson',
      rating: 4,
      time: '2 mins ago',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment: 'Consequat sed risus felis enim in. Id reprehend at sad tempor adipiscing et vulputate duis et eros etiam.'
    },
    {
      id: '3',
      name: 'Jane Cooper',
      rating: 3,
      time: '2 mins ago',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      comment: 'Ultimes tempor adipsicing sit eu at in amet sad dispict eros est ex.'
    }
  ];

  // Function to handle rating selection
  const handleRatingPress = (rating) => {
    setUserRating(rating);
  };

  // The rest of your functions remain the same
  const shareBusinessInfo = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing restaurant!',
        title: 'Business name',
        url: '#' // If you have a website to share
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleCall = () => {
    const phoneNumber = '+94712345678';

    let phoneUrl;
    if (Platform.OS === 'android') {
      phoneUrl = `tel:${phoneNumber}`;
    } else {
      phoneUrl = `telprompt:${phoneNumber}`;
    }

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => console.error('Error initiating phone call:', err));
  };

  const handleLocation = () => {
    const latitude = '6.9271';
    const longitude = '79.8612';
    const label = 'Business name';

    const locationUrl = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`
    });

    Linking.canOpenURL(locationUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Maps application is not available');
        } else {
          return Linking.openURL(locationUrl);
        }
      })
      .catch(err => console.error('Error opening maps:', err));
  };

  const handleWebsite = () => {
    const websiteUrl = 'https://www.loopwebit.com';

    Linking.canOpenURL(websiteUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Cannot open the website');
        } else {
          return Linking.openURL(websiteUrl);
        }
      })
      .catch(err => console.error('Error opening website:', err));
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting your review.');
      return;
    }
    
    if (reviewText.trim() === '') {
      Alert.alert('Review Required', 'Please write a review before submitting.');
      return;
    }
    
    // Here you would typically send the review to your backend
    Alert.alert('Review Submitted', `Thank you for your ${userRating}-star review!`);
    setReviewText('');
    setUserRating(0);
  };

  // Render a review item
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewUser}>
          <Image source={{ uri: item.image }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? "star" : "star-outline"}
                  size={16}
                  color="#FFA41C"
                />
              ))}
              <Text style={styles.reviewTime}>{item.time}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Food images with overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/home_img/Business.png')}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.navBar}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Business name */}
        <View style={styles.businessInfoContainer}>
          <Text style={styles.businessName}>Business name</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <View style={styles.iconContainer}>
              <Ionicons name="call" size={20} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleLocation}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
            <View style={styles.iconContainer}>
              <Ionicons name="globe-outline" size={20} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={shareBusinessInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="share-social" size={20} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>About this business here</Text>
        </View>

        {/* Reviews section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          
          {/* Interactive rating stars */}
          <View style={styles.overallRating}>
            {[...Array(5)].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleRatingPress(i + 1)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={i < userRating ? "star" : "star-outline"}
                  size={24}
                  color="#FFA41C"
                  style={styles.ratingIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Write a review input */}
          <View style={styles.writeReviewContainer}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write a review"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitReview}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
          
          {/* Reviews list */}
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: 'none',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessInfoContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 14,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
  },
  overallRating: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ratingIcon: {
    marginRight: 8,
  },
  writeReviewContainer: {
    marginBottom: 20,
  },
  reviewInput: {
    height: 80,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#1a237e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviewTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default Vendor_My_Business;