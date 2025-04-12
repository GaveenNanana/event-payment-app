import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Share, Linking, Platform, Alert, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVendorByName, getCollectionByVendor, addDocument } from '../../Services/FirebaseService';

function Vendor_My_Business({ route, navigation }) {
  const { vendor_name } = route.params;
  const [vendor, setvendor] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchVedor = async () => {
      setloading(true);
      const userValue = await AsyncStorage.getItem('user');
      if (userValue !== null) {
        const user = JSON.parse(userValue);
        setUser(user);
      } else {
        Alert.alert('No User', 'User data not found, please log in again.');
      }

      const vendor = await getVendorByName(vendor_name);
      setvendor(vendor);
      const reviews = await getCollectionByVendor("reviews", vendor_name)
      setReviews(reviews);
      setloading(false);
    };
    fetchVedor();
  }, []);


  const handleRatingPress = (rating) => {
    setUserRating(rating);
  };

  const shareBusinessInfo = async () => {
    try {
      const result = await Share.share({
        message: vendor.about,
        title: vendor.businessName,
        url: vendor.website
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
    const phoneNumber = vendor.phoneNumber;

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
    const latitude = vendor.address;
    const longitude = vendor.address;
    const label = vendor.businessName;

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
    const websiteUrl = vendor.website;

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

  const addFavourite = async () => {

    const favouriteObj = {
      name: vendor.businessName,
      details: vendor.about,
      img: vendor.imageURL,
      user_id: user.uid,
    }

    const docRef = await addDocument('Favourites', favouriteObj);
    if (docRef != null) {
      Alert.alert('Added to Favourites', `${vendor.businessName} has been added to your favourites.`);
    }
  }

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting your review.');
      return;
    }

    if (reviewText.trim() === '') {
      Alert.alert('Review Required', 'Please write a review before submitting.');
      return;
    }
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const reviewObj = {
      comment: `${reviewText}`,
      image: `${user.profileImage}`,
      name: user.displayName,
      rating: userRating,
      time: `${timestamp}`,
      vendor: vendor_name,
    }
    const docRef = await addDocument('reviews', reviewObj);

    if (docRef != null) {
      Alert.alert('Review Submitted', `Thank you for your ${userRating}-star review!`);
      setReviewText('');
      setUserRating(0);
      navigation.navigate('SingleBusinessView', { vendor_name: vendor_name })
    }
  };

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

              <Text style={styles.reviewTime}>
                {new Date(Number(item.time)).toDateString()}
              </Text>

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
        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <View></View>
        )}
        {/* Food images with overlay */}
        <View style={styles.imageContainer}>
          {vendor && <Image
            source={{ uri: vendor.imageURL }}
            style={styles.mainImage}
            resizeMode="cover"
          />}
          <View style={styles.imageOverlay}>
            <View style={styles.navBar}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartButton} onPress={addFavourite}>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Business name */}
        <View style={styles.businessInfoContainer}>
          {vendor && <Text style={styles.businessName}>{vendor.businessName}</Text>}
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
          {vendor && <Text style={styles.sectionText}>{vendor.about}</Text>}
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
              returnKeyType="done"
              onChangeText={setReviewText}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
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
  loading: {
    padding: 10,
  }
});

export default Vendor_My_Business;