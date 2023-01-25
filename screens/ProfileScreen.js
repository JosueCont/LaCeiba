import React, {useEffect, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import {ImageBackground, RefreshControl} from "react-native";
import bgButton from "../assets/bgButton.png";
import iconPersonEdit from "../assets/iconPersonEdit.png";
import {connect} from "react-redux";
import {getPoints, getProfile} from "../api/Requests";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import LayoutV3 from "./Layouts/LayoutV3";
import moment from "moment";

const ProfileScreen = ({navigation, appDuck}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const [points, setPoints] = useState(null)

    useEffect(() => {
        if (isFocused) {
            getProfileFunction()
        }
    }, [isFocused])


    const getProfileFunction = async () => {
        try {
            setLoading(true)
            const response = await getProfile('', [appDuck.user.id])

            const response2 = await getPoints('', [appDuck.user.id]);
            setPoints(response2.data.totalPoints)
            setData(response.data)
            setLoading(false)

        } catch (e) {
            console.log(e.status)
        } finally {
        }
    }


    return (
        <LayoutV3>
            <View flex={1} mx={8}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getProfileFunction}
                        />
                    }
                    flex={1}>
                    <View alignItems={'center'} mt={10}>
                        <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={iconPersonEdit}/>
                        </ImageBackground>
                    </View>

                    <Text textAlign={'center'} mt={6} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Titular:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {_.startCase(data.nombreSocio.toLowerCase())}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Fecha de nacimiento:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {moment(data.nacimiento).format('LL')}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Correo electrónico:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {data.email}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Teléfono:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50} mb={5}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {data.celular}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Puntos disponibles:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50} mb={10}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={10} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {points}
                            </Text>
                    }
                    <Button onPress={() => navigation.navigate('AddPointsPartnesScreen')} mb={5}>Transferir Puntos</Button>
                    <Button onPress={() => navigation.goBack()} mb={10}>Regresar</Button>

                    {/*<Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>*/}
                    {/*    Datos de facturación*/}
                    {/*</Text>*/}
                    {/*<Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>*/}
                    {/*    Día de corte: 7 de agosto de 2022*/}
                    {/*</Text>*/}

                </ScrollView>
            </View>

        </LayoutV3>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ProfileScreen);