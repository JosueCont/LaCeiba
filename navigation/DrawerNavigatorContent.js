import React from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconHome from '../assets/iconHome.png';
import iconProfile from '../assets/iconProfile.png';
import iconMembers from '../assets/iconMembers.png';
import iconReservationsmall from '../assets/iconReservationsmall.png';
import iconGuestsSmall from '../assets/iconGuestsSmall.png';
import iconMatches from '../assets/iconMatches.png';
import iconTransactions from '../assets/iconTransactions.png';
import iconStatistics from '../assets/iconStatistics.png';
import iconsInvocing from '../assets/iconsInvocing.png';
import iconNotifications from '../assets/iconNotifications.png';
import iconHelp from '../assets/iconHelp.png';
import iconLogout from '../assets/iconLogout.png';
import face from '../assets/face.png';

const CustomDrawerContent = ({authDuck, navigation, navigationDuck, accountDuck, ...props}) => {

    return (
        <DrawerContentScrollView
            bounces={false}
            {...props}
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1, backgroundColor: Colors.greenV4}}>


            <View my={10} alignItems={'center'} justifyContent={'center'}>
                <Image source={face} width={100} height={100} borderRadius={60} resizeMode={'stretch'}></Image>
                <Text fontSize={'md'} mt={5}>Juan Couoh</Text>
            </View>
            <View flex={1}>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconHome} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Home</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconProfile} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Mi perfil</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconMembers} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Miembros adicionales</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconReservationsmall} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Mis reservaciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconGuestsSmall} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Invitados</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconMatches} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Partidos</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconTransactions} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Transacciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconStatistics} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Estadísticas</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconsInvocing} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Facturación</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconNotifications} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Notificaciones</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconHelp} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Ayuda</Text>
                    </View>
                </View>
                <View flexDirection={'row'} mb={4}>
                    <View flex={0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image source={iconLogout} style={{width: 20, height: 20}}></Image>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Text fontSize={'md'}>Cerrar sesión</Text>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>


    );
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}

export default connect(mapState)(CustomDrawerContent);
