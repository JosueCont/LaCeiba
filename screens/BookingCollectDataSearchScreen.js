import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Select, Skeleton, Text, View, Input} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import {getGuests, findPartnerQuery} from "../api/Requests";

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
            setPeople(response.data);
        } catch (e) {
            console.log(e)   
        }
    }
    

    const getPartnersFunction = async () =>{
        try {
            const queryString = `?q=${textFilter}&&limit=5`;
            const response = await findPartnerQuery(queryString);
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
        if(typeSelected == 'g'){
            setPeople([]);
            await getGuestsFunction();
            setPeople(prevPeople => prevPeople.filter((item)=>item.nombre.toLowerCase().includes(textFilter.toLowerCase()) || item.apellidoPaterno.toLowerCase().includes(textFilter.toLowerCase()) || item.apellidoMaterno.toLowerCase().includes(textFilter.toLowerCase())))
            console.log(people);
        }else if(typeSelected == 'p'){
            setPeople([]);
            getPartnersFunction();
            console.log(people);
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


                    {typeSelected && <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Elija a la persona
                    </Text>}
                    {typeSelected && <View mx={10} mb={10}>
                        <Input placeholder={'Buscar'} onChangeText={(v) => {setTextFilter(v)}}/>
                    </View>}
                    {
                        loading === true ?
                            <Skeleton mb={4}></Skeleton> :
                            (loading === false && typeSelected) &&
                            <Select
                                mb={4}
                                isDisabled={textFilter.length<=0}
                                defaultValue={''}
                                onOpen={search}
                                onValueChange={(v) => {
                                    people.map((item) => {
                                        if(typeSelected == 'g'){
                                            if(item.idInvitado == v){
                                                setPersonSelected(item)
                                            }
                                        }else if( typeSelected == 'p'){
                                            if(item.id == v){
                                                setPersonSelected(item);
                                            }
                                        }
                                    })
                                }}
                                placeholder="Seleccionar">
                                {
                                    people.map((item) => {
                                        return (
                                            (typeSelected == 'g') ? (!route.params.currentPeople.find(person=>person.data.person.idInvitado == item.idInvitado) && <Select.Item  label={item.nombre + " " + item.apellidoPaterno} value={item.idInvitado}  />)
                                            : 
                                            (item.estatus == "Y" && !route.params.currentPeople.find(person=>person.data.person.id == item.id))&& <Select.Item label={item.nombreSocio} value={item.id}  />
                                        )
                                    })
                                }
                            </Select>
                    }


                </View>

                <Button isDisabled={!personSelected || !textFilter} onPress={() =>{ navigation.goBack(); route?.params?.onAddPerson({type: typeSelected, person: personSelected})}}>Agregar</Button>

            </View>

        </LayoutV4>
    )
}

export default BookingCollectDataSearchScreen;