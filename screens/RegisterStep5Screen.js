import React from "react";
import {Button, Input, Text, View} from "native-base";
import Layout from "./Layouts/Layout";

const RegisterStep5Screen = ({navigation}) => {


    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text textAlign={'center'} mb={2}>Correo electrónico</Text>
                    <Input mb={4}/>
                    <Text textAlign={'center'} mb={2}>Contraseña</Text>
                    <Input mb={6}/>
                    <Text textAlign={'center'} mb={2}>Repetir contraseña</Text>
                    <Input mb={6}/>
                    <Button onPress={() => navigation.navigate('')}>Continuar</Button>
                </View>
            </View>
        </Layout>
    )
}


export default RegisterStep5Screen