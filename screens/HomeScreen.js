import React, {useState} from 'react'
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import bgButton from "../assets/bgButton.png";
import {Image as ImageRN, ImageBackground, TouchableOpacity} from "react-native";
import iconAccess from '../assets/iconAccess.png';
import iconReserve from '../assets/iconReserve.png'
import iconLocations from '../assets/iconLocations.png'
import iconServices from '../assets/iconServices.png'
import iconGuests from '../assets/iconGuests.png'
import iconMembership from '../assets/iconMembership.png'
import SliderCustom from "../components/SliderCustom/SliderCustom";
import LayoutV4 from "./Layouts/LayoutV4";

const HomeScreen = ({navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)

    return (
        <LayoutV4 white={true} overlay={true}>
            <View flex={1}>
                <View bgColor={Colors.green}>
                    <SliderCustom
                        height={250}
                        items={[
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide01.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide02.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide03.png')).uri},
                            {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide04.png')).uri},

                        ]}
                        position={sliderPosition}
                        setPosition={setSliderPosition}/>
                </View>
                <View flex={1} pt={10}>
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('QRInstructionsScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconAccess}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Ingresar al club</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('BookingScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconReserve}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Reservar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('InstallationsScreen')}>
                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconLocations}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Instalaciones</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconServices}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Servicios</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View mb={4} flexDirection={'row'}>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('GuestsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconGuests}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Invitados</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('MembershipsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconMembership}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Membresía</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </LayoutV4>

    )
}

export default HomeScreen;