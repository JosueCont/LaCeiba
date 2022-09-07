import React, {useEffect, useState} from "react";
import {Button, Image, ScrollView, Skeleton, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {request} from "../api/Methods";
import {connect} from "react-redux";
import {RefreshControl} from "react-native";

const QRScreen = ({navigation, appDuck}) => {
    const [refreshing, setRefreshing] = useState(null);
    const [imageQRCode, setImageQRCode] = useState(null);

    console.log(appDuck)
    useEffect(() => {
        generateQRCodeFunction()
    }, [])

    const generateQRCodeFunction = async () => {
        try {
            setRefreshing(true)
            const response = await request(`/v1/users/${appDuck.user.id}/qr-code`, '', 'get')
            setImageQRCode(response.data.qrCode)
            navigation.navigate('QRNonPaymentScreen')
        } catch (e) {
            console.log(e)
        } finally {
            setRefreshing(false)
        }

    }

    return (
        <LayoutV3>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        tintColor={Colors.green}
                        refreshing={refreshing}
                        onRefresh={generateQRCodeFunction}
                    />
                }
                flex={1}>
                <View mx={20} mt={20}>

                    <View alignItems={'center'} mb={10}>
                        {
                            refreshing === true ?
                                <Skeleton width={230} height={230}/>
                                :
                                <Image source={{uri: imageQRCode}} width={230} height={230}/>
                        }
                    </View>

                    <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={10}>
                        Muestra este código en {'\n'}la entrada del club para {'\n'}poder ingresar
                    </Text>

                    <Button mb={4} onPress={() => navigation.navigate('QRSentScreen')}>Descargar</Button>
                    <Button onPress={() => navigation.goBack()}>Terminar</Button>
                </View>
            </ScrollView>
        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState)(QRScreen);