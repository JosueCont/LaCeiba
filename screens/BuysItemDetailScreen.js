import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, Button } from "native-base";
import { Colors } from "../Colors";
import { RefreshControl } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { setAttribute } from '../redux/ducks/navigationDuck';
import 'intl';
import 'intl/locale-data/jsonp/en';
import visa from '../assets/iconVisa.png';

const BuysItemDetailScreen = ({ route, navigation, setAttribute }) => {

    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            getBuyData()
        }
    }, [isFocused]);

    useEffect(() => {
        getBuyData()
    }, []);

    const getBuyData = async () => {
        setLoading(true)
        setLoading(false)
    }

    return (
        <LayoutV5 white={true}>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={6} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'22px'} textTransform={'uppercase'}>Folio: {route.params.item.id}</Text>
                    <View mx={7} mb={6} alignItems={'center'} justifyContent={'center'}>
                        <View background={Colors.green} height={'1px'} width={'95%'}>
                        </View>
                    </View>
                    <ScrollView
                        mt={2}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getBuyData}
                            />
                        }>
                        <View mx={6}>
                            <View mx={4} position={'relative'} flexDirection={'row'} height={146} justifyContent={'center'} alignItems={'center'} borderRadius={20} mb={2}
                            >
                                <Image borderRadius={20} source={{ uri: route.params.item.image }} style={{ width: '45%', height: '85%' }}></Image>
                                <View flexDirection={'row'} paddingX={2} width={'60%'}>
                                    <View ml={2} flexDirection={'column'}>
                                        <Text mb={2} numberOfLines={2} color={Colors.green} fontSize={'16'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>{`${route.params.item.count} ${route.params.item.name}`}</Text>
                                        <Text mb={2} color={Colors.green} fontSize={'14'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>{route.params.item.date}</Text>
                                        <Text color={Colors.green} fontSize={'18'} letterSpacing={.4} justifyItems={'center'} fontFamily={'titleBrandonBldBold'}>{route.params.item.price}.00 M.N.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View mx={7} mt={6} alignItems={'center'} justifyContent={'center'}>
                            <View background={Colors.green} height={'1px'} width={'95%'}>
                            </View>
                        </View>

                        <View mb={6} mt={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <Text textAlign={'center'} mt={8} mb={6} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'20px'} textTransform={'uppercase'}>Método de pago</Text>
                            <Text mb={1} color={Colors.green} fontSize={'16'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>Titular: {route.params.item.paymentData.titularName}</Text>
                            <View width={'55%'} mt={6} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Text mb={1} color={Colors.green} fontSize={'16'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>Tarjeta: </Text>
                                <Image source={visa} width={'60px'} />
                                <Text mb={1} color={Colors.green} fontSize={'16'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>{route.params.item.paymentData.cardNumber}</Text>
                            </View>
                        </View>
                        <View mt={8} justifyContent={'center'} alignItems={'center'} mx={8} mb={5}>
                            <Button mb={4} width={'100%'} py={3} onPress={() => console.log('descargado')} borderRadius={50} background={Colors.green} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: 'white', fontSize: 18, fontFamily: 'titleConfortaaRegular', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Descargar voucher</Button>
                            <Button width={'100%'} py={3} onPress={() => console.log('timbrado')} borderRadius={50} background={Colors.green} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: 'white', fontSize: 18, fontFamily: 'titleConfortaaRegular', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Solicitar factura</Button>
                        </View>

                    </ScrollView>
                </View>
            </View>

        </LayoutV5>
    )
}
const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState, { setAttribute })(BuysItemDetailScreen)
