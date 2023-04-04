import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View, Image, Select, ChevronDownIcon, ChevronUpIcon } from "native-base";
import { Colors } from "../Colors";
import StoreItem from "./StoreItem";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _, { set } from 'lodash';
import { errorCapture } from "../utils";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getAllProductsCategories } from "../api/Requests";


const StoreScreen = ({ navigation, appDuck }) => {

    const [loading, setLoading] = useState(null);
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [categorySelected, setCategorySelected] = useState('Todas las categorías')
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState([])


useEffect(() => {
    if (isFocused) {
        getProductsCategories()
        setFilter('')
        setCategorySelected()
        scrollViewRef.current?.scrollTo(0, 0, true);
        setCategorySelected('Todas las categorías')
    }
}, [isFocused]);
   
useEffect(() => {
    getProductsCategories()
}, []);
   
    const getProducts = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    const getProductsCategories = async() =>{
        try {
            const response = await getAllProductsCategories()
            if(response.status=== 200){
                setCategories(response.data.items)
            }

        } catch (error) {
            alert(error)
        }
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
                            {
                            categories.map((category, index) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => 
                                    setCategorySelected(category.name)
                                    }>
                                    <View ml={2} flexDirection={'row'} alignItems={'center'}>
                                        <View borderWidth={categorySelected === category.name ? 1.5 : 0} borderColor={Colors.green} alignItems={'center'} justifyContent={'center'} height={'40px'} width={'40px'} borderRadius={'full'} bg={'#fff'}>
                                            <Image mx={2} source={{uri: category.fileUrl}} alt={category.name+index} style={{ width: 28, height: 28 }}></Image>
                                        </View>
                                        <Text textAlign={'center'} color={categorySelected === category.name ? Colors.green : '#5F5F5F'} fontFamily={categorySelected === category.name ? 'titleComfortaaBold' : 'titleConfortaaRegular'} mx={2} fontSize={'sm'}>{category.name}</Text>
                                    </View>
                                </TouchableOpacity> 
                            );
                        })
                            }
                        </ScrollView>
                    </View>
                    <ScrollView
                        mt={2}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getProducts}
                            />
                        }>
                    <View justifyContent={'space-between'} mt={6} mx={4} flexDirection={'row'}>
                        <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} mx={2} fontSize={'lg'}>{categorySelected}</Text>
                        <Select
                            width={'120px'}
                            fontSize={12}
                            height={8}
                            selectedValue={filter}
                            dropdownIcon={<ChevronDownIcon style={{ marginLeft: 0, marginRight: 5 }} />}
                            dropdownOpenIcon={<ChevronUpIcon style={{ marginLeft: 0, marginRight: 5 }} />}
                            placeholder={'Ordenar por'}
                            placeholderTextColor={Colors.green}
                            onValueChange={itemValue => { setFilter(itemValue) }}
                            style={{ width: '100%', fontFamily:'titleConfortaaRegular'}}
                        >
                            <Select.Item label={'Más reciente'} value={'recently'} />
                            <Select.Item label={'Más vendido'} value={'bestSellers'} />
                        </Select>
                    </View>
                    <View mx={5} mt={2} mb={6} alignItems={'center'}>
                        <View background={Colors.yellow} height={'3px'} width={'95%'}>
                        </View>
                    </View>
                        <View mx={8}>
                            <StoreItem navigation={navigation} image={'coin'} title={'Puntos para invitados'} mb={5} />
                            <StoreItem navigation={navigation} image={'boll'}  title={'Bola de golf'} mb={5} price={600} />
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