import React, {useEffect, useState} from "react";
import {WebView} from 'react-native-webview';
import {Colors} from "../Colors";
import {Button, Spinner, Text, View} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import getVideoId from 'get-video-id';


const VideoPlayer = ({navigation, route}) => {
    const [videoURL, setVideoURL] = useState(null);
    const [loading, setLoading] = useState(null);
    const [source, setSource] = useState(null);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getEmbedCode(route.params.url)
            setLoading(false)
        }, 500)

    }, [route.params.id])

    const getEmbedCode = (videoURL) => {
        console.log(videoURL)
        let type = videoURL.includes('youtu') ? 'youtube' : 'vimeo';
        const { id } = getVideoId(videoURL);
        console.log(id)
        setSource({
            html: type === 'vimeo' ?
                `<meta name="viewport" content="width=device-width, initial-scale=1"><div style="width: 100%: height:100%:"><iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&transparent=1&controls=1&responsive=true" style="background-color: ${Colors.blue};position:absolute;top:0;left:0;width:100%;height:100%;"  frameborder="0" allow="autoplay; fullscreen; picture-in-picture" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>` :
                `<div style='height:100%; display:flex; justify-content: center; align-items: center;'>
                <iframe width="100%" height="600px" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                `
        })
    }

    return (
        <LayoutV3>
            <View flex={1}>
                <Text textAlign={'center'} mt={10} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Documentos de ayuda</Text>


                <View flex={1}>
                    {
                        loading === false &&
                        <WebView
                            bounces={false}
                            mixedContentMode={'always'}
                            style={{width: '100%', backgroundColor:'transparent'}}
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
                                    <Spinner size={'lg'} key={'abc'} color={Colors.primary}/>
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


export default VideoPlayer;