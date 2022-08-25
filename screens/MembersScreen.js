import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import MemberItem from "./MemberItem";
import {TouchableOpacity} from "react-native";

const MembersScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Miembros adicionales</Text>


                <TouchableOpacity onPress={() => navigation.navigate('MemberEditScreen')}>
                    <MemberItem mb={4}/>
                </TouchableOpacity>

                <MemberItem mb={4}/>
                <MemberItem mb={4}/>
                <MemberItem mb={4}/>
                <MemberItem mb={4}/>
                <MemberItem mb={4}/>

            </View>

        </LayoutV4>
    )
}


export default MembersScreen;