import React, {useEffect, useState} from 'react'
import {Icon, ScrollView, Skeleton, View} from "native-base";
import {useSwipeCustom} from "./useSwipeCustom";
import * as Haptics from 'expo-haptics';
import {Dimensions, TouchableOpacity, Image} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import ImageZoom from 'react-native-image-pan-zoom';


const SliderCustomScoreCard = ({height, items, position, setPosition}) => {
    const {onTouchStart, onTouchEnd} = useSwipeCustom(onSwipeLeft, onSwipeRight, 4)
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setCurrentImage(items[position].image)
    }, [])

    function onSwipeLeft() {
        if (position < items.length - 1) {
            setLoading(true)

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            let newPosition = position + 1;
            setPosition(newPosition)
            setCurrentImage(items[newPosition].image)
            setTimeout(() => {
                setLoading(false)
            }, 500)

        } else {
            console.log('Limit')
        }
    }


    function onSwipeRight() {
        console.log(position, items.length)
        if (position > 0) {
            setLoading(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            let newPosition = position - 1;
            setPosition(newPosition)
            setCurrentImage(items[newPosition].image)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        } else {
            console.log('Limit')
        }
    }

    return (
       
            <View width={'100%'} height={'100%'}>
                { loading ?
                    <Skeleton variant="rect" height={height}/> :
                    <View flexDir={'row'} height={'100%'} width={'100%'}>
                                
                        { position > 0 &&
                            <TouchableOpacity 
                                style={{width: 40, height: 40, top: Dimensions.get('window').height/2 -20, position: 'absolute', zIndex:9}}
                                onPress={() => position > 0 ? onSwipeRight() : () => {}}
                            >
                                <Icon as={MaterialIcons} name={'keyboard-arrow-left'} size={'4xl'} color={'#9c9c9c'}/>
                            </TouchableOpacity>
                        }
                        { position < items.length - 1 &&
                            <TouchableOpacity 
                                style={{width: 40, height: 40, right:0, top: Dimensions.get('window').height/2 -20, position: 'absolute', zIndex:9}}
                                onPress={() => position < items.length - 1 ? onSwipeLeft() : () => {}}>
                                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                    <Icon as={MaterialIcons} name={'keyboard-arrow-right'} size={'4xl'} color={'#9c9c9c'}/>
                                </View>
                            </TouchableOpacity>
                        }
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height}
                            imageWidth={Dimensions.get('window').width - 20}
                            imageHeight={height}
                            panToMove={true}
                            style={{height: height, width: '100%'}}
                        >
                            <Image alt={'Image'} source={{uri: currentImage}} style={{height: height, width: '100%', resizeMode: 'contain'}} />
                        </ImageZoom>
                    </View>
                }
            </View>
    )
}

export default SliderCustomScoreCard;