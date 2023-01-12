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

const NavigatorContainerMain = ({appDuck,setAttribute}) => {
    const [notifications, setNotifications] = useState([]);
    const [readAllNotifications, setReadAllNotifications] = useState(false)
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

    useEffect(() => {
        setInterval(()=>{
            getNotifications() 
        },10000)
    }, []);

    const getNotifications = async () => {
        try {
            const queryString = `?userId=${appDuck.id}&isRead=false`;
            const response = await getAllNotifications(queryString);
            setNotifications(response?.data?.items);
            if(response.data.items.length > 0){
                setAttribute('notificationExist', true)
            }else{
                setAttribute('notificationExist', false)
            }
            
        } catch (error) {
            console.log(error?.data);
        }
    }


    return (
        <NavigationContainer>
            {
                loading ?
                    <View flex={1} backgroundColor={Colors.green} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={'white'}></Spinner>
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


