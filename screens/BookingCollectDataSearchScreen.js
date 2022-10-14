import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Select, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const BookingCollectDataSearchScreen = ({navigation}) => {
    const [loading, setLoading] = useState(null);
    const [personType, setPersonType] = useState(null);


    useEffect(() => {
        setLoading(true)
        getPersonsTypeFunction()

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])


    const getPersonsTypeFunction = () => {
        setPersonType([
            {label: 'Socio', value: 'partner'},
        ])
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
                                onValueChange={(v) => {

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


                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Elija a la persona
                    </Text>
                    {
                        loading === true ?
                            <Skeleton mb={4}></Skeleton> :
                            loading === false &&
                            <Select
                                mb={4}
                                onValueChange={(v) => {

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


                </View>

                <Button onPress={() => navigation.goBack()}>Seleccionar</Button>

            </View>

        </LayoutV4>
    )
}

export default BookingCollectDataSearchScreen;