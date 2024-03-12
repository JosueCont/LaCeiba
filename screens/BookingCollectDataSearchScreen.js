import {Button, FormControl, Icon, Input, ScrollView, Select, Skeleton, Text, View, Spinner, useToast} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import {findPartnerQuery, getGuests, getPoints, validatePartner} from "../api/Requests";
import _, { set } from "lodash";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import ModalAddPartnerSap from "./Modals/ModalAddPartnerSap";

moment.locale('es');

const BookingCollectDataSearchScreen = ({route, navigation, appDuck}) => {
    const [loading, setLoading] = useState(null);
    const [personType, setPersonType] = useState(null);

    const [typeSelected, setTypeSelected] = useState(null);
    const [personSelected, setPersonSelected] = useState(null);
    const [people, setPeople] = useState([]);
    const [textFilter, setTextFilter] = useState('');
    const [personNotValidText, setPersonNotValidText] = useState(null);
    const [personNotValid, setPersonNotValid] = useState(false);
    const [peopleSearch, setPeopleSearch] = useState([]);
    const [points, setPoints] = useState(route.params.points || null);
    const [noticeWrite, setNoticeWrite] = useState(false)

    const [modalAddPartnerSap, setModalAddPartnerSap] = useState(false);

    const toast = useToast();

    useEffect(() => {
        setLoading(true)
        getPersonsTypeFunction()
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

        useEffect(() => {
            setPoints(route.params.points)
            if(route.params.addPartner) {
                setTypeSelected('p');
            }
        },[route]);

    useFocusEffect(
        React.useCallback(() => {
            setTypeSelected(route.params.addPartner ? 'p' : null);
            setPersonSelected(null);
            return () => {
                setTypeSelected(null);
                setTextFilter('');
                setPersonSelected(null);
                
            };
        }, [])
    );

    useEffect(() => {
        if (typeSelected == 'g') {
            getGuestsFunction();
        } else if (typeSelected == 'p') {
            getPartnersFunction();
        }
    }, [typeSelected])

    const getGuestsFunction = async () => {
        try {
            const response = await getGuests('')
            let ignorePersons = route.params.currentPeople.map((item) => item.type === 'INVITADO' && item.data.person.idStandard);
            let data = _.filter(response.data, function (o) {
                return !ignorePersons.includes(o.idInvitado);
            });
            setPeople(data)
        } catch (e) {
            console.log(e)
        }
    }


    const getPartnersFunction = async () => {
        try {
            let queryString = `?q=${textFilter}&userId=not_null&isActive=true`;
            
            if(route?.params?.isGolf){
                queryString += '&accessToGolf=true'
            }

            const response = await findPartnerQuery(queryString);
            let ignorePersons = route.params.currentPeople.map((item) => item.type === 'SOCIO' && item.data.person.idStandard);
            let ignorePartnersId = [];
            if(route.params?.excludePartnerIds) {
                ignorePartnersId = route.params?.excludePartnerIds;
            }
            ignorePersons.push(appDuck.user?.partner?.id)
            let data = _.filter(response.data.items, function (o) {
                return !ignorePersons.includes(o.id)  && o.estatus === "Y" && !ignorePartnersId.includes(o.id);
            });
            setPeople(data);
        } catch (e) {
            console.log(e);
        }
    }


    const getPersonsTypeFunction = () => {
        setPersonType([
            {label: 'Socio', value: 'p'},
            {label: 'Invitado', value: 'g'},
        ])
    }

    const search = async (v) => {


        if (typeSelected == 'g') {
                        setNoticeWrite(false)
            if(v.length >=3){
                setNoticeWrite(true)
                setPeopleSearch( () => {
                    return people.filter((item) =>{
                        let fullname = `${item.nombre.toLowerCase()} ${(item?.apellidoPaterno || '').toLowerCase()} ${(item?.apellidoMaterno || '').toLowerCase()} `
                        return fullname.includes(v.toLowerCase())
                    } )
                })

            }
        } else if (typeSelected == 'p') {
            setNoticeWrite(true)
            setPeopleSearch(people.filter((item) => item.nombreSocio.toLowerCase().includes(v.toLowerCase())))
            setTimeout(() => {
            }, 500)
        }
    }


    const validatePartnerFunction = async (id) => {
        try {
            const response = await validatePartner(`/${id}/partners/validate`)
            if (response.data.status === true) {
                return true;
            } else {
                return false;
            }

        } catch (ex) {

            console.log(ex.data);
            // if (ex.data.message === 'Partner does not have access') {
            //     alert('El socio no tiene acceso.')
            // } else {
                
            // }
            alert(ex.data.message)
            return false;
        }

    }

    var debounce_fun = _.debounce(function (v) {
        search(v)
    }, 100);


    // const getPointsFunction = async () => {
        // try {
        //     setLoading(true)
        //     const response = await getPoints('', [appDuck.user.id]);
        //     console.log(response.data, 138)
        //     let pointsTotal = response.data.totalPoints - route.params.points;
        //     setPoints(pointsTotal)
        // } catch (ex) {
        //     console.log(ex)
        // } finally {
        //     setLoading(false)
        // }
    // }

    return (

        <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
            <View flex={1} mx={12} my={10}>

                <View flex={1}>


                    <View>
                        <View mb={6}>
                            <Text textAlign={'center'} mb={2} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                Seleccione a la persona que desea invitar
                            </Text>
                        </View>

                        <View>
                            <Text textAlign={'center'} mb={2} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                Tipo de persona
                            </Text>

                            {
                                loading === true ?
                                    <Skeleton mb={10} borderRadius={30}/> :
                                    loading === false &&
                                    <Select
                                        mb={4}
                                        isDisabled={route.params.addPartner}
                                        defaultValue={""}
                                        selectedValue={typeSelected ? typeSelected : "Seleccionar"}
                                        onValueChange={(v) => {
                                            setTextFilter('')
                                            setTypeSelected(v);
                                            setPersonNotValidText(null);

                                        }}
                                        placeholder="Seleccionar">
                                        {
                                            personType.map((item) => {
                                                return (
                                                    <Select.Item key={item.value} label={item.label} value={item.value}/>

                                                )
                                            })
                                        }
                                    </Select>
                            }
                            {
                                (typeSelected === 'g' && points < route.params?.pointsDay) &&
                                <Text textAlign={'center'} color={Colors.red} fontSize={'xs'} mb={4}>
                                    Actualmente cuentas con {points} punto(s).{'\n'}Para agregar un invitado se requieren {route.params?.pointsDay} puntos.
                                </Text>
                            }


                            {
                                (typeSelected ==='p' || points >= route.params?.pointsDay ) &&
                                <View mb={2}>
                                    <Text textAlign={'center'} mb={2} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                        Elija a la persona
                                    </Text>
                                    <Input placeholder={'Buscar'} value={textFilter} onChangeText={(v) => {
                                        search(v)
                                        setTextFilter(v)
                                        setPersonNotValidText(null);
                                    }}/>
                                 
                                </View>
                            }

                                <View>
                                    {
                                            personNotValidText &&
                                            <Text my={2} textAlign={'center'} color={Colors.red}>{personNotValidText}</Text>
                                    }
                                </View>
                            {
                                (textFilter.length > 0 && typeSelected) &&
                                
                                <ScrollView flexGrow={1} height={!noticeWrite ? 50 : 250} my={2} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                   
                                { 
                                !noticeWrite ?
                                    <Text textAlign={'center'} color={Colors.red} fontSize={'xs'} mb={4}>
                                      Escribe por lo menos 3 letras
                                  </Text>
                                  :
                                  <View my={5} justifyContent={'center'}>
                                         
                                        <FormControl isInvalid={personNotValidText}>

                                            {
                                                (textFilter.length > 0) &&
                                                peopleSearch.map((item, idx) => {
                                                    let selected = _.has(personSelected, 'idStandard') ? (_.get(personSelected, 'idStandard') === item.idInvitado || _.get(personSelected, 'idStandard') === item.id) ? true : false : false;
                                                    return (
                                                        <TouchableOpacity key={idx} style={{borderWidth: 0.5, borderColor: Colors.primary, marginBottom: 10, borderRadius: 10, backgroundColor: 'white'}} onPress={() => {
                                                            people.map(async (itemSub, idxSub) => {
                                                                if (typeSelected == 'g') {
                                                                    if (itemSub.idInvitado == item.idInvitado) {
                                                                        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                                        if(!itemSub.mail.match(mailFormat)){
                                                                            setPersonNotValidText(`Esta persona no tiene un correo válido`)
                                                                            setPersonSelected(null);
                                                                            return
                                                                        }
                                                                        itemSub['idStandard'] = itemSub.idInvitado;
                                                                        itemSub['valid'] = true;
                                                                        setPersonSelected(itemSub);
                                                                        setPersonNotValidText(null);
                                                                    }
                                                                                                                                  
                                                                } else if (typeSelected == 'p') {
                                                                    if (itemSub.id == item.id) {
                                                                        let validate = await validatePartnerFunction(itemSub.user.id);
                                                                        if (validate === true) {
                                                                            itemSub['idStandard'] = itemSub.id;
                                                                            itemSub['valid'] = true;
                                                                            setPersonSelected(itemSub);
                                                                            setPersonNotValidText(null);
                                                                        } else {
                                                                            itemSub['idStandard'] = itemSub.id;
                                                                            itemSub['valid'] = false;
                                                                            setPersonSelected(itemSub);
                                                                            setPersonNotValidText(`Esta persona no puede ser invitada en esta reservación. ${'\n'}Por favor, contacte a administración.`)
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }}>
                                                            <View flexDir={'row'}
                                                                height={50} mb={2} justifyContent={'center'} pl={5} borderRadius={10}>
                                                                <View flex={1} justifyContent={'center'}>
                                                                    {
                                                                        typeSelected == 'g' && item.nombre  &&
                                                                            <Text color={Colors.primary}>{`${item.nombre} ${item.apellidoPaterno}`}</Text>        
                                                                    }
                                                                    {
                                                                     typeSelected == 'p' && item.nombreSocio  &&
                                                                     <Text color={Colors.primary}>{item.nombreSocio}</Text>
                                                                    }
                                                                </View>
                                                                
                                                                <View justifyContent={'center'} pr={4}>
                                                                    {
                                                                        selected &&
                                                                        <Icon as={MaterialIcons} name={'check-circle'} color={Colors.lightPrimary} size={'md'}></Icon>

                                                                    }
                                                                </View>

                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })

                                            }


                                        </FormControl>

                                        {
                                            ((textFilter !== '' && peopleSearch.length === 0)) &&
                                            <>
                                                <Text textAlign={'center'} color={Colors.red} mb={2}>Sin resultados</Text>
                                                {/* {typeSelected ==='g' && <Button mt={2} onPress={() => {setModalAddPartnerSap(true)}}>Agregar invitado con costo</Button>} */}
                                            </>
                                            
                                        }
                                        </View>
                                }
                               
                                </ScrollView>
                                
                            }


                        </View>
                    </View>

                    <View>
                    {
                    (typeSelected ==='p' || points >= route.params?.pointsDay ) &&

                        <Button mb={2} mt={2} isDisabled={((_.has(personSelected, 'valid') ? personSelected.valid === false : true) || !textFilter || (typeSelected === 'g' && points < route.params?.pointsDay))} onPress={() => {
                                route?.params?.onAddPerson({type: typeSelected, person: personSelected})
                                navigation.goBack();
                            }}>
                                Agregar
                            </Button>
                        }
                        <Button  onPress={() => {
                            navigation.goBack();
                        }}>
                            Regresar
                        </Button>
                    </View>

                </View>

                <ModalAddPartnerSap
                    visible={modalAddPartnerSap}
                    setVisible={setModalAddPartnerSap}
                    action={(v) => {
                        if  (v === true) {
                            toast.show({
                                description: "Socio agregado con éxito"
                            })
                            getGuestsFunction()
                            search(textFilter);
                        } else {
                            setModalAddPartnerSap(false)
                            toast.show({
                                description: "Hubo un error intenta más tarde"
                            })
                        }
                    }}
                />
            </View>

        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookingCollectDataSearchScreen);