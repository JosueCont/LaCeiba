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
import {validatePartner} from "../api/Requests";
import {connect} from "react-redux";

const HomeScreen = ({navigation, appDuck}) => {
    const [sliderPosition, setSliderPosition] = useState(0)


    const validatePartnerFunction = async () => {
        try {
            const response = await validatePartner(`/${appDuck.user.id}/partners/validate`)

            console.log(response.data)
            if (response.data.status === 'true') {
                navigation.navigate('QRInstructionsScreen')
            } else {
                navigation.navigate('QRNonPaymentScreen')
            }

        } catch (ex) {
            console.log(ex)
            alert(ex)
        }

    }

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
                            <TouchableOpacity onPress={() => validatePartnerFunction()}>
                                <View alignItems={'center'} mb={2}>
                                    {/*<View borderRadius={60} height={120} width={120} bgColor={'#ccc'}></View>*/}
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconAccess} style={{width: 45, resizeMode: 'contain'}}/>
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
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconReserve} style={{width: 45, resizeMode: 'contain'}}/>
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
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconLocations} style={{width: 45, resizeMode: 'contain'}}/>
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
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconServices} style={{width: 45, resizeMode: 'contain'}}/>
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
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconGuests} style={{width: 45, resizeMode: 'contain'}}/>
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
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconMembership} style={{width: 45, resizeMode: 'contain'}}/>
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

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(HomeScreen)