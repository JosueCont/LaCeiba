import React from "react";
import {Button, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";

const MembershipsScreen = ({navigation}) => {


    return (
        <LayoutV3>
            <View flex={1} mx={20}>
                <Button mt={10} onPress={() => navigation.goBack()} mb={6}>Estatus actual</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Fecha de renovación</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Historial</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Miembros adicionales</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Beneficios</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Green points</Button>
                <Button onPress={() => navigation.goBack()} mb={6}>Línea de crédito</Button>
            </View>

        </LayoutV3>
    )
}


export default MembershipsScreen;