import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../../Colors";
import LayoutV4 from "../Layouts/LayoutV4";
import ManualItem from "../HelpContentComponents/ManualItem";

const ManualsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Manuales</Text>
                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Consulta y descarga</Text>

                <ManualItem mb={4}/>
                <ManualItem mb={4}/>
                <ManualItem mb={4}/>
                <ManualItem mb={4}/>
                <ManualItem mb={4}/>
                <ManualItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default ManualsScreen;