import React from "react";
import {Button, Icon, Text, View, Image} from "native-base";
import iconGroupSmall from "../assets/iconGroupSmall.png";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import MatchItem from "./MatchItem";
import {MaterialIcons} from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import {TouchableOpacity} from "react-native";


const MatchesScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8} mb={5}>
            <View flexDirection={'row'} mt={5}>
                    <View flex={1} p={2}>
                        <Button p={2}  leftIcon={<Icon as={MaterialIcons} color={Colors.green} name="date-range" size="sm"/>} variant="outline" borderColor={Colors.green} _text={{color: Colors.green}}>
                            Buscar partido
                        </Button>
                    </View>
                    <View flex={1} p={2}>
                        <Button  p={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                        Tabla de registro
                        </Button>
                    </View>
                </View>

                <Text textAlign={'center'} mt={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>PRÓXIMOS JUEGOS</Text>
                <View mt={1} alignItems={'center'} flexDirection={'row'} justifyContent='center' mb={4}>
                <Image mr={1} source={iconGroupSmall} style={{width: 15, height: 15}}></Image>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'xs'}>GRUPO FIJO</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('CardPointScreen')}>
                <MatchItem mb={4} yellow={true}/>
                </TouchableOpacity>
                <View mt={4} flexDirection={'row'} justifyContent='center' mb={4}>
                <View mt={3} mr={2} width={'15%'} background={Colors.green} height={'2px'}/>
                <Text textAlign={'center'} mb={4} color={Colors.green} fontSize={'md'}>PARTIDOS FINALIZADOS</Text>
                <View mt={3} ml={2} width={'15%'} background={Colors.green} height={'2px'}/>

                </View>

                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>
                <MatchItem mb={4}/>

            
            </View>

        </LayoutV4>
    )
}


export default MatchesScreen;