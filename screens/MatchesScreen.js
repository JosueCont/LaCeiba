import React from "react";
import {Button, Icon, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import MatchItem from "./MatchItem";
import {MaterialIcons} from "@expo/vector-icons";

const MatchesScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Próximos partidos</Text>

                <View flexDirection={'row'} mb={4}>
                    <View flex={1} p={2}>
                        <Button leftIcon={<Icon as={MaterialIcons} name="date-range" size="sm"/>}>
                            Buscar partido
                        </Button>
                    </View>
                    <View flex={1} p={2}>
                        <Button leftIcon={<Icon as={MaterialIcons} name="add" size="sm"/>}>
                            Nuevo partido
                        </Button>
                    </View>
                </View>

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