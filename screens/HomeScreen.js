import React, {useEffect, useState} from 'react'
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import bgButton from "../assets/bgButton.png";
import {Image as ImageRN, ImageBackground, TouchableOpacity} from "react-native";
import iconAccess from '../assets/iconAccess.png';
import iconReserve from '../assets/iconReserve.png'
import iconGuests from '../assets/iconGuests.png'
import iconBooking from '../assets/iconBooking.png';
import iconFixedGroups from '../assets/iconFixedGroups.png';

import SliderCustom from "../components/SliderCustom/SliderCustom";
import LayoutV4 from "./Layouts/LayoutV4";
import {getAllGF, getGFLeader, validatePartner} from "../api/Requests";
import {connect} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, appDuck}) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [text, setText] = useState(null);
    const [modalInfoVisible, setModalInfoVisible] = useState(null);
    const [fixedGroups, setFixedGroups] = useState(0);
    const [allGroups, setAllGroups] = useState([]);
    const [groupsFounded, setGroupsFounded] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            setAllGroups([]);
            setGroupsFounded([]);
            getAllFixedGroups();
            checkFixedGroups();
            return () => {
                setFixedGroups(0);
              };
        }, [])
    );



    const validatePartnerFunction = async (screen) => {
        try {
            const response = await validatePartner(`/${appDuck.user.id}/partners/validate`)

            console.log(response.data)
            if (response.data.status === true) {
                navigation.navigate(screen)
            } else {
                navigation.navigate('QRNonPaymentScreen')
            }

        } catch (ex) {
            console.log(ex)
            if (ex.data.message === 'Partner does not have access') {
                setText('El socio no tiene acceso.')
            } else {
                setText(ex.data.message)
            }
            setModalInfoVisible(true)

        }

    }

    const getAllFixedGroups = async () => {
        try {
            const response = await getAllGF();
            setAllGroups(response?.data);
            for (const groupElement of response?.data) {
                for (const leader of groupElement.leaders) {
                    if(leader?.id == appDuck.user.id){
                        setGroupsFounded([...groupsFounded, groupElement]);
                    }
                }
            }
        } catch (error) {
            console.log(error?.data);
        }
    }

    const checkFixedGroups = async () => {
        try {
            const response = await getGFLeader('', [appDuck.user.id]);
            console.log(response.data);
            setFixedGroups(response?.data?.count);
        } catch (error) {
            setFixedGroups(0);
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
                            <TouchableOpacity onPress={() => validatePartnerFunction('QRInstructionsScreen')}>
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
                            <TouchableOpacity onPress={() => validatePartnerFunction('BookingServicesScreen')}>
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
                    {/*<View mb={4} flexDirection={'row'}>*/}
                    {/*    <View flex={1}>*/}
                    {/*        <TouchableOpacity onPress={() => navigation.navigate('InstallationsScreen')}>*/}
                    {/*            <View alignItems={'center'} mb={2}>*/}
                    {/*                <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*                    <Image source={iconLocations} style={{width: 45, resizeMode: 'contain'}}/>*/}
                    {/*                </ImageBackground>*/}
                    {/*            </View>*/}
                    {/*            <View>*/}
                    {/*                <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Instalaciones</Text>*/}
                    {/*            </View>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </View>*/}
                    {/*    <View flex={1}>*/}
                    {/*        <TouchableOpacity onPress={() => navigation.navigate('ServicesScreen')}>*/}

                    {/*            <View alignItems={'center'} mb={2}>*/}
                    {/*                <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*                    <Image source={iconServices} style={{width: 45, resizeMode: 'contain'}}/>*/}
                    {/*                </ImageBackground>*/}
                    {/*            </View>*/}
                    {/*            <View>*/}
                    {/*                <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Servicios</Text>*/}
                    {/*            </View>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
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

                            { (fixedGroups > 0 || groupsFounded.length > 0) && <View flex={1} mt={4}>
                                <TouchableOpacity onPress={() => navigation.navigate('FixedGroupList', {user: appDuck.user.id, groupsFounded: groupsFounded})}>
                                    <View alignItems={'center'} mb={2}>
                                        <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                            <Image source={iconFixedGroups} style={{width: 45, resizeMode: 'contain'}}/>
                                        </ImageBackground>
                                    </View>
                                    <View>
                                        <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Grupos fijos</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View flex={1}>
                            <TouchableOpacity onPress={() => navigation.navigate('ReservationsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconBooking} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Mis reservaciones</Text>
                                </View>
                            </TouchableOpacity>

                            
                        </View>

                        
                    </View>
                    
                    {/* <View mb={4} flexDirection={'row'}>
                        <View flex={2} alignItems={'center'}>
                            <TouchableOpacity onPress={() => navigation.navigate('GuestsScreen')}>

                                <View alignItems={'center'} mb={2}>
                                    <ImageBackground borderRadius={50} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={iconGuests} style={{width: 45, resizeMode: 'contain'}}/>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text textAlign={'center'} color={Colors.green} fontSize={'lg'}>Grupos fijos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> */}

                </View>

            </View>
            <ModalInfo visible={modalInfoVisible} setVisible={setModalInfoVisible} iconType={'exclamation'} text={text}></ModalInfo>
        </LayoutV4>

    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(HomeScreen)