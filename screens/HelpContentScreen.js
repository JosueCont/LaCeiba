import React, {useEffect, useState} from "react";
import {ScrollView, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import DirectoryItem from "./HelpContentComponents/DirectoryItem";
import {getCategoriesDetail} from "../api/Requests";
import ManualItem from "./HelpContentComponents/ManualItem";
import {RefreshControl} from "react-native";
import LayoutV3 from "./Layouts/LayoutV3";
import TutorialItem from "./HelpContentComponents/TutorialItem";

const HelpContentScreen = ({navigation, route}) => {

    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        getDirectoryFunction()
    }, [route.params.id])

    const getDirectoryFunction = async () => {
        try {
            setLoading(true)
            const response = await getCategoriesDetail('/' + route.params.id)
            console.log(response.data)
            setContents(response.data.contents)
        } catch (e) {
            console.log(e, 20)
        } finally {
            setLoading(false)
        }
    }

    // const getDirectoryFunctionV2 = async () => {
    //     try {
    //         const response = await getCategoryDetail('/15')
    //         console.log(response.data)
    //     } catch (e) {
    //         console.log(e, 20)
    //     }
    // // }

    return (
        <LayoutV3>
            <View flex={1} mx={8}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            refreshing={loading}
                            onRefresh={getDirectoryFunction}
                        />
                    }
                    flex={1}
                    showsVerticalScrollIndicator={false}
                >
                    <Text textAlign={'center'} mt={10} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>{route.params.title}</Text>
                    <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>{route.params.description}</Text>

                    {
                        loading === true ?
                            <View>
                                <Skeleton borderRadius={10} mb={6}></Skeleton>
                                <Skeleton borderRadius={10} mb={6}></Skeleton>
                                <Skeleton borderRadius={10} mb={6}></Skeleton>
                                <Skeleton borderRadius={10} mb={6}></Skeleton>
                            </View> :
                            contents.map((item) => {
                                console.log(item)
                                if(!item.isVisible){
                                    return;
                                }
                                if (item.contentType === 'IMAGE' || item.contentType === 'PDF') {
                                    console.log(item)
                                    return (
                                        <ManualItem mb={4} navigation={navigation} title={item.title} url={item.fileUrl} type={item.contentType}></ManualItem>
                                    )
                                } else if (item.contentType === 'VIDEO') {
                                    console.log(item)
                                    return (
                                        <TutorialItem navigation={navigation} id={item.id} title={item.title} url={item.fileUrl}></TutorialItem>
                                    )
                                } else if (item.contentType === 'CONTACT') {
                                    console.log(item)
                                    return (
                                        <DirectoryItem navigation={navigation} mb={4} title={item.title} description={item.description}/>
                                    )
                                } else if (item.contentType === 'HTML') {
                                    return (
                                        <ManualItem mb={4} navigation={navigation} id={item.id} title={item.title} type={item.contentType} html={item.description}></ManualItem>
                                    )

                                } else {
                                    return (
                                        <Text color={'black'} textAlign={'center'}>{item.contentType} No available</Text>
                                    )
                                }
                            })
                    }
                </ScrollView>
                {/*  <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>
                <DirectoryItem mb={4}/>*/}
            </View>

        </LayoutV3>
    )
}


export default HelpContentScreen;