import React from "react";
import { Button, Image, Text, View } from "native-base";
import { Colors } from "../Colors";
import { MaterialIcons } from "@expo/vector-icons";
import coins from '../assets/coins.png'
import shirt from '../assets/shirtPolo.png'
import bolls from '../assets/bollsGolf.png'
import 'intl';
import 'intl/locale-data/jsonp/en'; 
const StoreItem = ({ navigation, product='', mb = 2, image='', title='', price=1500 }) => {

    return (
        <View position={'relative'} flexDirection={'row'} height={176} justifyContent={'center'} alignItems={'flex-start'} borderRadius={20} mb={mb}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3
            }}>
                <Image borderRadius={20} source={{uri:product.image}} style={{ width: '100%', height: '100%' }}></Image>
            <View flexDirection={'row'} paddingX={4} alignItems={'center'} justifyContent={'space-between'} width={'100%'} position={'absolute'} height={'60px'} top={'116px'} bgColor={Colors.green} borderBottomRadius={20}>
                <View flexDirection={'column'}>
                <Text color={Colors.yellow} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>{product.name}</Text>
                <Text color={'white'} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>$ {price.toLocaleString('en-US')}.00</Text>
                </View>
                <View>
                    <Button onPress={() => navigation.navigate('StoreItemDetail',{product})} borderRadius={10} width={100} p={1} bg={'#fff'} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: Colors.green, fontFamily: 'titleConfortaaRegular' }}>Ver detalles</Button>
                </View>
            </View>
        </View>
    )
}


export default StoreItem; 