import React, {useEffect, useState} from 'react';
import {Spinner, View} from 'native-base';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import StackNavigatorMain from "./StackNavigatorMain";
import {Colors} from "../Colors";

const NavigatorContainerMain = () => {
    const status = useSelector(state => {
        return state.appDuck.logged;
    });
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [status]);

    console.log(status)


    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={Colors.green} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={'white'}></Spinner>
                    </View> :
                    status === true ? <StackNavigatorMain/> : <StackNavigatorSecurity/>
            }
        </NavigationContainer>
    );
}


export default NavigatorContainerMain;