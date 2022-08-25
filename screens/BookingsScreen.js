import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import BookinsItem from "./BookinsItem";
import {TouchableOpacity} from "react-native";

const BookingsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Mis reservaciones</Text>


                <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen')}>
                    <BookinsItem mb={4}/>
                </TouchableOpacity>

                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>

            </View>

        </LayoutV4>
    )
}


export default BookingsScreen;