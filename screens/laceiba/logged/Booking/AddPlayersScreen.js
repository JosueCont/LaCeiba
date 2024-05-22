import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import { Spinner } from "native-base";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import ListPeople from "../../../../components/laceiba/Booking/ListPeople";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import { addGuestsBooking, addPartnersBooking, findPartnerQuery, getListGuessing } from "../../../../api/Requests";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setAtributeBooking } from "../../../../redux/ducks/bookingDuck";
import ModalInfo from "../../../Modals/ModalInfo";

const {height, width} = Dimensions.get('window');

const AddPlayersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const playerList = useSelector(state => state.bookingDuck.players)
    const [typeGuessing, setTypeGuessing] = useState(0)
    const [loading, setLoaading] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [partnersList, setParners] = useState([])
    const [txtSearch, setSearch] = useState('')
    const [firstRender, setFirstRender] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const [modalInvitations, setModalInvitations] = useState(false)
    const [textInvitation, setTxtInvitation] = useState('')
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)


    
    const {players, isFromEdit, invitations, idReservation, isGolf} = route?.params; 
    const [partnersSelected, setPartnersSelected] = useState([])
    const typesInvite = [
        {option:'Socio'},{option:'Invitado'}
    ]
   

    useEffect(() => {
        if (firstRender) {
            console.log('invitations',invitations)
            setPartnersSelected(isFromEdit ? invitations : playerList)
            setFirstRender(false);
        } else {
            //getGuessList();
            setParners([])
            setSearch('')
        }
    },[typeGuessing])

    useEffect(() => {
        if(txtSearch != ''){
            const timer = setTimeout(() => {
              getGuessList(txtSearch);
            }, 1000);
        
            // Limpiar el timer en cada cambio de search
            return () => {
              clearTimeout(timer);
            };

        }else setParners([])
      }, [txtSearch]);

    const getGuessList = async(search='') => {
        try {
            setLoaading(true)
            let query = `?page=1&limit=30&sort=desc&q=${search}&userId=not_null&isActive=true`
            let url = infoBooking?.activity?.isGolf || isGolf ? `${query}&accessToGolf=${isFromEdit ? isGolf: infoBooking?.activity?.isGolf}` : query
            const response = typeGuessing === 0 ? await findPartnerQuery(url)
            : await getListGuessing(`?page=1&limit=100&sort=desc&q=${search}`)
            //console.log('partners', response?.data)
            setParners(response?.data?.items || [])
        } catch (e) {
            console.log('error parners', e)
        } finally{
            setLoaading(false)
        }
    }

    const handleChange = (val) => {
        setSearch(val)
        //debouncegetList.cancel(); 
        //debouncegetList(val)
    }

    const addPeople = async() => {
        try {
            setLoadingAdd(true)
            let filterPartners = partnersSelected.filter((person) => person?.userId && !invitations.some(item => item?.userId === person?.userId)).map(item => item?.userId)
            let filterGuessing = partnersSelected.filter(person => person?.idInvitado && !invitations.some(item => item?.idInvitado === person?.idInvitado)).map(item => ({
                "guestId": item?.idInvitado,
                "guestName": `${item?.nombre} ${item?.apellidoPaterno}`,
                "guestEmail": item?.mail,
                "points": 1
            }))
            if(filterPartners.length > 0) await sendNewsPartners(filterPartners)
            if(filterGuessing.length > 0) await sendNewsGuessing(filterGuessing)
            
        } catch (e) {
            console.log('error',e)
        }finally{
            setLoadingAdd(false)
            navigation.goBack(0)
        }

    }

    const sendNewsPartners = async(newsPartners) => {
        try {
            let dataSend = {
                partners: newsPartners
            }
            const response = await addPartnersBooking(dataSend,[idReservation])
            console.log('ressponse adPartners',response?.data)
            //navigation.goBack(0)
        } catch (e) {
            console.log('error',e)
            setModalInvitations(true)
            setTxtInvitation('Error al agregar socios')
        }
    }

    const sendNewsGuessing = async(newsGuessing) => {
        try {
            let dataSend = {
                guests: newsGuessing
            }
            const response = await addGuestsBooking(dataSend, [idReservation])
            console.log('response guessts', response?.data)
        } catch (e) {
            console.log('error add giest',e)
            setModalInvitations(true)
            setTxtInvitation('Error al agregar invitados')
        }
    }

    return(
        <HeaderBooking showFilters={false} isScrolling={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Seleccionar invitado</Text>
                <Text>Tipo invitado</Text>
                <View style={styles.contFilter}>
                    <View style={{flexDirection:'row'}}>
                        {typesInvite.map((item,index) => (
                            <TouchableOpacity 
                                disabled={loading}
                                style={[styles.centerBtn,styles.btnType, {backgroundColor: index === typeGuessing ? ColorsCeiba.aqua : ColorsCeiba.white}]} 
                                onPress={() => setTypeGuessing(index)}>
                                <Text>{item?.option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/*<TouchableOpacity 
                        onPress={() => navigation.navigate('AddGuest')}
                        style={[styles.centerBtn,styles.btnAdd]}>
                        <Text>+ Nuevo contacto</Text>
                        </TouchableOpacity>*/}
                </View>
            </View>
            
            <View style={styles.container}>
                <View style={{marginBottom:20}}>
                    <TextInput 
                        style={styles.txtInput}
                        placeholder="Buscar"
                        value={txtSearch}
                        onChangeText={handleChange}
                    />
                    <Ionicons name="search-outline" size={24} color={ColorsCeiba.grayV2} style={styles.icon} />

                </View>
            </View>
            <View style={{}}>
                {loading ? (
                    <View style={{width: '100%', height: height > 830 ? height*.5 : height*.33, justifyContent:'center', alignItems:'center'}}>
                        <Spinner color={ColorsCeiba.darkGray} size={'lg'}/>
                    </View>
                ): (
                    <View style={{ height: height > 830 ? height*.5 : height*.33,}}>
                        <ListPeople 
                            countPlayers={players}
                            people={partnersList} 
                            peopleSelected={partnersSelected}
                            selectedPerson={(item) => {
                                const isExist = partnersSelected.some(person => item?.userId ? item?.userId === person?.userId : item?.idInvitado === person?.idInvitado)

                                if(isExist){ 
                                    //arreglar esto
                                    setPartnersSelected(prevSeleccionados => prevSeleccionados.filter(person =>  person?.userId !== item?.userId ||  item?.idInvitado !== person?.idInvitado));
                                }else{
                                    partnersSelected.length >= players ? setShowModal(true)
                                    : setPartnersSelected(prevSeleccionados => [...prevSeleccionados, item]);
                                }

                            }}
                        />
                    </View>

                )}
                <View style={{marginBottom:12}}>
                    <BtnCustom 
                        title="Aceptar"
                        loading={isFromEdit ? loadingAdd : false}
                        disable={partnersSelected.length === 0}
                        onPress={() =>{
                            if(isFromEdit){
                                console.log('Agregar usuarios', partnersSelected)
                                addPeople()
                            }else{console.log(partnersSelected)
                                dispatch(setAtributeBooking({prop:'players', value: partnersSelected}))
                                navigation.goBack()

                            }
                        }}    
                    />

                </View>
                <BtnCustom 
                    title="Cancelar" 
                    bgColor={ColorsCeiba.white} 
                    color={ColorsCeiba.darkGray}
                    onPress={() => navigation.goBack(0)}
                />
                <ModalInfo 
                    visible={showModal}
                    setVisible={() => {
                        setShowModal(false)
                    }}
                    close={false}
                    title="Aviso"
                    text="No es posible agregar más usuarios"
                />

                <ModalInfo 
                    visible={modalInvitations}
                    setVisible={() => setModalInvitations(false)}
                    close={true}
                    title="Problema!"
                    iconType="exclamation"
                    text={textInvitation}
                />
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    lblTitle:{
        color: ColorsCeiba.darkGray,
        fontSize: getFontSize(20),
        fontWeight:'400',
        marginBottom:20
    },
    contFilter:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:14,
        marginBottom:27
    },
    btnType:{
        width: 78, 
        height:26, 
        marginRight:8
    },
    btnAdd:{
        width: 140, 
        height:26,
    },
    centerBtn:{
        borderColor: ColorsCeiba.darkGray,
        borderWidth:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    txtInput:{
        width: width*.9,
        height:37,
        backgroundColor: ColorsCeiba.lightgray,
        paddingLeft:30,
        borderRadius:5
    },
    icon:{
        position:'absolute', 
        top:6, 
        left:5
    }
})

export default AddPlayersScreen;