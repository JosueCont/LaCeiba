import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import ComponentsScreen from "../screens/ComponentsScreen";
import HomeScreen from "../screens/HomeScreen";
import {Colors} from "../Colors";
import {TouchableOpacity} from "react-native";
import {Icon} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

const Stack = createStackNavigator();

const StackNavigatorMain = () => {
    return (
        <Stack.Navigator
            screenOptions={({navigation, route}) => ({
                gestureEnabled: true,
                headerStyle: {backgroundColor: Colors.green},
                headerTitle: '',
                drawerPosition: 'right',
                headerLeft: () => {

                    return (
                        <TouchableOpacity onPress={async () => {
                            navigation.goBack(0)
                        }} style={{
                            width: 50,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginLeft: 10
                        }}>
                            <Icon as={MaterialIcons} name={'arrow-back-ios'} color={'white'} size={'sm'}/>
                        </TouchableOpacity>
                    )
                },

            })}>
            <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>

        </Stack.Navigator>
    );
}

export default StackNavigatorMain;