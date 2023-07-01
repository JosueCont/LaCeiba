import React, {useState} from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconHome from '../assets/iconHome.png';
import iconProfile from '../assets/iconProfile.png';
import iconGuestsSmall from '../assets/iconGuestsSmall.png';
import iconHelp from '../assets/iconHelp.png';
import iconStore from '../assets/iconStore.png';
import iconLogout from '../assets/iconLogout.png';
import iconMembers from '../assets/iconMembers.png'
import iconNotifications from '../assets/iconNotifications.png';
import iconMatches from '../assets/iconMatches.png'
import {TouchableOpacity} from "react-native";
import {loggedOutAction} from "../redux/ducks/appDuck";
import ModalAsk from "../screens/Modals/ModalAsk";
import iconBooking from "../assets/iconBooking.png";
import imgLogo from "../assets/imgLogo.png";
import {logOut} from "../api/Requests";
import { setAttribute } from '../redux/ducks/navigationDuck';
import Constants from "expo-constants";


const CustomDrawerContent = ({navigation, loggedOutAction, appDuck}) => {
    const [modalSessionVisible, setModalSessionVisible] = useState(null);

    const loggedOut = async() => {

        const {pushToken} = appDuck.user
        try {
            setAttribute('notificationExist', false)
            const response = await logOut('', [pushToken])
            console.log(response.data)
            loggedOutAction()
        } catch (e) {
            console.log(JSON.stringify(e))
            loggedOutAction()
            // alert(JSON.stringify(e))
        }    
    }

    return (
        <DrawerContentScrollView
            bounces={false}
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1, backgroundColor: Colors.greenV4}}>


            <View my={10} alignItems={'center'} justifyContent={'center'}>
                <Image source={imgLogo} width={161} height={120} borderRadius={60} resizeMode={'stretch'}></Image>
                <Text fontSize={'md'} mt={5} textAlign={'center'}>{appDuck.user.firstName}{'\n'}{appDuck.user.lastName}</Text>
            </View>
            <View flex={1}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconHome} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Home</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>

                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconProfile} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Mi perfil</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('MembersScreen')}>
                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconMembers} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Miembros adicionales</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ReservationsScreen')}>

                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconBooking} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Mis reservaciones</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('GuestsScreen')}>

                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconGuestsSmall} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Invitados</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MatchesScreen')}>
                <View flexDirection={'row'} mb={4}>
                       <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                           <Image source={iconMatches} style={{width: 20, height: 20}}></Image>
                       </View>
                       <View flex={1} justifyContent={'center'}>
                           <Text fontSize={'md'}>Partidos</Text>
                       </View>
                   </View>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={() => navigation.navigate('GroupsScreen')}>*/}
                {/*    <View flexDirection={'row'} mb={4}>*/}
                {/*        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>*/}
                {/*            <Image source={iconGroupPermanent} style={{width: 20, height: 20}}></Image>*/}
                {/*        </View>*/}
                {/*        <View flex={1} justifyContent={'center'}>*/}
                {/*            <Text fontSize={'md'}>Grupos fijos</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('TransactionsScreen')}>*/}
                {/*    <View flexDirection={'row'} mb={4}>*/}
                {/*        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>*/}
                {/*            <Image source={iconTransactions} style={{width: 20, height: 20}}></Image>*/}
                {/*        </View>*/}
                {/*        <View flex={1} justifyContent={'center'}>*/}
                {/*            <Text fontSize={'md'}>Transacciones</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('StatisticsScreen')}>*/}
                {/*    <View flexDirection={'row'} mb={4}>*/}
                {/*        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>*/}
                {/*            <Image source={iconStatistics} style={{width: 20, height: 20}}></Image>*/}
                {/*        </View>*/}
                {/*        <View flex={1} justifyContent={'center'}>*/}
                {/*            <Text fontSize={'md'}>Estadísticas</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('InvoicingScreen')}>*/}

                {/*    <View flexDirection={'row'} mb={4}>*/}
                {/*        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>*/}
                {/*            <Image source={iconsInvocing} style={{width: 20, height: 20}}></Image>*/}
                {/*        </View>*/}
                {/*        <View flex={1} justifyContent={'center'}>*/}
                {/*            <Text fontSize={'md'}>Facturación</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconNotifications} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Notificaciones</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HelpScreen')}>
                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconHelp} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Ayuda</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                { Constants.manifest.extra.eCommerce &&
                    <TouchableOpacity onPress={() => navigation.navigate('BuysScreen')}>
                        <View flexDirection={'row'} mb={4}>
                            <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                                <Image source={iconStore} style={{width: 20, height: 20}}></Image>
                            </View>
                            <View flex={1} justifyContent={'center'}>
                                <Text fontSize={'md'}>Mis compras</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }


                <TouchableOpacity onPress={() => setModalSessionVisible(true)}>
                    <View flexDirection={'row'} mb={4}>
                        <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                            <Image source={iconLogout} style={{width: 20, height: 20}}></Image>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'md'}>Cerrar sesión</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

            <ModalAsk
                visible={modalSessionVisible}
                iconType={'exclamation'}
                textButton={'Sí'}
                text={'¿Deseas cerrar sesión?'}
                action={() => {
                    loggedOut()
                    setModalSessionVisible(false)
                }}
                setVisible={setModalSessionVisible}
            />
        </DrawerContentScrollView>


    );
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState, {loggedOutAction})(CustomDrawerContent);
