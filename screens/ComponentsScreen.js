import React from "react";
import {Button, View} from "native-base";
import Layout from "./Layouts/Layout";

const ComponentsScreen = ({navigation}) => {


    return (
        <Layout overlay={true}>
            <View flex={1} justifyContent={'center'} mx={10}>
                <Button onPress={() => navigation.navigate('VerifyAccountScreen')}>Verificar cuenta</Button>
            </View>

        </Layout>
    )
}


export default ComponentsScreen