import React, {useEffect} from "react";
import {Button, Image, View} from "native-base";
import {connect} from "react-redux";
import {ImageBackground} from "react-native";
import bgGolfV2 from '../assets/bgGolfV2.png'
import imgLogo from '../assets/imgLogo.png';
import Constants from 'expo-constants';

const HomeScreen = ({productsDuck}) => {

    useEffect(() => {
        console.log(productsDuck)
    }, [])

    return (

        <ImageBackground source={bgGolfV2} style={{flex: 1}}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1} mx={20}>
                <Button mb={2}>Iniciar sesión</Button>
                <Button mb={2}>Registrar</Button>
                {
                    Constants.manifest.extra.debug === true &&
                    <Button>Componentes</Button>

                }
            </View>
        </ImageBackground>

    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);