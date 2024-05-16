import React, {useEffect, useRef, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, View, useToast, Select} from "native-base";
import {Colors, ColorsCeiba} from "../Colors";
import {Alert, AppState, ImageBackground, RefreshControl, TouchableOpacity} from "react-native";
import iconPersonEdit from "../assets/iconPersonEdit.png";
import {connect, useSelector} from "react-redux";
import {createUserDataDeletionRequest, getPoints, getProfile, getUserDataDeletionRequest, validatePartner} from "../api/Requests";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import _ from "lodash";
import LayoutV3 from "./Layouts/LayoutV3";
import moment from "moment";
import ModalEditGhin from "./Modals/ModalEditGhin";
import iconEdit from '../assets/iconEdit.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import {genders} from "../utils";
import ModalEditGender from "./Modals/ModalEditGender";
import ModalChangePassword from "./Modals/ModalChangePassword";
import {loggedOutAction} from "../redux/ducks/appDuck";
import { fontSize } from "styled-system";
import ModalTransferPoint from "./Modals/ModalTransferPoint";
import { imageImport } from "../organizations/assets/ImageImporter";



const ProfileScreen = ({navigation, appDuck, loggedOutAction, route}) => {
    const appState = useRef(AppState.currentState);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [loadingValidate, setLoadingValidate] = useState(null);
    const isFocused = useIsFocused();
    const [points, setPoints] = useState(null)
    const [modalEditGhin, setModalEditGhin] = useState(false)
    const [ghin, setGhin] = useState(null)
    const [gender, setGender] = useState(null)
    const [modalEditGender, setModalEditGender] = useState(false)
    const [modalChangePassword, setModalChangePassword] = useState(false)
    const toast = useToast();
    const [isActive, setIsActive] = useState(null)
    const [modalDeleteInfoUser, setModalDeleteInfoUser] = useState(false)
    const [requestDeletionVisible, setRequestDeletionVisible] = useState(false);
    const [creatingRequest, setCreatingRequest] = useState(false);
    const [requestDeletionInfo, setRequestDeletionInfo] = useState(false);
    const [messageRequest, setMessageRequest] = useState('');
    const [allowNotifications, setAllowNotifications] = useState(false)
    const [modalTransferPoint, setModalTransferPoint] = useState(false)

    useEffect(() => {
        if (isFocused) {
            getProfileFunction();
            getUserDeleteRequest();
            checkNotificationsPermission()
            partnerValidate()
        }
    }, [isFocused])


    const getProfileFunction = async () => {
        const ghin = await AsyncStorage.getItem('ghin');
        setGhin(ghin)

        try {
            setLoading(true)
            const response = await getProfile('', [appDuck.user.id])
            const response2 = await getPoints('', [appDuck.user.id]);
            // const response3 = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            // setIsActive(response3?.data?.status)
            setPoints(response2?.data?.totalPoints)
            setData(response?.data)
        } catch (e) {
            console.log(e.status)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction();
            }
        } finally {
            setLoading(false)
        }
    }

    const partnerValidate = async()=>{
        try {
            setLoadingValidate(true)
            const response3 = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            setIsActive(response3?.data?.status)
        } catch (e) {
            console.log(e.status)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction();
            }
        } finally {
            setLoadingValidate(false)
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

    const askPermission = async () => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            console.log('Notifications already allowed')
            setAllowNotifications(true)
        } else if (status === 'denied') {
            //  alert('El permiso fue denegado anteriormente, para activar dirigete a Settings/Club La Hacienda/Notifications/Allow Notifications ');
            Alert.alert(
                'Permiso denegado',
                'El permiso fue denegado anteriormente, para activar dirigete a Settings/Club La Hacienda/Notifications/Allow Notifications',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => Linking.openSettings()
                    },
                ],
                {cancelable: false},
            );
        } else {
            alert('Failed to get push token for push notification!');
        }
    }


    const checkNotificationsPermission = async () =>{
        const {status} = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            console.log('Set notifications allowed')
            setAllowNotifications(true)
        }else {
            console.log('Set notifications denied')
            setAllowNotifications(false)
        }
    }

    const loggedOut = async() => {

        const {pushToken} = appDuck.user
        try {
            setAttribute('notificationExist', false)
            const response = await logOut('', [pushToken])
            console.log(response.data)
            loggedOutAction()
        } catch (e) {
            console.log(JSON.stringify(e))
            // alert(JSON.stringify(e))
            loggedOutAction()
        }    
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                //console.log('App has come to the foreground!');
                checkNotificationsPermission()
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <LayoutV3>
            <View flex={1} mx={8}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            refreshing={loading}
                            onRefresh={getProfileFunction}
                        />
                    }
                    flex={1}>
                    <View alignItems={'center'} mt={10}>
                    {appDuck.user.partner.profilePictureUrl &&
                        <Image 
                            source={{uri: appDuck.user.partner.profilePictureUrl}} 
                            width={120} 
                            height={120} 
                            marginRight={3}
                            style={{borderRadius:60, borderWidth: 2, borderColor: Colors.partnerCard.nameBg}}
                        />
                        ||
                        <ImageBackground borderRadius={60} source={imageImport(Constants.expoConfig.slug).bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={iconPersonEdit}/>
                        </ImageBackground> 
                    }
                    </View>

                    <Text textAlign={'center'} mt={6} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Titular:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {_.startCase(data.nombreSocio.toLowerCase())}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Fecha de nacimiento:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {moment(data.nacimiento).format('LL')}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Correo electrónico de facturación:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {data.email}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Correo electrónico:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {data?.user.email}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Teléfono:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50} mb={5}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {data.celular}
                            </Text>
                    }

                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Puntos disponibles:
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                {points}
                            </Text>
                    }
                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        GHIN:
                    </Text>

                    {
                        loading === true ?
                            <Skeleton height={50} mb={10}></Skeleton> :
                            loading === false &&
                            <View mb={3} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                            <Text mr={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
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
                    <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Género:
                    </Text>

                    {
                        loading === true ?
                            <Skeleton height={50} mb={10}></Skeleton> :
                            loading === false &&
                            <View mb={10} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                                <Text mr={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                    {data?.user?.gender && data?.user?.gender.length > 0 ? genders[data.user.gender] : 'No especificado'}
                                </Text>
                                <TouchableOpacity onPress={async()=>{
                                    setModalEditGender(true)
                                }}>
                                    <View>
                                        <Image source={iconEdit} style={{width: 25, height: 25}}></Image>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }

                    {loading ? (
                        <Skeleton height={30} width={100} mb={10}/>
                    ):(
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('MyFamily')}
                            style={{backgroundColor: ColorsCeiba.darkGray, padding:10, justifyContent:'center', alignItems:'center', borderRadius:8, marginBottom:10}}>
                            <Text>Mis familiares</Text>
                        </TouchableOpacity>
                    )}

                    {Constants.expoConfig.extra.transferPoints
                        ?loading === true
                             ?  <Skeleton height={50} mb={10}></Skeleton>
                             :  loadingValidate === false && isActive
                                ?   <Button onPress={() => {setModalTransferPoint(true);}} mb={3}>Transferir Puntos</Button>
                                :   <Text mb={5} mr={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                        *No puedes transferir puntos porque tu usuario está desactivado
                                    </Text>
                        :null
                    }
                    { Constants.expoConfig.extra.eCommerce && <Button onPress={() => navigation.navigate('BuysScreen')} mb={3}>Mis compras</Button> }
                    { !allowNotifications && <Button onPress={() => askPermission()} mb={3}>Activar notificaciones</Button> }

                    <TouchableOpacity onPress={async()=>{ setModalChangePassword(true) }}>
                        <Text mr={2} textAlign={'center'} style={{textDecorationLine: 'underline'}} color={Colors.primary} fontFamily={'titleConfortaaRegular'}>
                            Cambiar contraseña
                        </Text>
                    </TouchableOpacity>

                    <Button bgColor={Colors.red} isLoading={creatingRequest} mt={10}
                            onPress={() => {
                                if(!requestDeletionVisible) {
                                    setMessageRequest('Ya tienes una solicitud en progreso');
                                    setRequestDeletionInfo(true);
                                    return;
                                }
                            setModalDeleteInfoUser(true)}} 
                    mb={10}>Solicitar eliminación de datos</Button>
                    {/*<Text textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>*/}
                    {/*    Datos de facturación*/}
                    {/*</Text>*/}
                    {/*<Text textAlign={'center'} mb={6} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>*/}
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
                            description: "Ghin actualizado con éxito"
                        })

                    } else {
                        setModalEditGhin(false)
                        toast.show({
                            description: "Hubo un error intenta más tarde"
                        })
                    }
                }}
            />

            <ModalTransferPoint
                partner={data}
                visible={modalTransferPoint}
                setVisible={setModalTransferPoint}
                actionNormalTransfer={
                    ()=> {
                        setModalTransferPoint(false);
                        navigation.navigate('AddPointsPartnesScreen', {accion: null});
                    }
                }
                actionMembersTransfer={
                    ()=> {
                        setModalTransferPoint(false);
                        navigation.navigate('AddPointsPartnesScreen', {accion: appDuck.user.partner.accion});
                    }
                }
            />

            <ModalEditGender
                partner={data}
                visible={modalEditGender}
                setVisible={setModalEditGender}
                action={(v) =>{
                    if  (v === true) {
                        getProfileFunction()
                        toast.show({
                            description: "Género actualizado con éxito"
                        })

                    } else {
                        setModalEditGender(false)
                        toast.show({
                            description: "Hubo un error intenta más tarde"
                        })
                    }
                }}
                />
                <ModalChangePassword
                    partner={data}
                    visible={modalChangePassword}
                    setVisible={setModalChangePassword}
                    action={(v) =>{
                        if  (v === true) {
                        
                            toast.show({
                                description: "Contraseña actualizada con éxito, por favor inicie sesión nuevamente."
                            })

                            loggedOut()
                        } else {
                            setModalChangePassword(false)
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


export default connect(mapState, {loggedOutAction})(ProfileScreen);