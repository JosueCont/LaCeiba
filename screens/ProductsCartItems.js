import React from "react";
import { Button, Image, Text, View } from "native-base";
import { Colors } from "../Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import coins from '../assets/coins.png'
import shirt from '../assets/shirtPolo.png'
import bolls from '../assets/bollsGolf.png'
import iconTrash from '../assets/iconTrash.png'
import 'intl';
import 'intl/locale-data/jsonp/en';
const ProductsCartItems = ({ navigation, mb = 2, id='', image = '', title = '', price = 1500, onConfirm }) => {

    return (
        <View mx={2} position={'relative'} flexDirection={'row'} height={146} justifyContent={'center'} alignItems={'flex-start'} borderRadius={20} mb={mb}
           >
            <Image borderRadius={20} source={image === 'coin' ? coins : image === 'shirt' ? shirt : image === 'boll' ? bolls : coins} style={{ width: '50%', height: '100%' }}></Image>
            <View flexDirection={'row'} paddingX={2} alignItems={'center'} justifyContent={'space-between'} width={'50%'}>
                <View flexDirection={'column'}>
                    <Text mb={1} numberOfLines={2} color={Colors.green} fontSize={'18px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>{title}</Text>
                    <Text mb={1} color={Colors.green} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>Cantidad: 1</Text>
                    <Text color={Colors.green} fontSize={'18px'} letterSpacing={.4} justifyItems={'center'} fontFamily={'titleBrandonBldBold'}>$ {price.toLocaleString('en-US')}.00 M.N.</Text>
                    <TouchableOpacity  onPress={()=>onConfirm(id)}>
                    <View mt={2} flexDirection={'row'}>
                            <Image source={iconTrash} style={{width: 20, height: 20}}></Image>
                            <Text ml={2} color={Colors.green} fontSize={'14px'} justifyItems={'center'} fontFamily={'titleConfortaaRegular'}>Eliminar</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default ProductsCartItems; 