import {Image, Text, View} from "native-base";
import React from "react";
import {ImageBackground, TouchableOpacity} from "react-native";
import {Colors} from "../../Colors";
import bgPlay from '../../assets/bgPlay.png'
import bgTutorial2 from '../../assets/bgTutorial2.png';


const TutorialsItem = ({navigation, id = null, title = 'Title', mb = 5, url = null}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', {id: id, title: title, url: url})}>
            <View mb={5}>
                <ImageBackground source={bgTutorial2} style={{height: 220, borderRadius: 20, overflow: 'hidden'}}>
                    <View width={'100%'} position={'absolute'} bottom={0} p={2} bgColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                        <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{title}</Text>
                    </View>
                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                        <Image source={bgPlay}/>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

export default TutorialsItem;