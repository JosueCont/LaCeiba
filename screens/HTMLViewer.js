import React, {useEffect, useState} from "react";
import {WebView} from 'react-native-webview';
import {Colors} from "../Colors";
import {Button, Spinner, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {useIsFocused} from "@react-navigation/native";

const HTMLViewer = ({navigation, route}) => {
    const [videoURL, setVideoURL] = useState(null);
    const [loading, setLoading] = useState(null);
    const [source, setSource] = useState(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setSource({html: route.params.htmlString})
            setLoading(false)
        }, 500)

    }, [route.params.id, isFocused])


    return (
        <LayoutV3>
            <View flex={1}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>{route.params.title}</Text>


                <View flex={1}>
                    {
                        (loading === false && isFocused) &&
                        <WebView
                            bounces={false}
                            mixedContentMode={'always'}
                            style={{width: '100%'}}
                            allowsFullscreenVideo={true}
                            source={source}
                            javaScriptEnabled={true}
                            //injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                            onNavigationStateChange={(v) => {
                                // console.log(v)
                            }}
                            startInLoadingState={true}
                            renderLoading={() => (
                                <View width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                    <Spinner size={'lg'} key={'abc'} color={Colors.green}/>
                                </View>
                            )}
                            automaticallyAdjustContentInsets={false}
                            scalesPageToFit={true}
                            originWhitelist={['*']}
                            allowsInlineMediaPlayback={true}
                            mediaPlaybackRequiresUserAction={true}
                            contentMode={'mobile'}
                        />
                    }

                </View>
                <View py={10} px={5}>
                    <Button onPress={() => navigation.goBack()}>Regresar</Button>

                </View>
            </View>
        </LayoutV3>
    )
}


export default HTMLViewer;