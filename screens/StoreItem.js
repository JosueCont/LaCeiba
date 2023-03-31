import React from "react";
import { Button, Image, Text, View } from "native-base";
import { Colors } from "../Colors";
import { MaterialIcons } from "@expo/vector-icons";
import coins from '../assets/coins.png'
import shirt from '../assets/shirtPolo.png'
import bolls from '../assets/bollsGolf.png'
import { TouchableOpacity } from "react-native";

const StoreItem = ({ navigation, mb = 2, image='', title='', price='$ 1,500.00' }) => {

    return (
        <View position={'relative'} flexDirection={'row'} height={176} justifyContent={'center'} alignItems={'flex-start'} borderRadius={20} mb={mb}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3
            }}>
                <Image borderRadius={20} source={image=== 'coin' ? coins : image==='shirt' ? shirt : image==='boll' ? bolls : coins } style={{ width: '100%', height: '100%' }}></Image>
            <View flexDirection={'row'} paddingX={4} alignItems={'center'} justifyContent={'space-between'} width={'100%'} position={'absolute'} height={'60px'} top={'116px'} bgColor={Colors.green} borderBottomRadius={20}>
                <View flexDirection={'column'}>
                <Text color={Colors.yellow} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>{title}</Text>
                <Text color={'white'} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>{price}</Text>
                </View>
                <View>
                    <Button onPress={() => navigation.navigate('StoreItemDetail')} borderRadius={10} width={100} p={1} bg={'#fff'} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: Colors.green, fontFamily: 'titleComfortaaBold' }}>Comprar</Button>
                </View>
            </View>
        </View>
    )
}


export default StoreItem; 