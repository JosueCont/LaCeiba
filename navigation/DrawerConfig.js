import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import {Icon, View} from "native-base";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../Colors";

const Drawer = createDrawerNavigator();

const DrawerConfig = () => {

    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {
                    // console.log(route.params)

                    return (
                        <TouchableOpacity onPress={async () => {
                            try {
                                if (route.name.includes('GroupsScreen')) {
                                    navigation.navigate('HomeScreen')
                                } else if (route.params.from === 'intro') {
                                    navigation.navigate('HomeScreen')
                                } else {
                                    navigation.goBack(0)
                                }
                            } catch (e) {
                                console.log('DrawerConfig error => ', e.toString())
                                navigation.goBack(0)
                            }


                        }} style={{
                            width: 50,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginLeft: 10
                        }}>
                            <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.red} size={'xl'}/>

                        </TouchableOpacity>
                    )

                },
                headerStyle: {backgroundColor: Colors.green},
                headerTitleAlign: 'center',
                headerTitleStyle: {color: 'black'},
                headerTitle: () => {
                    return (
                        <View flex={1}>
                            {/*<Image tintColor={'gray'} style={{marginTop:10,height:30, width:30}} size={'xs'} source={imageLogo} />*/}
                        </View>
                    )

                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <Icon as={MaterialIcons} color={Colors.red} name={'menu'} size={'xl'}></Icon>
                    </TouchableOpacity>
                ),
                swipeEnabled: false
            })}
            drawerContent={(props) => <CustomDrawerContent  {...props} />}>

            <Drawer.Screen name={'HomeScreen'} component={HomeScreen} options={{title: ''}}/>
        </Drawer.Navigator>
    );
}

export default DrawerConfig;