import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground, TouchableOpacity} from "react-native";
import aerobics from '../assets/services/aerobics.png'
import yoga from '../assets/services/yoga.png'
import salondebelleza from '../assets/services/salon-de-belleza.png'
import guarderia from '../assets/services/guarderia.png'
import peluqueria from '../assets/services/peluqueria.png'
import natacion from '../assets/services/natacion.png'
import padel from '../assets/services/padel.png'
import crossfit from '../assets/services/crossfit.png'

const ServicesScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Conoce nuestros servicios</Text>
                <View flex={1} pt={5}>

                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('QRInstructionsScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={aerobics} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Aerobics</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={yoga} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Yoga</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={salondebelleza} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Salón de belleza</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={guarderia} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Guardería</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={peluqueria} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Peluquería</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={natacion} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Natación</Text>
                            </View>
                        </View>
                    </View>
                    <View flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={padel} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Padel</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={crossfit} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Crossfit</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </LayoutV4>
    )
}


export default ServicesScreen;