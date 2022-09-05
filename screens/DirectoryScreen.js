import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import DirectoryItem from "./DirectoryItem";

const ManualsScreen = ({navigation}) => {


    return (
        <LayoutV4>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Directorio</Text>
                <Text textAlign={'center'} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Contáctanos</Text>

                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
            </View>

        </LayoutV4>
    )
}


export default ManualsScreen;