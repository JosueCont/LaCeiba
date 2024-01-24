import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import {Colors} from "../Colors";
import {Spinner, View} from "native-base";
import DrawerConfig from "./DrawerConfig";
import { connect } from "react-redux";
import { getAllNotifications } from "../api/Requests";
import { setAttribute } from '../redux/ducks/navigationDuck';
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavigatorContainerMain = ({appDuck,setAttribute}) => {
    const status = useSelector(state => {
        return state.appDuck.logged;
    });
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
        setInterval(()=>{
            getNotifications() 
        },10000)
    }, [status]);

    const getNotifications = async () => {
        const logged = await AsyncStorage.getItem('logged') || null
        const isLogged =  JSON.parse(logged) || null
        if(isLogged){
                const queryString = `?userId=${appDuck?.user?.id}&isRead=false`;
                const response = await getAllNotifications(queryString);
                if(response?.data?.items?.length>0){
                    setAttribute('notificationExist', true)
                }else{
                    setAttribute('notificationExist', false)
                }    
        }
    }


    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={Colors.bgPrimaryText}></Spinner>
                    </View> :
                    status === true ? <DrawerConfig/> : <StackNavigatorSecurity/>
            }
        </NavigationContainer>
    );
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState,{setAttribute})(NavigatorContainerMain)


