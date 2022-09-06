import React from "react";
import {Button, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {connect} from "react-redux";

const RegisterStep2Screen = ({navigation, navigationDuck}) => {


    console.log(navigationDuck)
    const astericks = (w) => {
        return w.substring(0, 1) + '*'.repeat(w.length - 1);
    }

    return (
        <Layout overlay={true}>
            <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
            </View>
            <View flex={1}>
                <View mx={20} mt={10}>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>¿Son éstas sus iniciales?</Text>
                    <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6} numberOfLines={2}>
                        {
                            navigationDuck.user.nombreSocio.split(' ').map((item, index) => {
                                return astericks(navigationDuck.user.nombreSocio.split(' ')[index]) + ' '
                            })

                        }
                    </Text>
                    {/*<Text fontSize={'2xl'} textAlign={'center'} fontFamily={'titleLight'} mb={6}>*/}
                    {/*    {*/}
                    {/*        navigationDuck.user.lastName.split(' ').map((item, index) => {*/}
                    {/*            return astericks(navigationDuck.user.lastName.split(' ')[index]) + ' '*/}
                    {/*        })*/}

                    {/*    }*/}

                    {/*</Text>*/}
                    <Button mb={2} onPress={() => navigation.navigate('RegisterStep3Screen')}>Continuar</Button>
                    <Button onPress={() => navigation.goBack()}>Cancelar</Button>
                </View>
            </View>
        </Layout>
    )
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck
    }
}

export default connect(mapState)(RegisterStep2Screen)