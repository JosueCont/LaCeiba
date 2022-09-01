import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";

const TransactionItem = ({navigation, mb = 2}) => {


    return (
        <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} pl={5}>
                <Text color={Colors.green} fontSize={'xs'}>Restaurante</Text>
            </View>
            <View flex={1} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'xs'}>Comida mariscos</Text>
            </View>
            <View flex={0.4} justifyContent={'center'} pr={5}>
                <Text textAlign={'right'} color={Colors.green} fontSize={'md'} numberOfLines={1} adjustsFontSizeToFit>$120.00 MXN</Text>
            </View>
        </View>
    )
}


export default TransactionItem;