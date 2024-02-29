import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../../Colors";
import {TouchableOpacity} from "react-native";
import iconEdit from '../../assets/iconEdit.png'
import iconTrash from "../../assets/iconTrash.png";
import moment from "moment";
const scoreStatus = {
    "WON": "Ganó",
    "LOST": "Perdió",
    "DRAW": "Empató"
}

const RegistryTableItem = ({item, onDelete, onEdit, isSelected = false, disableActions = false})=>{
    return (
        <View
              style={{
                borderColor: Colors.lightGray,
                borderWidth: 1,
                  borderBottomColor: Colors.secondary,
                  borderBottomWidth: 1.5,
                  backgroundColor: isSelected ? Colors.secondary : 'white'
              }}>
                  <View flexDirection={'column'} px={1} py={2} alignItems={'center'} backgroundColor={Colors.lightGray}>
                      <Text numberOfLines={1} fontSize={'12'} fontWeight={'bold'} color={Colors.primary}>{moment(item.date).format('LL')}</Text>
                  </View>
                <View flexDirection={'row'} px={1} py={2} justifyContent={'center'} alignItems={'center'}>
                    <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                        <Text numberOfLines={2} fontSize={'12'} color={Colors.primary}>{item.playerName}</Text>
                    </View>
                    <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                        <Text numberOfLines={1} fontSize={'12'} color={Colors.primary}>{scoreStatus[item.status]}</Text>
                    </View>
                    <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                        <Text numberOfLines={1}fontSize={'12'} color={Colors.primary}>{item.points}</Text>
                    </View>
                    <View flex={.6} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} alignSelf={'center'}>
                        <TouchableOpacity disabled={disableActions} onPress={()=>onEdit(item)}>
                            <View flex={0.5} justifyContent={'center'} alignItems={'flex-end'}>
                                <Image source={iconEdit} style={{width: 25, height: 25, opacity:(disableActions?0.5:1)}}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={disableActions}  onPress={()=>onDelete(item)}>
                            <View flex={0.5} justifyContent={'center'} alignItems={'center'}>
                                <Image source={iconTrash} style={{width: 25, height: 25, opacity:(disableActions?0.5:1)}}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
    )
}

export default RegistryTableItem