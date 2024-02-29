import React from "react";
import {Button, Text, TextArea, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";

const ContactScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Contacto</Text>
                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>¿Cómo podemos ayudarte?</Text>

                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Envíanos tus comentarios y en breve resolveremos tus dudas</Text>


                <TextArea mb={10} h={40} placeholder="Cuéntanos un poco más..." bgColor={'white'}/>

                <Button onPress={() => navigation.goBack()} mb={10}>Enviar</Button>
            </View>
        </LayoutV4>
    )
}


export default ContactScreen;