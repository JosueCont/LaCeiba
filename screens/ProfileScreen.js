import React, {useEffect, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import {ImageBackground, RefreshControl, TouchableOpacity} from "react-native";
import bgButton from "../assets/bgButton.png";
import iconPersonEdit from "../assets/iconPersonEdit.png";
import {connect, useSelector} from "react-redux";
import {createUserDataDeletionRequest, getPoints, getProfile, getUserDataDeletionRequest, validatePartner} from "../api/Requests";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import LayoutV3 from "./Layouts/LayoutV3";
import moment from "moment";
import ModalEditGhin from "./Modals/ModalEditGhin";
import iconEdit from '../assets/iconEdit.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import Constants from "expo-constants";



const ProfileScreen = ({navigation, appDuck}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const [points, setPoints] = useState(null)
    const [modalEditGhin, setModalEditGhin] = useState(false)
    const [ghin, setGhin] = useState(null)
    const toast = useToast();
    const [isActive, setIsActive] = useState(null)
    const [modalDeleteInfoUser, setModalDeleteInfoUser] = useState(false)
    const [requestDeletionVisible, setRequestDeletionVisible] = useState(false);
    const [creatingRequest, setCreatingRequest] = useState(false);
    const [requestDeletionInfo, setRequestDeletionInfo] = useState(false);
    const [messageRequest, setMessageRequest] = useState('');


    useEffect(() => {
        if (isFocused) {
            getProfileFunction();
            getUserDeleteRequest();
        }
    }, [isFocused])


    const getProfileFunction = async () => {
        const ghin = await AsyncStorage.getItem('ghin');
        setGhin(ghin)

        try {
            setLoading(true)
            const response = await getProfile('', [appDuck.user.id])
            const response2 = await getPoints('', [appDuck.user.id]);
            const response3 = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            setIsActive(response3?.data?.status)
            setPoints(response2?.data?.totalPoints)
            setData(response?.data)
            setLoading(false)

        } catch (e) {
            console.log(e.status)
        } finally {
        }
    }

    const getUserDeleteRequest = async () => {
        try {
            const response = await getUserDataDeletionRequest({}, [appDuck.user.id]);
            if(response?.data?.status !== 0) {
                setRequestDeletionVisible(true);
                return;
            }
            setRequestDeletionVisible(false);
        } catch (error) {
            setRequestDeletionVisible(true);
        }
    }

    const createUserDeleteRequest = async () => {
        try {
            setModalDeleteInfoUser(false);
            setMessageRequest('Se creó la solicitud de eliminación de datos con éxito. Para cancelarla, llama a soporte');
            setCreatingRequest(true);
            setRequestDeletionVisible(false);
            const response = await createUserDataDeletionRequest({}, [appDuck.user.id]);
            setCreatingRequest(false);
            setRequestDeletionInfo(true);
        } catch (error) {
            setMessageRequest('Ocurrió un error al solicitar la eliminación de tus datos, inténtalo de nuevo');
            setRequestDeletionInfo(true);
            setRequestDeletionVisible(false);
            setCreatingRequest(false);
        }
    }


    return (
        <LayoutV3>
            <View flex={1} mx={8}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
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
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {points}
                            </Text>
                    }
                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        GHIN:
                    </Text>

                    {
                        loading === true ?
                            <Skeleton height={50} mb={10}></Skeleton> :
                            loading === false &&
                            <View mb={10} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                            <Text mr={2} textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                            {ghin? ghin : 'El valor aún no se ha especificado'}
                            </Text>
                            <TouchableOpacity onPress={async()=>{
                                const ghin = await AsyncStorage.getItem('ghin');
                                setGhin(ghin)
                                 setModalEditGhin(true)
                                }}>
                            <View>
                            <Image source={iconEdit} style={{width: 25, height: 25}}></Image>
                            </View>
                            </TouchableOpacity>
                            </View>
                    }
                    {
                    loading === true ?
                    <Skeleton height={50} mb={10}></Skeleton> :
                    loading === false && isActive ?
                     <Button onPress={() => navigation.navigate('AddPointsPartnesScreen')} mb={3}>Transferir Puntos</Button>
                     :
                     <Text mb={5} mr={2} textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                      *No puedes transferir puntos porque tu usuario está desactivado
                     </Text>
                    }
                    { Constants.manifest.extra.eCommerce &&
                    <Button onPress={() => navigation.navigate('BuysScreen')} mb={3}>Mis compras</Button>
                    }
                    <Button onPress={() => navigation.goBack()} mb={10}>Regresar</Button>
                    <Button colorScheme={'red'} isLoading={creatingRequest}
                            onPress={() => {
                                if(!requestDeletionVisible) {
                                    setMessageRequest('Ya tienes una solicitud en progreso');
                                    setRequestDeletionInfo(true);
                                    return;
                                }
                            setModalDeleteInfoUser(true)}} 
                    mb={10}>Solicitar eliminación de datos</Button>
                    {/*<Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>*/}
                    {/*    Datos de facturación*/}
                    {/*</Text>*/}
                    {/*<Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>*/}
                    {/*    Día de corte: 7 de agosto de 2022*/}
                    {/*</Text>*/}

                </ScrollView>


            </View>

            <ModalEditGhin
                visible={modalEditGhin}
                setVisible={setModalEditGhin}
                action={(v) => {
                    if  (v === true) {
                        getProfileFunction()
                        toast.show({
                            description: "Campo actualizado con éxito"
                        })

                    } else {
                        setModalEditGhin(false)
                        toast.show({
                            description: "Hubo un error intenta más tarde"
                        })
                    }
                }}
            />

            <ModalAsk
                visible={modalDeleteInfoUser}
                setVisible={setModalDeleteInfoUser}
                textButton="Confirmar"
                textNoButton="Cerrar"
                colorSchemeButtonOk={'red'}
                title="¿Desea solicitar la eliminación de sus datos?"
                text=" La eliminación de sus datos será aplicada en los siguientes 60 días"
                action={createUserDeleteRequest}
            />

            <ModalInfo
                visible={requestDeletionInfo}
                setVisible={setRequestDeletionInfo}
                text=""
                title={messageRequest}
                action={()=>{
                    setRequestDeletionInfo(false);
                }}
            />

        </LayoutV3>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState)(ProfileScreen);