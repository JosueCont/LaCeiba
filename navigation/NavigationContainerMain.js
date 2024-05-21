import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigatorSecurity from "./StackNavigatorSecurity";
import {Colors} from "../Colors";
import {Spinner, View, Text} from "native-base";
import DrawerConfig from "./DrawerConfig";
import { connect } from "react-redux";
import { getAllNotifications } from "../api/Requests";
import { setAttribute } from '../redux/ducks/navigationDuck';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants  from 'expo-constants';
import AuthStack from './laceiba/AuthStack';
import LoggedStack from './laceiba/LoggedStack';
import { injectStore } from '../api/AxiosInstance';
import store from '../redux/store';
import ModalInfo from '../screens/Modals/ModalInfo';
import { loggedOutAction, onSetModalExpired } from '../redux/ducks/appDuck';
import { useDispatch } from 'react-redux';

const NavigatorContainerMain = ({appDuck,setAttribute}) => {
    const dispatch = useDispatch()
    //const focused = useIsFocused()
    const status = useSelector(state => state.appDuck.logged);
    const [loading, setLoading] = useState(null)
    const expiredSession = useSelector(state => state.appDuck.modalExpired)

    useEffect(() => {
        console.log('app', Constants.expoConfig.slug)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 100)
        //setInterval(()=>{
            getNotifications() 
        //},10000)
    }, [status]);


    const getNotifications = async () => {
        const logged = await AsyncStorage.getItem('logged') || null
        const isLogged =  JSON.parse(logged) || null
        if(isLogged){
                const queryString = `&userId=${appDuck?.user?.id}`//&isRead=false;
                const response = await getAllNotifications(queryString);
                console.log('nofigcaciones noleidas navigationCotainer',response?.data?.items?.filter(item => !item?.isRead).length )

                if(response?.data?.items?.filter(item => !item?.isRead).length > 0){
                    console.log('si hubo notificaciones')
                    setAttribute('notificationExist', true)
                }else{
                    setAttribute('notificationExist', false)
                }
                //if(response?.data?.items?.length>0){
                //    setAttribute('notificationExist', true)
                //}else{
                //    setAttribute('notificationExist', false)
                //}    
        }
    }


    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={Colors.bgPrimaryText}></Spinner>
                    </View> : //Constants.expoConfig.slug === 'laceiba' ? status ? <LoggedStack /> : <AuthStack /> :
                    status ? <DrawerConfig/> : <StackNavigatorSecurity/>
            }
            <ModalInfo 
                visible={expiredSession}
                close={false}
                setVisible={() => {
                    dispatch(onSetModalExpired(false))
                    dispatch(loggedOutAction())
                }}
                text='Sesión no encontrada'
            />
        </NavigationContainer>
    );
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState,{setAttribute})(NavigatorContainerMain)


