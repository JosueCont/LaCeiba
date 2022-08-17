import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground, TouchableOpacity} from "react-native";
import bgButton from "../assets/bgButton.png";
import iconAccess from "../assets/iconAccess.png";
import iconReserve from "../assets/iconReserve.png";
import iconLocations from "../assets/iconLocations.png";
import iconServices from "../assets/iconServices.png";
import iconGuests from "../assets/iconGuests.png";
import iconMembership from "../assets/iconMembership.png";

const InstallationsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Conoce nuestras instalaciones</Text>
                <View flex={1} pt={5}>

                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('QRInstructionsScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconAccess}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Campo de golf</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconReserve}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Canchas de Tenis</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconLocations}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Cancha de Padel</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconServices}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Gimnasio</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconGuests}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Alberca</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconMembership}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Restaurantes</Text>
                            </View>
                        </View>
                    </View>
                    <View flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconGuests}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Casa Club</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={iconMembership}/>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.green} fontSize={'md'}>Salón de eventos</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </LayoutV4>
    )
}


export default InstallationsScreen;