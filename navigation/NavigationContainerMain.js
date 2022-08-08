import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Spinner, View} from 'native-base';
import {connect} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import StackNavigatorMain from "./StackNavigatorMain";

const NavigatorContainerMain = (appDuck) => {
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, []);

    console.log(appDuck.appDuck.logged)


    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={'#000'} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={'white'}></Spinner>
                    </View> :
                    appDuck.appDuck.logged === true ? <StackNavigatorMain/> : <StackNavigatorSecurity/>
            }
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {}
});
const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(NavigatorContainerMain);