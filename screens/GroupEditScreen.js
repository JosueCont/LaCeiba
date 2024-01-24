import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import GroupEditItem from "./GroupEditItem";

const GroupEditScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Grupo fijo de golf</Text>


                <GroupEditItem mb={4}/>
                <GroupEditItem mb={4}/>
                <GroupEditItem mb={4}/>
                <GroupEditItem mb={4}/>
                <GroupEditItem mb={4}/>
                <GroupEditItem mb={4}/>


            </View>

        </LayoutV4>
    )
}


export default GroupEditScreen;