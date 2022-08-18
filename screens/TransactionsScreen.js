import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import TransactionItem from "./TransactionItem";

const TransactionsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Transacciones</Text>

                <TransactionItem mb={4}/>
                <TransactionItem mb={4}/>
                <TransactionItem mb={4}/>
                <TransactionItem mb={4}/>
                <TransactionItem mb={4}/>
                <TransactionItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default TransactionsScreen;