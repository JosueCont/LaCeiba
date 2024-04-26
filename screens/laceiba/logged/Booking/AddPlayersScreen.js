import React,{ useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import { Spinner } from "native-base";
import { getFontSize } from "../../../../utils";
import { ColorsCeiba } from "../../../../Colors";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import ListPeople from "../../../../components/laceiba/Booking/ListPeople";
import BtnCustom from "../../../../components/laceiba/CustomBtn";
import { findPartnerQuery, getListGuessing } from "../../../../api/Requests";
import _ from "lodash";

const {height, width} = Dimensions.get('window');

const AddPlayersScreen = () => {
    const navigation = useNavigation();
    const [typeGuessing, setTypeGuessing] = useState(0)
    const [loading, setLoaading] = useState(false)
    const [partnersList, setParners] = useState([])
    const [partnersSelected, setPartnersSelected] = useState([])
    const [txtSearch, setSearch] = useState('')
    const typesInvite = [
        {option:'Socio'},{option:'Invitado'}
    ]

    const clients = [
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},
        {name:'Josué Francisco Contreras Flores', image: require('../../../../assets/iconPerson.png')},

    ]

    useEffect(() => {
        getGuessList()
    },[typeGuessing])

    useEffect(() => {
        const timer = setTimeout(() => {
          getGuessList(txtSearch);
        }, 1000);
    
        // Limpiar el timer en cada cambio de search
        return () => {
          clearTimeout(timer);
        };
      }, [txtSearch]);

    const getGuessList = async(search='') => {
        try {
            console.log('search', search)
            setLoaading(true)
            const response = typeGuessing === 0 ? await findPartnerQuery(`?page=1&limit=30&sort=desc&q=${search}&userId=not_null&isActive=true&accessToGolf=true`)
            : await getListGuessing(`?page=1&limit=100&sort=desc&q=${search}`)
            console.log('partners', response?.data)
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
    return(
        <HeaderBooking showFilters={false}>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>Seleccionar invitado</Text>
                <Text>Tipo invitado</Text>
                <View style={styles.contFilter}>
                    <View style={{flexDirection:'row'}}>
                        {typesInvite.map((item,index) => (
                            <TouchableOpacity 
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

                <View style={{marginBottom:20}}>
                    <TextInput 
                        style={styles.txtInput}
                        placeholder="Buscar"
                        value={txtSearch}
                        onChangeText={handleChange}
                    />
                    <Ionicons name="search-outline" size={24} color={ColorsCeiba.grayV2} style={styles.icon} />

                </View>
                {loading ? (
                    <View style={{width: '100%', height:200, justifyContent:'center', alignItems:'center'}}>
                        <Spinner color={ColorsCeiba.darkGray} size={'lg'}/>
                    </View>
                ): (
                    <ListPeople 
                        people={partnersList} 
                        peopleSelected={partnersSelected}
                        selectedPerson={(item) => {
                            const isExist = partnersSelected.some(person => item.id === person.id);

                            if(isExist) setPartnersSelected(prevSeleccionados => prevSeleccionados.filter(person => person.id !== item.id));
                            else setPartnersSelected(prevSeleccionados => [...prevSeleccionados, item]);

                        }}
                    />

                )}
                <View style={{marginBottom:12}}>
                    <BtnCustom 
                        title="Aceptar"
                        disable={partnersSelected.length === 0}
                        //onPress={() =>}    
                    />

                </View>
                <BtnCustom 
                    title="Cancelar" 
                    bgColor={ColorsCeiba.white} 
                    color={ColorsCeiba.darkGray}
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
        marginBottom:37
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