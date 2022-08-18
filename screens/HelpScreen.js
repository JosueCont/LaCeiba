import React from "react";
import {Button, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";

const HelpScreen = ({navigation}) => {


    return (
        <LayoutV3>
            <View flex={1} mx={20}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Documentos de ayuda</Text>


                <Button onPress={() => navigation.goBack()} mb={6}>Mapa</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Directorio</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Reglamento</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Manuales</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Video tutoriales</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Términos y condiciones</Button>

                <Button onPress={() => navigation.goBack()}>Contacto</Button>
            </View>

        </LayoutV3>
    )
}


export default HelpScreen;