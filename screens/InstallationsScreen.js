import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground, TouchableOpacity} from "react-native";
import campodegolf from '../assets/installations/campo-de-golf.png'
import canchadetenis from '../assets/installations/canchas-de-tenis.png'
import canchadepadel from '../assets/installations/cancha-de-padel.png'
import gimnasio from '../assets/installations/gimnasio.png'
import alberca from '../assets/installations/alberca.png'
import restaurantes from '../assets/installations/restaurantes.png'
import casaclub from '../assets/installations/casa-club.png'
import salondeeventos from '../assets/installations/salขn-de-eventos.png'


const InstallationsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Conoce nuestras instalaciones</Text>
                <View flex={1} pt={5}>

                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('InstallationsDetailScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={campodegolf} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>

                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Campo de golf</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={canchadetenis} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>

                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Canchas de Tenis</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={canchadepadel} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Cancha de Padel</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={gimnasio} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>

                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Gimnasio</Text>
                            </View>
                        </View>
                    </View>
                    <View mb={6} flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={alberca} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>

                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Alberca</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={restaurantes} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Restaurantes</Text>
                            </View>
                        </View>
                    </View>
                    <View flexDirection={'row'}>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={casaclub} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Casa Club</Text>
                            </View>
                        </View>
                        <View flex={1}>
                            <View alignItems={'center'} mb={2}>
                                <ImageBackground borderRadius={60} source={salondeeventos} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                </ImageBackground>
                            </View>
                            <View>
                                <Text textAlign={'center'} color={Colors.primary} fontSize={'md'}>Salón de eventos</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </LayoutV4>
    )
}


export default InstallationsScreen;