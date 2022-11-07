import LayoutV4 from "./Layouts/LayoutV4";
import {Button, FormControl, Input, Select, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import {findPartnerQuery, getGuests, getPoints, validatePartner} from "../api/Requests";
import _ from "lodash";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";

moment.locale('es');

const BookingCollectDataSearchScreen = ({route, navigation, appDuck}) => {
    const [loading, setLoading] = useState(null);
    const [personType, setPersonType] = useState(null);

    const [typeSelected, setTypeSelected] = useState(null);
    const [personSelected, setPersonSelected] = useState(null);
    const [people, setPeople] = useState([]);
    const [textFilter, setTextFilter] = useState('');
    const [personNotValidText, setPersonNotValidText] = useState(null);
    const [peopleSearch, setPeopleSearch] = useState([]);
    const [points, setPoints] = useState(null);

    useEffect(() => {
        setLoading(true)
        getPersonsTypeFunction()
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setTypeSelected(null);
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
            getPointsFunction()
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
            setPeople(data);
        } catch (e) {
            console.log(e)
        }
    }


    const getPartnersFunction = async () => {
        try {
            const queryString = `?q=${textFilter}&&limit=5&userId=not_null`;
            const response = await findPartnerQuery(queryString);
            let ignorePersons = route.params.currentPeople.map((item) => item.type === 'SOCIO' && item.data.person.idStandard);
            let data = _.filter(response.data.items, function (o) {
                return !ignorePersons.includes(o.id) && o.estatus === "Y";
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
            setPeopleSearch(people.filter((item) => item.nombre.toLowerCase().includes(v.toLowerCase()) || item.apellidoPaterno.toLowerCase().includes(v.toLowerCase()) || item.apellidoMaterno.toLowerCase().includes(v.toLowerCase())))
        } else if (typeSelected == 'p') {
            console.log(people)
            console.log(v.toLowerCase())

            setPeopleSearch(people.filter((item) => item.nombreSocio.toLowerCase().includes(v.toLowerCase())))

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

            console.log(ex)
            if (ex.data.message === 'Partner does not have access') {
                alert('El socio no tiene acceso.')
            } else {
                alert(ex.data.message)
            }
            return false;
        }

    }

    var debounce_fun = _.debounce(function (v) {
        search(v)

    }, 100);


    const getPointsFunction = async () => {
        try {
            setLoading(true)
            const response = await getPoints('', [appDuck.user.id]);
            let pointsTotal = response.data.points - route.params.points;
            setPoints(pointsTotal)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutV4>
            <View flex={1} mx={12} my={10}>


                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Seleccione a la persona que desea invitar
                    </Text>
                </View>

                <View>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Tipo de persona
                    </Text>

                    {
                        loading === true ?
                            <Skeleton mb={10} borderRadius={30}/> :
                            loading === false &&
                            <Select
                                mb={4}
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
                                            <Select.Item label={item.label} value={item.value}/>

                                        )
                                    })
                                }
                            </Select>
                    }
                    {
                        (typeSelected === 'g' && points < 3) &&
                        <Text textAlign={'center'} color={'red.500'} fontSize={'xs'} mb={4}>
                            Actualmente cuentas con {points} puntos.{'\n'}Para agregar un invitado se requieren 3 puntos.
                        </Text>
                    }


                    {
                        typeSelected &&
                        <View mb={4}>
                            <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                Elija a la persona
                            </Text>
                            <Input placeholder={'Buscar'} value={textFilter} onChangeText={(v) => {
                                debounce_fun(v)
                                setTextFilter(v)
                                setPersonNotValidText(null);
                            }}/>
                        </View>
                    }
                    {
                        !(textFilter.length <= 0) && typeSelected &&
                        <FormControl isInvalid={personNotValidText}>

                            {
                                !(textFilter.length <= 0) &&
                                peopleSearch.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            people.map(async (itemSub) => {
                                                if (typeSelected == 'g') {
                                                    if (itemSub.idInvitado == item.idInvitado) {
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
                                            <View backgroundColor={_.has(personSelected, 'idStandard') ? (_.get(personSelected, 'idStandard') === item.idInvitado || _.get(personSelected, 'idStandard') === item.id) ? Colors.green : Colors.greenV5 : Colors.greenV5} height={50} mb={2} justifyContent={'center'} pl={5} borderRadius={10}>
                                                {
                                                    typeSelected == 'g' ?
                                                        <Text>{item.nombre + " " + item.apellidoPaterno}</Text>
                                                        :
                                                        <Text>{item.nombreSocio}</Text>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })

                            }
                            {
                                personNotValidText &&
                                <Text textAlign={'center'} color={'red.500'} mb={2}>{personNotValidText}</Text>
                            }

                        </FormControl>
                    }


                </View>

                {
                    (textFilter !== '' && peopleSearch.length === 0) &&
                    <Text textAlign={'center'} color={'red.500'} mb={2}>Sin resultados</Text>
                }

                <Button isDisabled={((_.has(personSelected, 'valid') ? personSelected.valid === false : true) || !textFilter || (typeSelected === 'g' && points < 3))} onPress={() => {
                    navigation.goBack();
                    route?.params?.onAddPerson({type: typeSelected, person: personSelected})
                }}>
                    Agregar
                </Button>

            </View>

        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookingCollectDataSearchScreen);