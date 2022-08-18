import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import InvoicingItem from "./InvoicingItem";

const InvoicingScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Facturación</Text>
                <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Estatus: al corriente</Text>

                <InvoicingItem mb={4}/>
                <InvoicingItem mb={4}/>
                <InvoicingItem mb={4}/>
                <InvoicingItem mb={4}/>
                <InvoicingItem mb={4}/>
                <InvoicingItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default InvoicingScreen;