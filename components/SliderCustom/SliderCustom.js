import React, {useEffect, useState} from 'react'
import {Icon, Image, ScrollView, Skeleton, View} from "native-base";
import {useSwipeCustom} from "./useSwipeCustom";
import * as Haptics from 'expo-haptics';
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";


const SliderCustom = ({height, items, position, setPosition}) => {
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
        <ScrollView bounces={false} _contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
            <View width={'100%'}>
                {
                    loading ?
                        <Skeleton variant="rect" height={height}/> :
                        <View>
                            <Image alt={'Image'} source={{uri: currentImage}}
                                   style={{height: height, width: '100%', resizeMode: 'cover'}}
                            />
                            <View flexDir={'row'} height={height} width={'100%'} style={{position: 'absolute'}}>
                                <TouchableOpacity style={{flex: 1}}
                                                  onPress={() => position > 0 ? onSwipeRight() : () => {
                                                  }}>
                                    <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                        {
                                            position > 0 &&
                                            <Icon as={MaterialIcons} name={'keyboard-arrow-left'} size={'4xl'}
                                                  color={'white'}></Icon>
                                        }

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}}
                                                  onPress={() => position < items.length - 1 ? onSwipeLeft() : () => {
                                                  }}>
                                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>

                                        {
                                            position < items.length - 1 &&
                                            <Icon as={MaterialIcons} name={'keyboard-arrow-right'} size={'4xl'}
                                                  color={'white'}></Icon>
                                        }

                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

export default SliderCustom;