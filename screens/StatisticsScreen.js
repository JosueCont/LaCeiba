import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground, TouchableOpacity} from "react-native";
import bgButton from "../assets/bgButton.png";
import iconStatisticBars from '../assets/iconStatisticBars.png'
import iconStatisticPoints from '../assets/iconStatisticPoints.png'
import iconStatisticsCalendar from '../assets/iconStatisticsCalendar.png'

const StatisticsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Estadísticas</Text>
                <View flex={1} pt={5}>

                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('ServicesDetailScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                                        <Image source={iconStatisticBars}></Image>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Estadística 1</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                                    <Image source={iconStatisticsCalendar}></Image>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Estadística 2</Text>
                            </View>
                        </View>

                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                                    <Image source={iconStatisticPoints}></Image>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Estadística 3</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </LayoutV4>
    )
}


export default StatisticsScreen;