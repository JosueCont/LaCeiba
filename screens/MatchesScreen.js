import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import MatchItem from "./MatchItem";

const MatchesScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Próximos partidos</Text>

                <MatchItem mb={4} yellow={true}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <Text textAlign={'center'} mb={4} color={Colors.green} fontSize={'sm'}>Partidos finalizados</Text>

                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default MatchesScreen;