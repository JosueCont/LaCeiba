import React, {useEffect, useState} from "react";
import {Button, Input, ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import PartnerItem from "./PartnerItem";
import _ from 'lodash';
import {RefreshControl, TouchableOpacity} from "react-native";
import {findPartnerQuery, getGuests, getPoints, validatePartner} from "../api/Requests";
import LayoutV5 from "./Layouts/LayoutV5";
import ModalAddPoints from "./Modals/ModalAddPoints";
import ModalInfo from "./Modals/ModalInfo";
import {connect} from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const AddPointsPartnesScreen = ({route,navigation, appDuck}) => {

    const {accion} = route?.params;
    const [loading, setLoading] = useState(null);
    const [modalAddPoints, setModalAddPoints] = useState(null);
    const [allGuests, setAllGuests] = useState([]);
    const [modalAskVisible, setModalAskVisible] = useState(false);
    const [people, setPeople] = useState([]);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('');
    const [valor, setValue] = useState('');
    const [peopleSearch, setPeopleSearch] = useState([]);
    const [textFilter, setTextFilter] = useState('');
    const [selectedPeople, setSelectedPeople] = useState('')
    const [pointsToAdd, setPointsToAdd] = useState(0)
    const [modalErrorVisible, setModalErrorVisible] = useState(false)
     useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setValue('');
            // getPartnersFunction()
        });
        return unsubscribe;
     }, [navigation]);

    useEffect(() => {
        getPartnersFunction();
    }, [])

    useEffect(()=> {
        setPeople([]);
        setPeopleSearch([]);
        getPartnersFunction();
    }, [route?.params]);

    useFocusEffect(
        React.useCallback(() => {
        //   const getGuests = async () =>{
        //     await getQuestsFunction();
        //   }
        //   getGuests();
          return () => {
            setAllGuests([]);
          };
        }, [])
      );

      const getPartnersFunction = async () => {
        try {
            setLoading(true)
            setTextFilter('')
            const queryString = `?userId=not_null&isActive=true`;
            const response = await findPartnerQuery(queryString);
            const data = response.data.items.filter(x => x.user.id !== appDuck.user.id);
            if(accion){
                const members = data.filter(d => d.accion == appDuck.user.partner.accion.toString());
                setPeople(members);
                setPeopleSearch(members);
                return;
            }
            setPeople(data);
            setPeopleSearch(data);
            
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

    const addPointsToPartner = async(people) => {
        setModalInfoVisible(true)
    }

    const search = async (value) => {
        setTextFilter(value)
        let filtered = _.filter(people, function (item) {
            return item?.nombreSocio.toLowerCase().includes(value.toLowerCase())
        });
        console.log(filtered);
        setPeopleSearch(filtered)
    }

    const setPoints = (p) => {
        setPointsToAdd(p)
    }

 
    return (
        <LayoutV5>
            <View flex={1}>
                <View flex={1}>{/*
                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Invitados</Text>*/}

                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'capitalize'}>Buscar socio</Text>
                   
                    <View mx={10} mb={5}>
                        <Input value={textFilter} textAlign={'center'} placeholder={'Buscar'} onChangeText={(v) =>search(v)}/>
                    </View>
                    {
                        !accion && 
                        <Text textAlign={'center'} mt={0} ml={5} mr={5} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>El límite de puntos para transferir por día a cada socio es: 12</Text>
                    }

                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{flexGrow: 1}}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.primary}
                                refreshing={loading}
                                onRefresh={getPartnersFunction}
                            />
                        }>

                        <View mx={8}>
                            {
                                peopleSearch.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setSelectedPeople(item)
                                            setModalAddPoints(true)}}>
                                            <PartnerItem mb={4} item={item}/>
                                        </TouchableOpacity>

                                        
                                    )
                                })
                            }

                        </View>


                    </ScrollView>
                </View>
            </View>
            <ModalAddPoints
                visible={modalAddPoints}
                partnerAccion={accion}
                setVisible={setModalAddPoints}
                textButton={'Enviar'}
                people={selectedPeople}
                points={setPoints}
                error={setModalErrorVisible}
                textButtonCancel={'Cancelar'}
                action={(v) => {
                    if (v === true) {
                        addPointsToPartner(selectedPeople)
                        setModalAddPoints(false)
                    } else {
                        setModalAddPoints(false)
                    }
                }}
            />

            <ModalInfo 
            setVisible={setModalInfoVisible} 
            visible={modalInfoVisible}
            close={false}
            iconType={'check'}
            title={'Asignación de puntos'}
            textButton={'Aceptar'} text={'Los puntos han sido asignados correctamente'}
            textDescription={accion ? '' : 'NOTA: Estos puntos podrán ser utilizados en un lapso no mayor a 48 horas'}
            action={(v) => {
                if (v === true) {
                    setModalInfoVisible(false)
                    getPartnersFunction()

                } else {
                    setModalInfoVisible(false)
                    getPartnersFunction()


                }
            }}
            />

                <ModalInfo
                visible={modalErrorVisible}
                setVisible={setModalErrorVisible}
                iconType={'exclamation'}
                textButton={'Entendido'}
                text={'Ocurrio un error en la asignación de puntos'}
                />
        </LayoutV5>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(AddPointsPartnesScreen)