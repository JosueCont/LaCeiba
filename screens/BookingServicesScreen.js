import {Button, ScrollView, Text, View, useToast} from "native-base";
import React, {useEffect, useState} from "react";
import {ImageBackground, RefreshControl} from "react-native";
import {getAllServices, getTotalReservationsPerMonth} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import {errorCapture} from "../utils";
import ModalInfo from "./Modals/ModalInfo";
import { loggedOutAction } from '../redux/ducks/appDuck';
import {connect, useSelector} from "react-redux";
import Constants from "expo-constants";
import { setOption } from "../redux/ducks/bookingDuck";

const BookingServicesScreen = ({navigation, loggedOutAction, appDuck, setOption}) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(null);
    const [getActiveStatus, setGetActiveStatus] = useState({isActive: true, reason: "Esta es una razón"});
    const [textModalInfo, setTextModalInfo] = useState("");
    const [modalInfo, setModalInfo] = useState(null);
    const [modalAccess, setModalAccess] = useState(false)
    const option = useSelector(state => state.bookingDuck.option)
    const user = useSelector(state => state.appDuck.user)
    const [isRebaseLimitReservations, setLimitReservation] = useState(false)

    const isFocused = useIsFocused();
    const toast = useToast();

    useFocusEffect(
        React.useCallback(() => {
          if(!getActiveStatus.isActive){
            setTextModalInfo(`Su cuenta presenta un bloqueo.\nrazón:\n ${getActiveStatus.reason} `)
            setModalInfo(true);
          }
        }, [])
    );


    useEffect(() => {
        if (isFocused) {
            getServices();
            getTotalReservations()
        }
    }, [isFocused])

    const getTotalReservations = async() => {
        try {
            const response = await getTotalReservationsPerMonth('',[user?.id])
            console.log('infoReservation', response?.data)
            if(response?.data?.totalGolfBookings < response?.data?.maxGolfBookingsPerMonth) setLimitReservation(false)
                else setLimitReservation(true)
        } catch (e) {
            console.log('error info',e)
        }
    }

    const getServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices('');
            let servicesSort = _.sortBy(response.data.items, ['name'], ['asc']);
            setServices(servicesSort);

            setLoading(false);
        } catch (e) {
            let v = await errorCapture(e);
            //alert(v.value)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction();
            }

        }

    }

    

    return (
        <LayoutV3>
            <View flex={1} mx={8}>
                <ScrollView
                    mt={6}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            refreshing={loading}
                            onRefresh={getServices}
                        />
                    }
                    flexGrow={1}>
                    <Text>{console.log(appDuck.user)}</Text>
                    {
                        services.map((service, index) => {
                            // TODO: validar que el endpoint de login devuelva la info de la membresía 
                            // Validamos si el socio tiene una membresía y si esta no tiene acceso a GOlf 
                           // if(appDuck.user?.membershipId !== null && appDuck.user?.membership?.accessToGolf === false && service.isGolf) return null
                            return(
                                <View key={index} mb={5}>
                                    <View>
                                        <ImageBackground source={{uri: service.fileUrl}} style={{height: 180}} borderRadius={20}>

                                            <View style={{
                                                borderRadius: 20,
                                                height: "100%",
                                                width: "100%",
                                                position: 'absolute',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            }}/>
                                        </ImageBackground>
                                        <View width={'100%'} height={180} position={'absolute'}>
                                            <View flex={1}>
                                                <View flex={1} p={4}>
                                                    <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{service?.name.toUpperCase()} </Text>
                                                </View>
                                                <View flex={1} flexDirection={'row'}>
                                                    <View flex={1}>

                                                    </View>
                                                    <View flex={1} justifyContent={'flex-end'} p={2}>
                                                        <Button onPress={() => {
                                                            if(Constants.expoConfig.slug === 'laceiba'){
                                                                setOption(index);
                                                                if(services[index]?.isGolf){
                                                                    if(isRebaseLimitReservations){
                                                                        setModalAccess(true)
                                                                        setTextModalInfo('Lo sentimos, ha superado el limite de reservaciones permitido por mes.')

                                                                    }else if(user?.partner?.membership?.accessToGolf){
                                                                        navigation.navigate('CreateBooking')
                                                                    }else{
                                                                        setModalAccess(true)
                                                                        setTextModalInfo('Tu membresía no incluye acceso al campo de golf')
                                                                    }
                                                                }else navigation.navigate('CreateBooking')
                                                                //navigation.navigate('CreateBooking')

                                                            }else navigation.navigate('BookingCollectDataScreen', {clean: true, service: service})
                                                            }}>Reservar</Button>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <ModalInfo
                setVisible={setModalInfo}
                visible={modalInfo}
                close={false}
                title="Cuenta inactiva"
                text={textModalInfo}
                textButton="Entendido"
                action={()=>{navigation.goBack();}}>
            </ModalInfo>
            <ModalInfo 
                visible={modalAccess}
                title="Acceso denegado"
                text={textModalInfo}
                setVisible={() => setModalAccess(false)}
            />

        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState, {loggedOutAction, setOption}) (BookingServicesScreen);