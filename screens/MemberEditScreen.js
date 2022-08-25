import React from "react";
import {Button, Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {ImageBackground} from "react-native";
import bgButton from "../assets/bgButton.png";
import iconPersonEdit from "../assets/iconPersonEdit.png";

const MemberEditScreen = ({navigation}) => {


    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8}>

                <View alignItems={'center'} mt={10}>
                    <ImageBackground borderRadius={60} source={bgButton} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={iconPersonEdit}/>
                    </ImageBackground>
                </View>

                <Text textAlign={'center'} mt={6} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Miembro adicional:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    Raúl Rosas
                </Text>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Miembro de acción:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    123456789
                </Text>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Fecha de nacimiento:
                </Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    18 / septiembre / 1989
                </Text>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Correo electrónico:
                </Text>
                <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    dani89@gmail.com
                </Text>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'lg'}>
                    Teléfono:
                </Text>
                <Text textAlign={'center'} mb={10} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                    55 123 456 789
                </Text>
                <Button onPress={() => navigation.goBack()} mb={10}>Guardar</Button>


            </View>

        </LayoutV4>
    )
}


export default MemberEditScreen;