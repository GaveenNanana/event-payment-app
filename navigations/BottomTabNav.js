import { View, Text } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import { Create, Home, Meals, Profile, Settings } from "../screens";
import Feather from "react-native-vector-icons/Feather"; // Import Feather icons

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: true, // Enable labels
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 68, // Adjust height for better spacing
    backgroundColor: COLORS.white,
    borderRadius: 0,
    // marginHorizontal: 10,
    paddingBottom: 5,
    width: "100%",
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: -5,
  },
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Feather
                name="home"
                size={26}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 10, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 11, // Move label closer to the icon
                  marginLeft: 2, // Move label closer to the icon
                }}
              >
                Home
              </Text>
              {/* {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#000d4c',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )} */}
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Meals"
        component={Meals}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="restaurant-outline"
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Meals
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      /> */}

      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              
              <Ionicons name="qr-code-outline"
                size={26}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 3, // Move label closer to the icon
                }}
              >
                Pay
              </Text>
              {/* {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )} */}
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="water-outline"
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Sugar
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="person-outline" 
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 4, // Move label closer to the icon
                }}
              >
                Account
              </Text>
              {/* {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )} */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
