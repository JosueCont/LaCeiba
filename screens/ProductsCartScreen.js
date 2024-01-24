import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View, Image, Select, ChevronDownIcon, ChevronUpIcon, Button } from "native-base";
import { Colors } from "../Colors";
import ProductsCartItems from "./ProductsCartItems";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _, { set } from 'lodash';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAttribute } from '../redux/ducks/navigationDuck';
import iconEmptyCart from '../assets/iconEmptyCart.png'
import 'intl';
import 'intl/locale-data/jsonp/en';

const ProductsCartScreen = ({ navigation, setAttribute }) => {

    const [loading, setLoading] = useState(null);
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [products, setProducts] = useState([])
    const [total,setTotal] = useState(null)


    useEffect(() => {
        if (isFocused) {
            getProductsCart()
        }
    }, [isFocused]);

    useEffect(() => {
        getProductsCart()
    }, []);

    const getProductsCart = async () => {
        setLoading(true)
        const products = JSON.parse(await AsyncStorage.getItem('products'));
        const sum = products.reduce((partialSum, a) => partialSum + a.price, 0);
        setTotal(sum)
        setProducts(products)
        setLoading(false)

    }
    const confirmProduct = async (id) => {

        let productsFiltered = products.filter(e => e.id != id)
        setAttribute('products', productsFiltered)
        await AsyncStorage.setItem('products', JSON.stringify(productsFiltered))
        getProductsCart()
    }

    return (
        <LayoutV5 white={true}>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={6} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'20px'} textTransform={'uppercase'}>Carrito de compras</Text>
                    <ScrollView
                        mt={2}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.primary}
                                refreshing={loading}
                                onRefresh={getProductsCart}
                            />
                        }>
                        <View mx={6} mb={4}>
                            {
                              products.length>0 && products.map((product, index) => {
                                    return (
                                        <ProductsCartItems navigation={navigation} product={product} mb={5} onConfirm={confirmProduct} />
                                    );
                                })
                            }
                            {
                               products.length === 0 &&
                               <View mt={'100px'} justifyContent={'center'} alignItems={'center'}>

                                <Image source={iconEmptyCart} style={{width: 100, height: 100}}></Image>
                               <Text  textAlign={'center'} mt={4} mb={1} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'md'}>Tú carrito está vacío</Text>
                            </View>
                            }
                        </View>
                        { products.length>0 &&
                            <>
                        <View my={6} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <View justifyContent={'space-around'} alignItems={'center'} flexDirection={'column'} background={Colors.gray} width={'75%'} borderRadius={'full'} height={'55px'}>
                                <Text textAlign={'center'} mt={1} mb={1} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'14px'}>SUBTOTAL ({products.length>1? products.length+' PRODUCTOS' : products.length+' PRODUCTO'})</Text>
                                <Text textAlign={'center'} mt={1} mb={1} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'20px'}>$ {total.toLocaleString('en-US')}.00 M.N.</Text>
                            </View>
                        </View>
                        <View my={6} justifyContent={'center'} alignItems={'center'} mx={8} mb={5}>

                            <Button width={'100%'} py={3} onPress={() => navigation.navigate('PaymentConfirmationScreen')} borderRadius={50} background={Colors.primary} _pressed={{ backgroundColor: Colors.lightGray }} _text={{ fontSize: 18, fontFamily: 'titleConfortaaRegular', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Proceder a pagar</Button>
                        </View>
                        </>
                        }
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

export default connect(mapState, { setAttribute })(ProductsCartScreen)
