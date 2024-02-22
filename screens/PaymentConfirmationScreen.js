import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Icon, Text, View} from "native-base";
import React from "react";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import {connect} from "react-redux";


const PaymentConfirmationScreen = ({navigation}) => {
    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8} pt={10}>

                <View flex={1}>
                    <View mt={15} mb={10} alignItems={'center'}>
                        <Icon as={AntDesign} name={'checkcircleo'} color={Colors.secondary} size={'100px'}/>
                    </View>

                    <Text mb={5} textAlign={'center'} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'3xl'}>¡PAGO EXITOSO!</Text>
                    

                    <Text my={5} mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleRegular'} fontSize={'2xl'}>Hemos agregado a su cuenta el producto</Text>
                    

                    <Text my={5} mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'2xl'}>10 Puntos para invitados</Text>

                    <Text my={5} mb={1} textAlign={'center'} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>FOLIO DE LA COMPRA:</Text>

                    <Text mb={2} textAlign={'center'} color={Colors.primary} fontFamily={'titleBrandonBldBold'} fontSize={'xl'}>SX99976</Text>

                    <Button my={6} onPress={() => navigation.navigate('HomeScreen')}>Aceptar</Button>
                </View>

            </View>

        </LayoutV4>
    )
}


export default PaymentConfirmationScreen;