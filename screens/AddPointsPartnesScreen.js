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

    const [loading, setLoading] = useState(null);
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null);
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
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setValue('');
            getPartnersFunction()
        });
        return unsubscribe;
     }, [navigation]);

    useEffect(() => {
        getPartnersFunction()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
          const getGuests = async () =>{
            await getQuestsFunction();
          }
          getGuests();
          return () => {
            setAllGuests([]);
          };
        }, [])
      );

      const getPartnersFunction = async () => {
        try {
            setLoading(true)
            setTextFilter('')
            const queryString = `?userId=not_null`;
            const response = await findPartnerQuery(queryString);
            setPeople(response.data.items);
            setPeopleSearch(response.data.items);
            response.data.items.map((value) => {
               value.points = 0
            })
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

    const addPointsToPartner = (people) => {
        setModalInfoVisible(true)
          peopleSearch.map((value) => {
            if(value.id == people.id){
                value.points+=pointsToAdd
            }
        })
        setPointsToAdd(0)
    }

    const search = async (value) => {
        setTextFilter(value)
        let filtered = _.filter(people, function (item) {
            return item.user.fullName.toLowerCase().includes(value.toLowerCase())
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
                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Invitados</Text>*/}

                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Buscar socio</Text>
                   
                    <View mx={10} mb={5}>
                        <Input value={textFilter} textAlign={'center'} placeholder={'Buscar'} onChangeText={(v) =>search(v)}/>
                    </View>

                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{flexGrow: 1}}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
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
                                            setModalResendSMSVisible(true)}}>
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
                visible={modalResendSMSVisible}
                setVisible={setModalResendSMSVisible}
                textButton={'Enviar'}
                people={selectedPeople}
                points={setPoints}
                textButtonCancel={'Cancelar'}
                action={(v) => {
                    if (v === true) {
                        addPointsToPartner(selectedPeople)
                        setModalResendSMSVisible(false)
                    } else {
                        setModalResendSMSVisible(false)
                    }
                }}
            />

            <ModalInfo 
            setVisible={setModalInfoVisible} 
            visible={modalInfoVisible}
            close={true}
            iconType={'check'}
            title={'Asignación de puntos'}
            textButton={'Aceptar'} text={'Los puntos han sido asginado correctamente'}
            textDescription={'NOTA: Estos puntos podran ser utilizados en un lapso no mayor a 24 horas'}
            action={(v) => {
                if (v === true) {
                    setModalInfoVisible(false)
                } else {
                    setModalInfoVisible(false)

                }
            }}
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