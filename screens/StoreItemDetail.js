import React, { useEffect, useState } from "react";
import { Button, Input, ScrollView, Text, View, Image, useToast} from "native-base";
import { Colors } from "../Colors";
import { RefreshControl, TouchableOpacity, Linking } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _ from 'lodash';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import NumericInput from 'react-native-numeric-input'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAttribute } from '../redux/ducks/navigationDuck';
import {useSelector} from "react-redux";
import ModalInfo from "./Modals/ModalInfo";



const StoreItemDetail = ({ route, navigation, appDuck, setAttribute }) => {

    const [loading, setLoading] = useState(null);
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(1)
    const [price, setPrice] = useState(1500)
    const isFocused = useIsFocused();
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const toast = useToast();



    useEffect(() => {
    }, [])


    useEffect(() => {
        if (isFocused) {
            setCount(1)
            setPrice(route.params.product.price)
        }
    }, [isFocused]);

    const getProducts = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    const productsToCart = async() =>{

        let total = price*count
        const product = []
        let dataProduct = {
            ...route.params.product,
            price: total,
            count
        }
        let products =  JSON.parse(await AsyncStorage.getItem('products'))
        if(products){
            const found = products.some(prod => prod.name === route.params.product.name);
            if(found){
                setModalInfoVisible(true)

            }else{
                products.push(dataProduct)
                setAttribute('products', products)
                await AsyncStorage.setItem('products', JSON.stringify(products))
                toast.show({
                    description: "Producto agregado al carrito",
                    duration: 2000
                })
            }
            
        }else{
            product.push(dataProduct)
            setAttribute('products', product)
            await AsyncStorage.setItem('products', JSON.stringify(product))
            toast.show({
                description: "Producto agregado al carrito"
            })
        }
    }
    return (
        <LayoutV5 white={true}>
            <View flex={1}>
                <View flex={1}>
                <ScrollView
                        mt={0}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getProducts}
                            />
                        }>
                                 <Image source={{uri: route.params.product.image}} style={{ width: '100%', height: 200 }}></Image>

               
                    <Text textAlign={'center'} mt={8} mb={4} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'xl'} textTransform={'uppercase'}>{route.params.product.name}</Text>
                    <View width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} mb={5}>
                                    <Text numberOfLines={1} color={Colors.green} fontSize={'15'} justifyItems={'center'} mr={5} fontFamily={'titleConfortaaRegular'}>Cantidad</Text>
                                    <NumericInput
                                        value={count}
                                        onChange={(value) => {
                                            setCount(value)
                                        }}
                                        initValue={count}
                                        minValue={1}
                                        maxValue={10}
                                        totalWidth={90}
                                        totalHeight={28}
                                        iconSize={25}
                                        editable={false}
                                        step={1}
                                        valueType='real'
                                        rounded
                                        iconStyle={{ color: 'white', fontSize: 20 }}
                                        textColor={Colors.green}
                                        inputStyle={{ fontSize: 16, fontFamily: 'titleComfortaaBold', borderColor:'transparent'}}
                                        containerStyle={{borderColor:Colors.green,borderRadius:6,borderWidth:1.2}}
                                        rightButtonBackgroundColor={Colors.green}
                                        leftButtonBackgroundColor={Colors.green}
                                        borderColor={Colors.green}
                                    />
                                </View>
                        <View mx={8} mt={5}>
                            <View alignItems={'center'}>
                                <View background={Colors.yellow} height={'2px'} width={'95%'}>
                                </View>
                            </View>
                            <Text mb={2} textAlign={'left'} mt={5} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Detalles del producto</Text>
                            <Text textAlign={'justify'} mt={2} mb={0} color={'#5F5F5F'} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>{route.params.product.description}</Text>
                        </View>
                        <View paddingBottom={0} width={'100%'} my={8} justifyContent={'center'}alignItems={'center'}>
                        <View justifyContent={'space-around'} alignItems={'center'} flexDirection={'row'} background={Colors.greenLight} width={'75%'} borderRadius={'full'} height={'55px'}>
                             <Text textAlign={'center'} mt={1} mb={1} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'22px'}>TOTAL</Text>
                             <Text textAlign={'center'} mt={1} mb={1} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'22px'}>$ {(price * count).toLocaleString('en-US')}.00 M.N</Text>
                        </View>
                        </View>
                        <View justifyContent={'center'} alignItems={'center'} mx={8} mb={5}>
                        <Button my={4} width={'100%'} py={3} onPress={() =>{ 
                            productsToCart()
                        }}
                         borderRadius={50} background={Colors.green} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: 'white', fontSize: 18, fontFamily: 'titleConfortaaRegular', display:'flex', alignItems:'center', justifyContent:'center' }}>Añadir al carrito</Button>

                            <Button width={'100%'} py={3} onPress={() => navigation.navigate('PaymentConfirmationScreen')} 
                                borderRadius={50} 
                                background={Colors.green}
                                _pressed={{ backgroundColor: '#d1d1d1' }} 
                                _text={{ color: 'white', fontSize: 18, fontFamily: 'titleConfortaaRegular', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                Comprar ahora
                                </Button>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={'Este producto ya se encuentra en tu carrito, intente agregar otro producto'}/>


        </LayoutV5>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState,{setAttribute})(StoreItemDetail)
