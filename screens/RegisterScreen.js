import React from "react";
import {Button, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterScreen = ({navigation}) => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Registrar</Text>
                    <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={'#FFB718'} mb={8}/>
                    <Text textAlign={'center'} mb={2}>Número de acción</Text>
                    <Input mb={4}/>
                    <Text textAlign={'center'} mb={2}>Nombre de socio</Text>
                    <Input mb={6}/>
                    <Button onPress={() => navigation.navigate('RegisterStep2Screen')}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterScreen