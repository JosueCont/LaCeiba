import React, {useEffect, useState} from "react";
import {Colors} from "../Colors";
import {Button, Spinner, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import PdfReader from "rn-pdf-reader-js-improved";
import {useIsFocused} from "@react-navigation/native";
import ImageZoom from "react-native-image-pan-zoom";
import {Dimensions, Image} from "react-native";

const PDFAndImageViewer = ({navigation, route}) => {
    const [loading, setLoading] = useState(null);
    const [URL, setURL] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            console.log(route.params.url)
            setURL(route.params.url)
            setLoading(false)
        }, 500)
    }, [route.params.id, isFocused])


    return (
        <LayoutV3>
            <View flex={1}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>{route.params.title}</Text>
                <View flex={1}>
                    {
                        (loading === false && isFocused && URL.includes('pdf')) &&
                        <PdfReader

                            style={{height: '100%', width: '100%'}}
                            webviewStyle={{backgroundColor: '#D0DAD6'}}
                            withPinchZoom={true}
                            source={{
                                uri: URL
                            }}
                            webviewProps={{
                                startInLoadingState: false,
                                renderLoading: () => (
                                    <View bgColor={'#ccc'} width={'100%'} height={'100%'} alignItems={'center'}
                                          justifyContent={'center'}>
                                        <Spinner size={'lg'} key={'abc'} color={Colors.green}/>
                                    </View>
                                ),
                                cacheEnabled: false
                            }}
                            customStyle={{
                                readerContainer: {backgroundColor: '#D0DAD6'},
                                readerContainerDocument: {backgroundColor: '#D0DAD6'}
                            }}

                        />
                    }

                    {
                        (loading === false && isFocused && !URL.includes('pdf')) &&
                        <View flex={1} bgColor={'transparent'}>
                            <ImageZoom
                                cropWidth={Dimensions.get('window').width}
                                cropHeight={Dimensions.get('window').height}
                                imageWidth={Dimensions.get('window').width}
                                imageHeight={Dimensions.get('window').height}
                            >
                                <Image
                                    onLoadEnd={() => {
                                        console.log('....')
                                        setLoading(false)
                                    }}
                                    onError={() => {
                                        setLoading(false)
                                    }}
                                    style={{backgroundColor: 'transparent', width: '100%', height: Dimensions.get('window').height / 1.5, resizeMode: 'contain'}}
                                    source={{uri: URL}}
                                    alt="img"
                                />
                            </ImageZoom>
                        </View>

                    }

                </View>
                <View py={10} px={5}>
                    <Button onPress={() => navigation.goBack()}>Regresar</Button>
                </View>
            </View>
        </LayoutV3>
    )
}


export default PDFAndImageViewer;