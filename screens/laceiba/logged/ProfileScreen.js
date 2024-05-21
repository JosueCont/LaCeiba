import React, {useEffect, useState} from "react";
import { StyleSheet, Dimensions, TouchableOpacity,  View, Text } from "react-native";
import ModalAsk from "../../Modals/ModalAsk";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute, } from "../../../redux/ducks/navigationDuck";
import { loggedOutAction } from "../../../redux/ducks/appDuck";
import { getProfile, logOut } from "../../../api/Requests";
import UserCard from "../../../components/laceiba/Profile/UserCard";
import { getConfig } from "../../../api/Requests";
import HeaderBooking from "../../../components/laceiba/Headers/HeaderBooking";
import moment from "moment";
import { ColorsCeiba } from "../../../Colors";

const {height, width} = Dimensions.get('window');

const ProfileScreen = () => {
    const [modalSessionVisible, setModalSessionVisible] = useState(null);
    const dispatch = useDispatch()
    const appDuck = useSelector(state => state.appDuck)
    const [imageLogo, setImageLogo] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.appDuck.user)
    const [dataUser, setDataUser] = useState(null)


    useEffect(() => {
        getData()
    },[])

    const loggedOut = async() => {

        //const {pushToken} = appDuck.user
        try {
            console.log('cerrando sesion', appDuck)
            dispatch(setAttribute('notificationExist', false))
            const response = await logOut('', [user?.pushToken || ''])
            console.log('cerrando',response.data)
            dispatch(loggedOutAction())
        } catch (e) {
            console.log(JSON.stringify(e))
            dispatch(loggedOutAction())
            // alert(JSON.stringify(e))
        }    
    }

    const getData = async() => {
        try {
            setLoading(true)
            Promise.all([
                getConfiguration(),
                getDataProfile()
            ])
        } catch (e) {
            console.log('error',e)
        }finally {
            setLoading(false)
        }
    }

    const getDataProfile = async() => {
        try {
            const response = await getProfile('',[user?.id])
            console.log('prof', response?.data, 'user',user)
            setDataUser(response?.data)
        } catch (e) {
            console.log('error prof',e)
        }
    }

    const getConfiguration = async()=>{
        try{
            //setRefreshingLogo(true)
            const response =  await getConfig()
            console.log('cnfug', response?.data)
            setImageLogo(response.data.logoBase64)
        }catch(e){
            console.log(e)
        } finally {
            //setRefreshingLogo(false)
        }
    }

    return(
        <HeaderBooking showFilters={false} >
            <View style={{alignItems:'center'}}>
                <UserCard logo={imageLogo} user={dataUser} imgUser={user?.partner?.profilePictureUrl}/>
                <View style={{marginVertical:15}}>
                    <Text>Miembro desde {moment(dataUser?.createdAt).format('YYYY')}</Text>
                </View>
                <TouchableOpacity style={styles.btnAdd}>
                    <Text>Agregar a Apple Wallet</Text>
                </TouchableOpacity>

            </View>
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
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    btnAdd:{
        width: width * .7,
        height:30, 
        backgroundColor: ColorsCeiba.darkGray
    }
})

export default ProfileScreen;