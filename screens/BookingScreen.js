import {Button, ScrollView, Text, View} from "native-base";
import React, {useEffect, useState} from "react";
import {ImageBackground, RefreshControl} from "react-native";
import golfImage from '../assets/booking/golfImage.png'
import {getAllServices} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";

const BookingScreen = ({navigation}) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        getServices();
    }, [])

    const getServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices('');
            setServices(response.data.items);
            setLoading(false);
        } catch (e) {
            alert(JSON.stringify(e))

        }

    }

    return (
        <LayoutV3>
            <View flex={1} mx={8}>
                <ScrollView
                    mt={6}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getServices}
                        />
                    }
                    flexGrow={1}>
                    {
                        services.map((service, index) => {
                            return (
                                <View mb={5}>
                                    <ImageBackground source={golfImage} style={{height: 180}}>
                                        <View flex={1}>
                                            <View flex={1} p={4}>
                                                <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{service?.name} </Text>
                                            </View>
                                            <View flex={1} flexDirection={'row'}>
                                                <View flex={1}>

                                                </View>
                                                <View flex={1} justifyContent={'flex-end'} p={2}>
                                                    <Button onPress={() => navigation.navigate('BookingCollectDataScreen', {clean: true, service: service})}>Reservar</Button>
                                                </View>

                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            )
                        })
                    }
                    {/* <View mt={10} mb={5}>
                    <ImageBackground source={golfImage} style={{height: 180}}>
                        <View flex={1}>
                            <View flex={1} p={4}>
                                <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                            </View>
                            <View flex={1} flexDirection={'row'}>
                                <View flex={1}>

                                </View>
                                <View flex={1} justifyContent={'flex-end'} p={2}>
                                    <Button onPress={() => navigation.navigate('BookingCollectDataScreen', {clean: true})}>Reservar</Button>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View>


                <View mb={5}>
                    <ImageBackground source={tenisImage} style={{height: 180}}>
                        <View flex={1}>
                            <View flex={1} p={4}>
                                <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                            </View>
                            <View flex={1} flexDirection={'row'}>
                                <View flex={1}>

                                </View>
                                <View flex={1} justifyContent={'flex-end'} p={2}>
                                    <Button onPress={() => navigation.navigate('BookingCollectDataScreen')}>Reservar</Button>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View mb={5}>
                    <ImageBackground source={poolImage} style={{height: 180}}>
                        <View flex={1}>
                            <View flex={1} p={4}>
                                <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                            </View>
                            <View flex={1} flexDirection={'row'}>
                                <View flex={1}>

                                </View>
                                <View flex={1} justifyContent={'flex-end'} p={2}>
                                    <Button onPress={() => navigation.navigate('BookingCollectDataScreen')}>Reservar</Button>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View mb={5}>
                    <ImageBackground source={padelImage} style={{height: 180}}>
                        <View flex={1}>
                            <View flex={1} p={4}>
                                <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                            </View>
                            <View flex={1} flexDirection={'row'}>
                                <View flex={1}>

                                </View>
                                <View flex={1} justifyContent={'flex-end'} p={2}>
                                    <Button onPress={() => navigation.navigate('BookingCollectDataScreen')}>Reservar</Button>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View> */}
                </ScrollView>
            </View>

        </LayoutV3>
    )
}

export default BookingScreen;