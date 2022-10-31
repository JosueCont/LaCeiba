import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Input, Select, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import {findPartnerQuery, getGuests, validatePartner} from "../api/Requests";

moment.locale('es');

const BookingCollectDataSearchScreen = ({route, navigation}) => {
    const [loading, setLoading] = useState(null);
    const [personType, setPersonType] = useState(null);

    const [typeSelected, setTypeSelected] = useState(null);
    const [personSelected, setPersonSelected] = useState(null);
    const [people, setPeople] = useState([]);
    const [textFilter, setTextFilter] = useState('');

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

    const getGuestsFunction = async () => {
        try {
            const response = await getGuests('')
            console.log(response.data)
            setPeople(response.data);
        } catch (e) {
            console.log(e)
        }
    }


    const getPartnersFunction = async () => {
        try {
            const queryString = `?q=${textFilter}&&limit=5&userId=not_null`;
            const response = await findPartnerQuery(queryString);
            console.log(response.data)
            setPeople(response.data.items);
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

    const search = async () => {
        if (typeSelected == 'g') {
            setPeople([]);
            await getGuestsFunction();
            setPeople(prevPeople => prevPeople.filter((item) => item.nombre.toLowerCase().includes(textFilter.toLowerCase()) || item.apellidoPaterno.toLowerCase().includes(textFilter.toLowerCase()) || item.apellidoMaterno.toLowerCase().includes(textFilter.toLowerCase())))
            console.log(people);
        } else if (typeSelected == 'p') {
            setPeople([]);
            getPartnersFunction();
            console.log(people);
        }
    }


    const validatePartnerFunction = async (id) => {
        try {
            const response = await validatePartner(`/${id}/partners/validate`)

            console.log(response.data, 89)
            if (response.data.status === 'true') {
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
                            <Skeleton mb={4}></Skeleton> :
                            loading === false &&
                            <Select
                                mb={4}
                                defaultValue={""}
                                selectedValue={typeSelected ? typeSelected : "Seleccionar"}
                                onValueChange={(v) => {
                                    setTypeSelected(v);
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
                        typeSelected &&
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Elija a la persona
                        </Text>
                    }
                    {
                        typeSelected &&
                        <View mb={4}>
                            <Input placeholder={'Buscar'} onChangeText={(v) => {
                                setTextFilter(v)
                            }}/>
                        </View>
                    }
                    {
                        loading === true ?
                            <Skeleton mb={4}></Skeleton> :
                            (loading === false && typeSelected) &&
                            <Select
                                mb={4}
                                isDisabled={textFilter.length <= 0}
                                defaultValue={''}
                                onOpen={search}
                                onValueChange={async (v) => {
                                    people.map(async (item) => {
                                        if (typeSelected == 'g') {
                                            if (item.idInvitado == v) {
                                                setPersonSelected(item)
                                            }
                                        } else if (typeSelected == 'p') {
                                            if (item.id == v) {
                                                console.log(item, 185)
                                                let validate = await validatePartnerFunction(item.user.id);
                                                if (validate === true) {
                                                    setPersonSelected(item);
                                                } else {
                                                    console.log('Esta persona no puede ser invitada en esta reservación. Por favor, contacte a administración.')
                                                }
                                            }
                                        }
                                    })

                                }}
                                placeholder="Seleccionar">
                                {
                                    people.map((item) => {
                                        return (
                                            (typeSelected == 'g') ? (!route.params.currentPeople.find(person => person.data.person.idInvitado == item.idInvitado) && <Select.Item label={item.nombre + " " + item.apellidoPaterno} value={item.idInvitado}/>)
                                                :
                                                (item.estatus == "Y" && !route.params.currentPeople.find(person => person.data.person.id == item.id)) && <Select.Item label={item.nombreSocio} value={item.id}/>
                                        )
                                    })
                                }
                            </Select>
                    }


                </View>

                <Button isDisabled={!personSelected || !textFilter} onPress={() => {
                    navigation.goBack();
                    route?.params?.onAddPerson({type: typeSelected, person: personSelected})
                }}>
                    Agregar
                </Button>

            </View>

        </LayoutV4>
    )
}

export default BookingCollectDataSearchScreen;