import React, {useEffect, useState} from "react";
import { View, Text } from "native-base";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ModalAsk from "../../Modals/ModalAsk";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute, } from "../../../redux/ducks/navigationDuck";
import { loggedOutAction } from "../../../redux/ducks/appDuck";
import { logOut } from "../../../api/Requests";

const ProfileScreen = () => {
    const [modalSessionVisible, setModalSessionVisible] = useState(null);
    const dispatch = useDispatch()
    const appDuck = useSelector(state => state.appDuck)

    const loggedOut = async() => {

        //const {pushToken} = appDuck.user
        try {
            console.log('cerrando sesion', appDuck)
            dispatch(setAttribute('notificationExist', false))
            const response = await logOut('', [appDuck?.user?.pushToken || ''])
            console.log('cerrando',response.data)
            dispatch(loggedOutAction())
        } catch (e) {
            console.log(JSON.stringify(e))
            dispatch(loggedOutAction())
            // alert(JSON.stringify(e))
        }    
    }
    return(
        <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
            <TouchableOpacity onPress={() => setModalSessionVisible(true) }>
                <Text color={'black'}>Cerrar sesion</Text>

            </TouchableOpacity>
            <ModalAsk 
                visible={modalSessionVisible}
                iconType={'exclamation'}
                textButton={'Sí'}
                text={'¿Deseas cerrar sesión?'}
                action={() => {
                    loggedOut()
                    setModalSessionVisible(false)
                }}
                setVisible={setModalSessionVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ProfileScreen;