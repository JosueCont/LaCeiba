import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../../Colors";
import {TouchableOpacity} from "react-native";
import iconEdit from "../../assets/iconEdit.png";
import iconTrash from "../../assets/iconTrash.png";

const RegistryTableHead = ()=>{
    return (
        <View flexDirection={'row'} height={33} justifyContent={'center'} alignItems={'center'} bgColor={Colors.greenV2} color={'white'} borderRadius={50} mb={1}
              style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation:3
              }}>
            <View flex={1} flexDirection={'column'} px={1} justifyItems={'center'}>
                <Text numberOfLines={1} fontSize={'12'} textAlign={'center'}>Nombre</Text>
            </View>
            <View flex={1} flexDirection={'column'} px={1} justifyItems={'center'}>
                <Text numberOfLines={1} fontSize={'12'} textAlign={'center'}>Resultado</Text>
            </View>
            <View flex={1} flexDirection={'column'} px={1} justifyItems={'center'}>
                <Text numberOfLines={1} fontSize={'12'} textAlign={'center'}>Puntos</Text>
            </View>
            <View flex={.6} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} height={'60%'} alignSelf={'center'}>
               <Text>&nbsp;</Text>
            </View>
        </View>
    )
}

export default RegistryTableHead