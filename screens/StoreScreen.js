import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View, Image, Select, ChevronDownIcon, ChevronUpIcon } from "native-base";
import { Colors } from "../Colors";
import StoreItem from "./StoreItem";
import { RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _, { set } from 'lodash';
import { errorCapture } from "../utils";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import coinIcon from '../assets/coinIcon.png'
import golfBall from '../assets/golfBall.png'
import golfCart from '../assets/golfCart.png'
import allCategories from '../assets/allCategories.png'



const StoreScreen = ({ navigation, appDuck }) => {

    const [loading, setLoading] = useState(null);
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [category, setCategory] = useState(null)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        setCategory('Todas las categorías')
        setFilter('')
    }, [])
useEffect(() => {
    if (isFocused) {
        setCategory('Todas las categorías')
        setFilter('')
        scrollViewRef.current?.scrollTo(0, 0, true);
    }
}, [isFocused]);
    useFocusEffect(
        React.useCallback(() => {
        }, [])
    );

    const getProducts = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    return (
        <LayoutV5 white={true}>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={6} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'20px'} textTransform={'uppercase'}>Tienda de productos</Text>
                    <View justifyContent={'center'} alignItems={'center'} background={Colors.greenLight} height={'70px'} style={{ flexDirection: 'row' }}>
                        <ScrollView ref={scrollViewRef}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                             <TouchableOpacity activeOpacity={0.8} onPress={() => 
                                setCategory('Todas las categorías')
                                }>
                                <View ml={2} flexDirection={'row'} alignItems={'center'}>
                                    <View borderWidth={category === 'Todas las categorías' ? 1.5 : 0} borderColor={Colors.green} alignItems={'center'} justifyContent={'center'} height={'40px'} width={'40px'} borderRadius={'full'} bg={'#fff'}>
                                        <Image mx={2} source={allCategories} style={{ width: 28, height: 28 }}></Image>
                                    </View>
                                    <Text textAlign={'center'} color={category === 'Todas las categorías' ? Colors.green : '#5F5F5F'} fontFamily={category === 'Todas las categorías' ? 'titleComfortaaBold' : 'titleConfortaaRegular'} mx={2} fontSize={'sm'}>Todas las categorías</Text>
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity activeOpacity={0.8} onPress={() => 
                                setCategory('Puntos')
                                }>
                                <View ml={2} flexDirection={'row'} alignItems={'center'}>
                                    <View borderWidth={category === 'Puntos' ? 1.5 : 0} borderColor={Colors.green} alignItems={'center'} justifyContent={'center'}  height={'40px'} width={'40px'} borderRadius={'full'} bg={'#fff'}>
                                        <Image mx={2} source={coinIcon} style={{ width: 28, height: 28 }}></Image>
                                    </View>
                                    <Text textAlign={'center'} color={category === 'Puntos' ? Colors.green : '#5F5F5F'} fontFamily={category === 'Puntos' ? 'titleComfortaaBold' : 'titleConfortaaRegular'} mx={2} fontSize={'sm'}>Puntos</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => 
                                setCategory('Accesorios')
                                }>
                                <View ml={2} flexDirection={'row'} alignItems={'center'}>
                                    <View borderWidth={category === 'Accesorios' ? 1.5 : 0} borderColor={Colors.green} alignItems={'center'} justifyContent={'center'}  height={'40px'} width={'40px'} borderRadius={'full'} bg={'#fff'}>
                                        <Image mx={2} source={golfBall} style={{ width: 28, height: 28 }}></Image>
                                    </View>
                                    <Text textAlign={'center'} color={category === 'Accesorios' ? Colors.green : '#5F5F5F'} fontFamily={category === 'Accesorios' ? 'titleComfortaaBold' : 'titleConfortaaRegular'} mx={2} fontSize={'sm'}>Accesorios</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => 
                                setCategory('Equipo Deportivo')
                                }>
                                <View ml={2} flexDirection={'row'} alignItems={'center'}>
                                    <View borderWidth={category === 'Equipo Deportivo' ? 1.5 : 0} borderColor={Colors.green} alignItems={'center'} justifyContent={'center'} height={'40px'} width={'40px'} borderRadius={'full'} bg={'#fff'}>
                                        <Image mx={2} source={golfCart} style={{ width: 28, height: 28 }}></Image>
                                    </View>
                                    <Text textAlign={'center'} color={category === 'Equipo Deportivo' ? Colors.green : '#5F5F5F'} fontFamily={category === 'Equipo Deportivo' ? 'titleComfortaaBold' : 'titleConfortaaRegular'} mx={2} fontSize={'sm'}>Equipo deportivo</Text>
                                </View>
                            </TouchableOpacity>           
                        </ScrollView>
                    </View>
                    <View justifyContent={'space-between'} mt={8} mx={4} flexDirection={'row'}>
                        <Text textAlign={'center'} color={Colors.green} fontFamily={'titleComfortaaBold'} mx={2} fontSize={'lg'}>{category}</Text>
                        <Select
                            width={'120px'}
                            fontSize={13}
                            height={8}
                            selectedValue={filter}
                            dropdownIcon={<ChevronDownIcon style={{ marginLeft: 0, marginRight: 5 }} />}
                            dropdownOpenIcon={<ChevronUpIcon style={{ marginLeft: 0, marginRight: 5 }} />}
                            placeholder={'Ordenar por'}
                            placeholderTextColor={Colors.green}
                            onValueChange={itemValue => { setFilter(itemValue) }}
                            style={{ width: '100%' }}
                        >
                            <Select.Item label={'Más reciente'} value={'recently'} />
                            <Select.Item label={'Más vendido'} value={'bestSellers'} />
                        </Select>
                    </View>
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
                            <StoreItem navigation={navigation} image={'coin'} title={'Puntos para invitados'} mb={5} />
                            <StoreItem navigation={navigation} image={'boll'}  title={'Bola de golf'} mb={5} price={'$ 600.00'} />
                            <StoreItem navigation={navigation} image={'shirt'} title={'Playera Polo'} mb={5} />
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

export default connect(mapState)(StoreScreen)