import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import imageTenis from '../assets/imgTenis.png'
import imgGolf from '../assets/imgGolf.png'
import {TouchableOpacity} from "react-native";

const GroupScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Grupos fijos</Text>
                <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Consulta y edita</Text>

                <TouchableOpacity onPress={() => navigation.navigate('GroupEditScreen')}>
                    <View mb={10} borderRadius={20} overflow={1}>
                        <View style={{zIndex: 0}}>
                            <Image source={imgGolf}/>
                        </View>

                        <View alignItems={'center'} justifyContent={'center'} height={50} width={'100%'} bgColor={Colors.green} style={{bottom: 0, position: 'absolute', zIndex: 1}}>
                            <Text fontSize={'lg'}>Grupo de golf</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('GroupEditScreen')}>
                    <View mb={10} borderRadius={20} overflow={1}>
                        <View style={{zIndex: 0}}>
                            <Image source={imageTenis}/>
                        </View>

                        <View alignItems={'center'} justifyContent={'center'} height={50} width={'100%'} bgColor={Colors.green} style={{bottom: 0, position: 'absolute', zIndex: 1}}>
                            <Text fontSize={'lg'}>Grupo de golf</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </LayoutV4>
    )
}


export default GroupScreen;