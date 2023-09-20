import React, {useEffect, useRef, useState} from "react";
import {Button, ScrollView, Skeleton, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import { AppState, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {getBalanceInfo, getProfile, getTotalBalance} from "../api/Requests";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import LayoutV4 from "./Layouts/LayoutV4";
import { loggedOutAction } from "../redux/ducks/appDuck";



const BalanceScreen = ({navigation, appDuck, loggedOutAction, route}) => {
    const appState = useRef(AppState.currentState);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const [dataBalance, setDataBalance] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (isFocused) {
            getBalanceFunction();
        }
    }, [isFocused])


    const getBalanceFunction = async () => {
        try {
            setLoading(true)
            const response = await getProfile('', [appDuck.user.id])
            let params = {
                "accion": response?.data?.accion,
                "claveSocio": response?.data?.claveSocio
              }
            const totalBalance = await getTotalBalance(params);
            setData(response?.data)
            setLoading(false)
            if(!totalBalance?.data)
              return;
            console.log('totalBalance?.data', totalBalance?.data)
            setDataBalance(totalBalance?.data);
        } catch (e) {
            setLoading(false)
            console.log(e.status)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
        } finally {
        }
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <LayoutV4 white>
            <View flex={1} mx={8}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getBalanceFunction}
                        />
                    }
                    flex={1}>

                    <Text textAlign={'center'} mb={6} mt={6} color={Colors.green} bold fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        SALDO PENDIENTE DE PAGO
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={1} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                                {_.startCase(data?.nombreSocio?.toLowerCase())}
                            </Text>
                    }

                    <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'md'}>
                        ({data?.tipoSocio})
                    </Text>
                    
                    <View mb={3} >
                        {
                            loading === true ?
                                <Skeleton height={50}></Skeleton> :
                                loading === false &&
                                <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                    {`$${parseFloat(dataBalance?.totalBalance?.saldoConsumoRestaurante ? dataBalance?.totalBalance?.saldoConsumoRestaurante : 0)+parseFloat(dataBalance?.serviceBalance?.saldoServiciosFactura ? dataBalance?.serviceBalance?.saldoServiciosFactura : 0)} M.N.`}
                                </Text>
                        }
                        <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                            TOTAL
                        </Text>
                    </View>
            
                    <View mb={3} style={{ borderColor: Colors.green, borderWidth: 1.5, borderRadius: 8, backgroundColor: Colors.grayLight }}>
                        {
                            loading === true ?
                                <Skeleton height={50}></Skeleton> :
                                loading === false &&
                                <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                    {dataBalance?.serviceBalance?.saldoServiciosFactura ? `$${new Intl.NumberFormat('es-MX').format(parseFloat(dataBalance?.serviceBalance?.saldoServiciosFactura)?.toFixed(2))}` : 'NI'}
                                </Text>
                        }
                        <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                            Cuotas y servicios
                        </Text>
                    </View>
                    <View style={{ borderColor: Colors.green, borderWidth: 1.5, borderRadius: 8, backgroundColor: Colors.grayLight }}>
                        {
                            loading === true ?
                                <Skeleton height={50}></Skeleton> :
                                loading === false &&
                                <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                    {dataBalance?.totalBalance?.saldoConsumoRestaurante ? `$${new Intl.NumberFormat('es-MX').format(parseFloat(dataBalance?.totalBalance?.saldoConsumoRestaurante)?.toFixed(2))}` : 'NI'}
                                </Text>
                        }
                        <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                           Consumos
                        </Text>
                    </View>

                    <Button isLoading={loading} color={Colors.green} mt={5}
                            onPress={() => {
                                getBalanceFunction();
                                }} 
                    mb={10}>Consultar de nuevo</Button>

                    <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'md'}>
                        Dudas o aclaraciones por favor comunicarse con la administración del 
                        Club de Golf La Hacienda
                    </Text>
                </ScrollView>


            </View>

        </LayoutV4>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState, {loggedOutAction})(BalanceScreen);