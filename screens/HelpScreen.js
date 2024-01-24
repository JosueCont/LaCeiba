import React, {useEffect, useState} from "react";
import {Button, ScrollView, Skeleton, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {getCategories} from "../api/Requests";
import {RefreshControl} from "react-native";

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
            <View flex={1}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            refreshing={loading}
                            onRefresh={getCategoriesFunction}
                        />
                    }
                    flex={1}>
                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={20} textTransform={'uppercase'}>Club de Golf La Hacienda</Text>

                    <View flex={1} mx={20}>
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
                                categories.map((item, idx) => {
                                    console.log(item)
                                    return (
                                        <Button key={idx} onPress={() => navigation.navigate('HelpContentScreen', {id: item.id, title: item.title, description: item.description})} mb={6}>{item.title}</Button>

                                    )
                                })
                            }
                            </View>
                    }
                    </View>
                </ScrollView>
            </View>
        </LayoutV3>
    )
}


export default HelpScreen;