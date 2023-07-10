import React, {useEffect, useRef, useState} from "react";
import {Button, ScrollView, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import { AppState, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {getBalanceInfo, getProfile} from "../api/Requests";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import LayoutV3 from "./Layouts/LayoutV3";



const BalanceScreen = ({navigation, appDuck, loggedOutAction, route}) => {
    const appState = useRef(AppState.currentState);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const [dataBalance, setDataBalance] = useState(null);

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
                "action": response?.data?.accion,
                "partnerType": response?.data?.tipoSocio
              }
            const balanceInfo = await getBalanceInfo(params);
            setData(response?.data)
            setLoading(false)
            if(!balanceInfo?.data)
              return;
            const dataFounded = balanceInfo?.data?.filter(info => info.claveSocio == response?.data?.claveSocio);
            setDataBalance(dataFounded ? dataFounded[0] : null);
        } catch (e) {
            setLoading(false)
            console.log(e.status)
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
        <LayoutV3>
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
                        INFORMACIÓN DE CONSUMOS PENDIENTES DE PAGO
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'md'}>
                                {_.startCase(data?.nombreSocio?.toLowerCase())}
                            </Text>
                    }

                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'md'}>
                                Certificado: {dataBalance?.certificado ?? ''}
                            </Text>
                    }
                    <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        {data?.tipoSocio}
                    </Text>
                    
                    
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                {dataBalance?.saldo ? `$${parseFloat(dataBalance?.saldo)?.toFixed(2)}` : 'NI'}
                            </Text>
                    }
                    
                   {/*  <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Saldo a favor
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                {dataBalance?.saldoDeudor ? `$${parseFloat(dataBalance?.saldoDeudor)?.toFixed(2)}` : 'NI'}
                            </Text>
                    } */}
                    <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Saldo deudor
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={50}></Skeleton> :
                            loading === false &&
                            <Text textAlign={'center'} bold color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'4xl'}>
                                {dataBalance?.saldoComsumoFacturas ? `$${parseFloat(dataBalance?.saldoComsumoFacturas)?.toFixed(2)}` : 'NA'}
                            </Text>
                    }
                    <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                        Saldo de consumos pendientes de pago
                    </Text>

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

        </LayoutV3>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState)(BalanceScreen);