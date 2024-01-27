import React, { useEffect, useState } from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground} from "react-native";
import iconPerson from "../assets/iconPersonSmall.png";
import { connect } from "react-redux";
import { getPoints } from "../api/Requests";

import { imageImport } from "../organizations/assets/ImageImporter";
import Constants from "expo-constants";

const MemberEditScreen = ({navigation, appDuck, route}) => {
    const {member} = route?.params
    const [memberInfo, setMemberInfo] = useState(null)
    const [loading, setLoading] = useState(null)
    const [points, setPoints] = useState(null)

    const getAvailablePoints = async (userId) =>{
        
        try {
            setLoading(true)
            const response2 = await getPoints('', [userId])
            console.log(userId, response2?.data)
            setPoints(response2?.data?.totalPoints)
            setLoading(false)
        } catch (e) {
            console.log(e.status)
        }
    }

    useEffect(()=>{
        if(member){
            console.log(member)
            setMemberInfo(member)
            if(member.user){
                getAvailablePoints(member.user.id)
            }
        }
    },[member])


    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8}>

                <View alignItems={'center'} mt={10}>
                    <ImageBackground borderRadius={60} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={iconPerson}/>
                    </ImageBackground>
                </View>

                <Text textAlign={'center'} mt={6} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                   Nombre:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.nombreSocio}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Número de acción:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {appDuck.user.partner.accion}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Parentesco:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.parentesco}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Clave socio:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.claveSocio}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Tipo socio:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.tipoSocio}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Correo electrónico de facturación:
                </Text>
                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.email}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Correo electrónico App:
                </Text>
                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.user?.email || '---'}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Teléfono:
                </Text>
                <Text textAlign={'center'} mb={10} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.telefono || '---'}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Celular:
                </Text>
                <Text textAlign={'center'} mb={10} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {memberInfo?.celular || '---'}
                </Text>
                <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Puntos disponibles:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    {points !== null ? points : '---'}
                </Text>


            </View>

        </LayoutV4>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(MemberEditScreen);