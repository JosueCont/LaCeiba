import React from 'react';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import StackNavigatorMain from "./StackNavigatorMain";

const NavigatorContainerMain = () => {
    const status = useSelector(state => {
        return state.appDuck.logged;
    });


    return (
        <NavigationContainer>
            {
                    status === true ? <StackNavigatorMain/> : <StackNavigatorSecurity/>
            }
        </NavigationContainer>
    );
}


export default NavigatorContainerMain;