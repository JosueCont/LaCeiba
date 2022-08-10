import React from "react";
import {Button, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterStep3Screen = ({navigation}) => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={8}>Verificar número móvil</Text>

                    <Text textAlign={'center'} mb={2}>Ingresa tu número móvil</Text>
                    <Input mb={4}/>
                    <Text mb={6} textAlign={'center'} fontSize={'xs'}>Recibirás un SMS con el código de confirmación</Text>


                    <Button onPress={() => navigation.navigate('RegisterStep4Screen')}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep3Screen