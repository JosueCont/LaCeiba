import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Input, Text, View} from "native-base";
import {Colors} from "../Colors";
import React from "react";

const BookingCollectDataScreen = () => {
    return (
        <LayoutV4>
            <View flex={1} mx={12}>

                <View mb={6}>
                    <Text mt={10} textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'sm'}>Tiempo para reservar 3:52</Text>

                </View>
                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Instalación | Servicio
                    </Text>
                    <Input placeholder={'Campo de golf'} textAlign={'center'}/>
                </View>


                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Fecha
                    </Text>
                    <Input placeholder={'Miércoles 27 de julio'} textAlign={'center'}/>
                </View>

                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Horario
                    </Text>
                    <Input placeholder={'De 9:30 am a 11:30 am'} textAlign={'center'}/>
                </View>

                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Número de personas
                    </Text>
                    <Input placeholder={'4 personas'} textAlign={'center'}/>
                </View>

                <View flexDirection={'row'} mb={6}>
                    <View flex={1} p={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Socios
                        </Text>
                        <Input placeholder={'2'} textAlign={'center'}/>
                    </View>

                    <View flex={1} p={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Invitados
                        </Text>
                        <Input placeholder={'2'} textAlign={'center'}/>
                    </View>
                </View>


                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        ¿Cuenta con servicio de carrito de golf?
                    </Text>
                    <Input placeholder={'2 Carritos de golf'} textAlign={'center'}/>
                </View>

                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        ¿Cuenta con servicio de bolsa de golf?
                    </Text>
                    <Input placeholder={'2 bolsas'} textAlign={'center'}/>
                </View>


                <Button onPress={() => navigation.goBack()}>Reservar</Button>

            </View>
        </LayoutV4>
    )
}

export default BookingCollectDataScreen;