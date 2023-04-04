import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View, Image, Select, ChevronDownIcon, ChevronUpIcon, Button } from "native-base";
import { Colors } from "../Colors";
import ProductsCartItems from "./ProductsCartItems";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _, { set } from 'lodash';
import { errorCapture } from "../utils";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getAllProductsCategories } from "../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAttribute } from '../redux/ducks/navigationDuck';

const ProductsCartScreen = ({ navigation, setAttribute }) => {

    const [loading, setLoading] = useState(null);
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [products, setProducts] = useState([])


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

                    <Text textAlign={'center'} mt={8} mb={6} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'20px'} textTransform={'uppercase'}>Carrito de compras</Text>
                    <ScrollView
                        mt={2}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getProductsCart}
                            />
                        }>
                        <View mx={6} mb={4}>
                            {
                                products.map((product, index) => {
                                    return (
                                        <ProductsCartItems navigation={navigation} image={product.image} id={product.id} title={product.name} mb={5} onConfirm={confirmProduct} />
                                    );
                                })
                            }
                        </View>
                        <View my={6} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <View justifyContent={'space-around'} alignItems={'center'} flexDirection={'column'} background={Colors.greenLight} width={'75%'} borderRadius={'full'} height={'55px'}>
                                <Text textAlign={'center'} mt={1} mb={1} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'14px'}>SUBTOTAL (2 PRODUCTOS)</Text>
                                <Text textAlign={'center'} mt={1} mb={1} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'20px'}>$ 3,000.00 M.N.</Text>
                            </View>
                        </View>
                        <View my={6} justifyContent={'center'} alignItems={'center'} mx={8} mb={5}>

                            <Button width={'100%'} py={3} onPress={() => navigation.navigate('PaymentConfirmationScreen')} borderRadius={50} background={Colors.green} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: 'white', fontSize: 18, fontFamily: 'titleConfortaaRegular', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Proceder a pagar</Button>
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

export default connect(mapState, { setAttribute })(ProductsCartScreen)
