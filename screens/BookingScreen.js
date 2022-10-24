import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Text, View} from "native-base";
import React from "react";
import {ImageBackground} from "react-native";
import golfImage from '../assets/booking/golfImage.png'
import tenisImage from '../assets/booking/tenisImage.png'
import poolImage from '../assets/booking/poolImage.png'
import padelImage from '../assets/booking/padelImage.png'
import { useEffect, useState } from "react";
import { getAllServices } from "../api/Requests";

const BookingScreen = ({navigation}) => {
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        getServices();
    }, [])
    
    const getServices = async ()=>{
        const response = await getAllServices('');
        setServices(response.data);
    }

    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                {
                    services.map((service, index)=>{
                        return(
                            <View mt={10} mb={5}>
                                <ImageBackground source={golfImage} style={{height: 180}}>
                                    <View flex={1}>
                                        <View flex={1} p={4}>
                                            <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
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
            </View>

        </LayoutV4>
    )
}

export default BookingScreen;