import React from "react";
import { Button, Image, Text, View } from "native-base";
import { Colors } from "../Colors";
import { MaterialIcons } from "@expo/vector-icons";
import coins from '../assets/coins.png'
import { TouchableOpacity } from "react-native";

const StoreItem = ({ navigation, mb = 2 }) => {

    return (
        <View position={'relative'} flexDirection={'row'} height={150} justifyContent={'center'} alignItems={'flex-start'} bgColor={'#768491'} borderRadius={10} mb={mb}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3
            }}>
            <View mr={4} flex={.7} justifyContent={'center'} alignItems={'center'} pt={2}>
                <Image source={coins} style={{ width: 80, height: 80 }}></Image>
            </View>
            <View flex={1} flexDirection={'column'} pr={1} pt={6}>
                <Text numberOfLines={2} color={'#fff'} fontSize={'18'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>Puntos para invitados</Text>
            </View>
            <View flexDirection={'row'} paddingX={4} alignItems={'center'} justifyContent={'space-between'} width={'100%'} position={'absolute'} height={12} top={'102px'} bgColor={Colors.green} borderRadius={10}>
                <Text numberOfLines={2} color={Colors.yellow} fontSize={'16'} justifyItems={'center'} fontFamily={'titleComfortaaBold'}>$1,500.00 M.N.</Text>
                <View>
                    <Button onPress={() => navigation.navigate('StoreItemDetail')} borderRadius={10} width={100} p={1} bg={'#fff'} _pressed={{ backgroundColor: '#d1d1d1' }} _text={{ color: Colors.green, fontFamily: 'titleComfortaaBold' }}>Comprar</Button>
                </View>
            </View>
        </View>
    )
}


export default StoreItem; 