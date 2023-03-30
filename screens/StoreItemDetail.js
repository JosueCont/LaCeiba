import React, { useEffect, useState } from "react";
import { Button, Input, ScrollView, Text, View, Image, Select, ChevronDownIcon, ChevronUpIcon } from "native-base";
import { Colors } from "../Colors";
import coins from '../assets/coins.png'
import { RefreshControl, TouchableOpacity, Linking } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _ from 'lodash';
import { useFocusEffect } from "@react-navigation/native";
import NumericInput from 'react-native-numeric-input'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
const StoreItemDetail = ({ navigation, appDuck }) => {

    const [loading, setLoading] = useState(null);
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(1)
    const [price, setPrice] = useState(1500)
    useEffect(() => {
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setCount(1)
            setPrice(1500)
        }, [])
    );

    const getProducts = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }
    return (
        <LayoutV5>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Detalle del producto</Text>
                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getProducts}
                            />
                        }>
                        <View mx={8}>
                            <View flexDirection={'column'} height={150} justifyContent={'center'} alignItems={'flex-start'} bgColor={'#768491'} borderRadius={10} mb={4}
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 3
                                }}>
                                <View flexDirection={'row'} mb={2}>
                                    <View mr={4} flex={.7} justifyContent={'center'} alignItems={'center'} pt={2}>
                                        <Image source={coins} style={{ width: 80, height: 80 }}></Image>
                                    </View>
                                    <View flex={1} flexDirection={'column'} pr={1} pt={6}>
                                        <Text numberOfLines={2} color={'#fff'} fontSize={'18'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>Puntos para invitados</Text>
                                    </View>
                                </View>
                                <View width={'100%'} flexDirection={'row'} justifyContent={'space-around'}>
                                    <Text numberOfLines={1} color={Colors.yellow} fontSize={'22'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>Cantidad</Text>
                                    <NumericInput
                                        value={count}
                                        onChange={(value) => {
                                            setCount(value)
                                        }}
                                        initValue={count}
                                        minValue={1}
                                        maxValue={10}
                                        totalWidth={100}
                                        totalHeight={35}
                                        iconSize={25}
                                        editable={false}
                                        step={1}
                                        valueType='real'
                                        rounded
                                        iconStyle={{ color: Colors.green, fontSize: 20 }}
                                        textColor={'white'}
                                        inputStyle={{ fontSize: 16, fontFamily: 'titleComfortaaBold' }}
                                        rightButtonBackgroundColor={Colors.yellow}
                                        leftButtonBackgroundColor={Colors.yellow}
                                    />
                                </View>
                            </View>
                        </View>
                        <View mx={8}>
                            <Text textAlign={'center'} mt={5} mb={4} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Información</Text>
                            <View alignItems={'center'}>
                                <View background={Colors.yellow} height={'2px'} width={'95%'}>
                                </View>
                            </View>
                            <Text textAlign={'justify'} mt={5} mb={0} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'md'}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need</Text>
                        </View>
                        <View my={5} background={Colors.green} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} py={8}>
                            <View justifyContent={'center'} background={'#fff'} width={20} mb={2} borderRadius={10} height={10}>
                                <Text textAlign={'center'} mt={1} mb={1} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'md'}>Total</Text>
                            </View>
                            <Text textAlign={'center'} mt={1} mb={1} color={Colors.yellow} fontFamily={'titleComfortaaBold'} fontSize={'3xl'}>${(price * count).toLocaleString('en-US')} M.N.</Text>
                        </View>

                        <View justifyContent={'center'} alignItems={'center'} mx={8} mb={5}>
                            {/* <Button width={'100%'} py={3} onPress={() => navigation.navigate('PaymentConfirmationScreen')} borderRadius={50} background={Colors.yellow} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: Colors.green, fontSize: 18, fontFamily: 'titleComfortaaBold' }}>Ir a pagar</Button> */}
                            <Button width={'100%'} py={3} onPress={() => downloadFile()}>Ir a pagar</Button>

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

export default connect(mapState)(StoreItemDetail)
