import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../../Colors";
import {TouchableOpacity} from "react-native";
import iconEdit from "../../assets/iconEdit.png";
import iconTrash from "../../assets/iconTrash.png";

const RegistryTableItem = ({item, onDelete, onEdit, isSelected = false})=>{
    return (
        <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'} paddingY={3}
              style={{
                  borderBottomColor: Colors.yellow,
                  borderBottomWidth: 1.5,
                  backgroundColor: isSelected ? Colors.yellow : 'white'
              }}>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <Text numberOfLines={1} fontSize={'12'} color={Colors.greenV2}>{item.date}</Text>
            </View>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <Text numberOfLines={2} fontSize={'12'} color={Colors.greenV2}>{item.playerName}</Text>
            </View>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <Text numberOfLines={1} fontSize={'12'} color={Colors.greenV2}>{item.status === 'WON' ? 'Ganó' : 'Perdió'}</Text>
            </View>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <Text numberOfLines={1}fontSize={'12'} color={Colors.greenV2}>{item.points}</Text>
            </View>
            <View flex={.5} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} alignSelf={'center'}>
                {/*<TouchableOpacity onPress={()=>onEdit(item)}>
                    <View flex={0.5} justifyContent={'center'} alignItems={'flex-end'}>
                        <Image source={iconEdit} style={{width: 25, height: 25}}></Image>
                    </View>
                </TouchableOpacity>*/}
                <TouchableOpacity  onPress={()=>onDelete(item)}>
                    <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                        <Image source={iconTrash} style={{width: 25, height: 25}}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegistryTableItem