import React, {useEffect} from "react";
import {Text, View} from "native-base";
import {Colors} from "../../Colors";
import LayoutV4 from "../Layouts/LayoutV4";
import DirectoryItem from "../HelpContentComponents/DirectoryItem";
import {getCategoriesDetail, getCategoryDetail} from "../../api/Requests";
import {useIsFocused} from "@react-navigation/native";

const DirectoryScreen = ({navigation}) => {

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getDirectoryFunction()
            getDirectoryFunctionV2()
        }
    }, [isFocused])

    const getDirectoryFunction = async () => {
        try {
            const response = await getCategoriesDetail('/14')
            console.log(response.data)
        } catch (e) {
            console.log(e, 20)
        }
    }

    const getDirectoryFunctionV2 = async () => {
        try {
            const response = await getCategoryDetail('/15')
            console.log(response.data)
        } catch (e) {
            console.log(e, 20)
        }
    }

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


export default DirectoryScreen;