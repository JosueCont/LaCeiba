import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Spinner, View} from 'native-base';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import StackNavigatorMain from "./StackNavigatorMain";

const NavigatorContainerMain = () => {
    const status = useSelector(state => state.appDuck.logged);
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, []);

    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={'#000'} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={'white'}></Spinner>
                    </View> :
                    status === true ? <StackNavigatorMain/> : <StackNavigatorSecurity/>
            }
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {}
});

export default NavigatorContainerMain;