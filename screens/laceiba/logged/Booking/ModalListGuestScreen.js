import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,  } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation, useIsFocused } from "@react-navigation/native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import ModalAsk from "../../../Modals/ModalAsk";
import { deleteRequestGuest, getListRequestGuests, putAcceptRequestGuest } from "../../../../api/Requests";
import { Spinner } from "native-base";
import ModalInfo from "../../../Modals/ModalInfo";

const {height, width} = Dimensions.get('window');

const ModalListGuestScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const focus = useIsFocused()
    const [modalAccept, setModalAccept] = useState(false)
    const [modalReject, setModalReject] = useState(false)
    const [dataSelect, setData] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [laodingAction, setLoadingAction] = useState(false)
    const [listGuests, setListGuest] = useState([])
    const [modalError, setModalError] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [txtModal, setTxtModal] = useState('')
    const { dataReserve} = route?.params;

    useEffect(() => {
        getGuestsList()
    },[focus])

    useEffect(() => {
        if(update) getGuestsList()
    },[update])

    const getGuestsList = async() => {
        try {
            setLoading(true)
            const response = await getListRequestGuests(`?bookingId=${dataReserve?.id}`)
            setListGuest(response?.data.filter(item => item?.status === 'PENDING'))
            setUpdate(false)
            setLoading(false)
        } catch (e) {
            console.log('error')
        }
    }

    const onAction = async(status) => {
        try {
            setLoadingAction(true)
            let dataSend = {
                "status": status
            }
            const response = await putAcceptRequestGuest(dataSend, [dataSelect?.id])
            setUpdate(true)
            setModalAccept(false)
            setModalReject(false)
            setModalSuccess(true)
            setTxtModal(status === 'CONFIRMED' ? 'Se ha aceptado la solicitud exitosamente.' : 'Se ha rechazado la solicitud exitosamente.')

        } catch (e) {
            console.log('error',e)
            setModalError(true)
            setTxtModal('Ocurrió un error al aceptar la solicitud, intentalo otra vez')
        } finally {
            setLoadingAction(false)
        }
    }

    const onReject = async() => {
        try {
            setLoadingAction(true)
            setModalReject(false)
            const response = await deleteRequestGuest('',[dataSelect?.id])
            setModalSuccess(true)
            setTxtModal('Se ha rechazado la solicitud exitosamente.')
            setUpdate(true)
        } catch (e) {
            console.log('error',e)
            setModalError(true)
            setTxtModal('Ocurrió un error al rechazar la solicitud, intentalo otra vez')
        }finally{
            setLoadingAction(false)

        }
    }


    return(
        <HeaderBooking showFilters={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Solicitudes pendientes</Text>
                <View>
                    <Text style={styles.lbl}>{dataReserve?.area?.service?.name} - {dataReserve?.area?.name}</Text>
                    <Text style={styles.lbl}>Horario: {dataReserve?.dueTime}</Text>
                </View>
                {!loading ? (
                <View style={{marginVertical:20}}>
                    {listGuests.map((item, index) => (
                        <View style={styles.card} key={(index+1).toString()}>
                            <View style={{width: width *.5,}}>
                                <Text style={styles.lblName}>{item?.user?.fullName}</Text>
                                <Text style={styles.lblMail}>{item?.user?.email}</Text>

                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setModalAccept(true)
                                        setData(item)
                                    }}
                                    style={[styles.btnAction, {backgroundColor: ColorsCeiba.lightGreen, marginRight:5}]}>
                                    <Text style={styles.lblBtn}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setModalReject(true)
                                        setData(item)
                                    }}
                                    style={[styles.btnAction, {backgroundColor: ColorsCeiba.red}]}>
                                    <Text style={styles.lblBtn}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>):(
                    <View style={{height:150, justifyContent:'center'}}>
                        <Spinner size={'sm'} color={ColorsCeiba.darkGray}/>
                    </View>
                )}
                <BtnCustom title="Regresar" onPress={() => navigation.goBack()}/>


            </View>
            <ModalAsk 
                visible={modalAccept}
                setVisible={() => setModalAccept(false)}
                action={() =>onAction('CONFIRMED')}
                text="¿Desea aceptar la invitación?"
                textButton="Si"
            />

            <ModalAsk 
                visible={modalReject}
                setVisible={() => setModalReject(false)}
                action={() => onAction('REJECTED')}
                text="¿Desea rechazar la invitación?"
                textButton="Si"
                iconType="exclamation"
            />

            <ModalInfo 
                visible={modalError}
                setVisible={() => setModalError(false)}
                text={txtModal}
                iconType="exclamation"
            />
            <ModalInfo 
                visible={modalSuccess}
                setVisible={() => setModalSuccess(false)}
                text={txtModal}
                close={false}
                action={() => {
                    if(listGuests.length >= 1){
                        setModalSuccess(false)
                    }else navigation.goBack()
                }}
            />
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:35, 
        marginHorizontal:15,
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'700',
        marginBottom:10
    },
    lbl:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(16),
    },
    btnAction:{
        width: 65,
        height:25,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    lblBtn:{
        color: ColorsCeiba.white,
        fontSize: getFontSize(11), fontWeight:'400'
    },
    lblName:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(15),
        fontWeight:'700'
    },
    lblMail:{
        color: ColorsCeiba.gray,
        fontSize: getFontSize(11),
        fontWeight:'400'
    },
    card:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        borderColor: ColorsCeiba.lightgray,
        borderRadius:10,
        padding:15,
        marginBottom:10
    }
})

export default ModalListGuestScreen