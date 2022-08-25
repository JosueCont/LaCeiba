import React from "react";
import {Icon, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import GuestItem from "./GuestItem";
import {MaterialIcons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

const GuestsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <View mb={4} mt={10} flexDirection={'row'} justifyContent={'center'}>
                    <View>
                        <Icon as={MaterialIcons} name={'circle'} color={Colors.yellow}/>
                    </View>
                    <View>
                        <Text color={Colors.green}>Invitado exclusivo para restaurantes</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('GuestGeneratePassScreen')}>
                    <GuestItem mb={4}/>
                </TouchableOpacity>
                <GuestItem mb={4}/>
                <GuestItem mb={4}/>
                <GuestItem mb={4}/>
                <GuestItem mb={4}/>
                <GuestItem mb={4}/>
            </View>
        </LayoutV4>
    )
}


export default GuestsScreen;