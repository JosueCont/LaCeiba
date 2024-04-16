import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Animated, Platform, Dimensions, TouchableHighlight } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorsCeiba } from "../../Colors";

const {height, width} = Dimensions.get('window');

const CustomButtomTabBar = ({state, navigation}) => {
    return(
        <View style={styles.tabBarContainer}>
            {state.routes.map((route,index) => {
                const focused = state.index === index;
                const itemColor = focused ? 'black' : 'gray';

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                } 

                let iconName;
                let label;
                switch (route.name) {
                    case "Home":
                        iconName = focused ? 'home-sharp': "home-outline";
                        label = 'Inicio'
                        break;
                    case "Booking":
                        iconName = focused ? "calendar-sharp" : 'calendar-outline';
                        label = 'Reservas'
                        break;
                    case "Map":
                        iconName = focused ? 'map-marked-alt' :'map';
                        label = 'Mapa'
                        break;
                    case 'Connect':
                        iconName = focused ? 'location-sharp' : 'location-outline';
                        label = 'Conectar'
                        break;
                    default:
                        iconName = 'circle';
                        label = 'Perfíl'
                        break;
                }

                const  animatedValue = new Animated.Value(1);
                const onPressIn = () => {
                    Animated.spring(animatedValue, {
                        toValue: 0.9,
                        useNativeDriver: true,
                    }).start();
                };
    
                const onPressOut = () => {
                    Animated.spring(animatedValue, {
                        toValue: 1,
                        useNativeDriver: true,
                    }).start();
                };

                const animatedStyle = {
                    transform: [{ scale: animatedValue }],
                };

                return(
                    <Animated.View
                        style={[styles.tabItem, animatedStyle,]}
                        key={route.name}>
                            <TouchableHighlight 
                                underlayColor={'white'}
                                onPress={onPress}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                            >
                                <View style={{ alignItems: "center"}}>
                                    {route?.name === 'Map' ? (
                                        <FontAwesome5 name={iconName} size={20} color={itemColor} style={{ marginBottom: 2}} />
                                    ): route?.name === 'Profile' ? (
                                        <View>
                                            <FontAwesome5 name={iconName} size={20} color={itemColor} style={{ marginBottom: 2}} />
                                            {focused && <View style={styles.profile}/>}
                                        </View>
                                    ):(

                                        <Ionicons  name={iconName} size={20} color={itemColor} style={{ marginBottom: 2}}/>
                                    )}
                                    <Text style={[{color: itemColor }, styles.tabBarText]}>{label}</Text>
                                </View>
                            </TouchableHighlight>
                    </Animated.View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBarContainer:{
        width: width,
        flexDirection: 'row',
        height: 60,
        borderColor: 'white',
        backgroundColor:'white',
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        justifyContent: 'space-evenly',
    },
    tabItem: {
        width: 60,
        marginTop:10
    },
    tabBarText: {
        fontSize: 10,
        fontWeight: '700',
    },
    profile:{
        width:10, 
        height:10, 
        borderRadius: 5, 
        borderColor: ColorsCeiba.lightGreen, 
        borderWidth:3,
        position:'absolute',
        right:-2,
        backgroundColor: ColorsCeiba.white
    }
})

export default CustomButtomTabBar;