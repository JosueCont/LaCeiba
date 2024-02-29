import React from "react";
import { Text, View } from "native-base";
import { Colors } from "../Colors";


const PartnerItem = ({ navigation, mb = 2, item }) => {

    return (
        <View height={55} alignItems={'center'} justifyContent={'center'} bgColor={'#fff'} borderRadius={50} mb={mb}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3
            }}>
            <View flexDirection={'row'} px={2} alignItems={'center'} justifyContent={'space-between'}>
                <Text numberOfLines={2} width={'33%'} textAlign={'center'} color={Colors.primary} textTransform={'capitalize'} fontSize={'15'} fontFamily={'titleComfortaaBold'}>{`${item.count} ${item.name}`}</Text>
                <Text numberOfLines={1} width={'33%'} textAlign={'center'} color={Colors.primary} fontSize={'15'} fontFamily={'titleComfortaaBold'}>{item.date}</Text>
                <Text numberOfLines={1} width={'26%'} textAlign={'center'} color={Colors.primary} fontSize={'15'} fontFamily={'titleComfortaaBold'}>{item.price}</Text>
            </View>
        </View>
    )
}


export default PartnerItem; 