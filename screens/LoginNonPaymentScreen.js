import React from "react";
import {Button, Icon, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../Colors";

const LoginNonPaymentScreen = ({navigation}) => {


    return (
        <Layout overlay={true}>
            <View flex={0.2} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <View alignItems={'center'}>
                        <Icon as={AntDesign} name={'exclamationcircleo'} color={Colors.secondary} size={'2xl'}/>

                    </View>

                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Lo sentimos</Text>
                    <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={Colors.secondary} mb={8}/>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>
                        Usted presenta un adeudo, algunos servicios de la app no estarán disponibles.
                        {'\n'}
                        {'\n'}Lo invitamos a contactar a la administración y ponerse al día con sus pagos.
                    </Text>
                    <Button mb={2}>Contactar</Button>
                    <Button>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default LoginNonPaymentScreen