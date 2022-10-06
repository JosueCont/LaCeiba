import React, {useEffect, useState} from "react";
import {Button, Skeleton, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {getCategories} from "../api/Requests";

const HelpScreen = ({navigation}) => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        getCategoriesFunction();
    }, [])


    const getCategoriesFunction = async () => {
        try {
            setLoading(true)
            const response = await getCategories()
            console.log(response.data)
            setCategories(response.data)
        } catch (e) {
            console.log(e)
            alert(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutV3>
            <View flex={1} mx={20}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Documentos de ayuda</Text>


                {
                    loading === true ?
                        <View>
                            <Skeleton borderRadius={10} mb={6}></Skeleton>
                            <Skeleton borderRadius={10} mb={6}></Skeleton>
                            <Skeleton borderRadius={10} mb={6}></Skeleton>
                            <Skeleton borderRadius={10} mb={6}></Skeleton>
                        </View> :
                        <View>
                            {
                                categories.map((item) => {
                                    return (
                                        <Button onPress={() => navigation.navigate('DirectoryScreen')} mb={6}>{item.title}</Button>

                                    )
                                })
                            }
                        </View>
                }

            </View>

        </LayoutV3>
    )
}


export default HelpScreen;