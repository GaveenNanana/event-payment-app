import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Share, Linking, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByUserID, getCollectionByVendor } from '../../Services/FirebaseService';

function Vendor_My_Business({ navigation }) {
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      const userObj = await getUserByUserID(userObject.userID);
      setUser(userObj);
      const reviews = await getCollectionByVendor("reviews", userObj.businessName)
      setReviews(reviews);

    };
    fetchUser();
  }, []);

  const shareBusinessInfo = async () => {
    try {
      const result = await Share.share({
        message: user.about,
        title: user.businessName,
        url: user.website
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

  // Function to handle phone call
  const handleCall = () => {
    const phoneNumber = user.phoneNumber;

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

  // Function to open location in maps
  const handleLocation = () => {
    const latitude = user.address;
    const longitude = user.address;
    const label = user.businessName;

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

  // Function to open website
  const handleWebsite = () => {
    const websiteUrl = user.website;

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
              <Text style={styles.reviewTime}>{new Date(Number(item.time)).toDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {user && <ScrollView>

        {/* Food images with overlay */}
        <View style={styles.imageContainer}>
          {user && <Image
            source={{ uri: user.imageURL }}
            style={styles.mainImage}
            resizeMode="cover"
          />}
          <View style={styles.imageOverlay}>
            <View style={styles.statusBar}>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Business name */}
        <View style={styles.businessInfoContainer}>
          {user && <Text style={styles.businessName}>{user.businessName}</Text>}
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
          {user && <Text style={styles.sectionText}>{user.about}</Text>}
        </View>

        {/* Reviews section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: 'none', // Hide the original header since we're moving it to the image
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
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