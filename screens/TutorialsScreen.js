import LayoutV4 from "./Layouts/LayoutV4";
import {Image, Text, View} from "native-base";
import React from "react";
import {ImageBackground} from "react-native";
import {Colors} from "../Colors";
import bgPlay from '../assets/bgPlay.png'
import bgTutorial1 from '../assets/bgTutorial1.png';
import bgTutorial2 from '../assets/bgTutorial2.png';
import bgTutorial3 from '../assets/bgTutorial3.png';


const TutorialsScreen = ({navigation}) => {
    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8}>
                <Text textAlign={'center'} mt={10} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Video tutoriales</Text>
                <Text textAlign={'center'} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'lg'}>Resolvemos tus dudas</Text>

                <View mb={5}>
                    <ImageBackground source={bgTutorial1} style={{height: 220, borderRadius: 20, overflow: 'hidden'}}>
                        <View width={'100%'} position={'absolute'} bottom={0} p={2} bgColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                            <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                        </View>
                        <View flex={1} alignItems={'center'} justifyContent={'center'}>
                            <Image source={bgPlay}/>
                        </View>
                    </ImageBackground>
                </View>


                <View mb={5}>
                    <ImageBackground source={bgTutorial2} style={{height: 220, borderRadius: 20, overflow: 'hidden'}}>
                        <View width={'100%'} position={'absolute'} bottom={0} p={2} bgColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                            <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                        </View>
                        <View flex={1} alignItems={'center'} justifyContent={'center'}>
                            <Image source={bgPlay}/>
                        </View>
                    </ImageBackground>
                </View>

                <View mb={5}>
                    <ImageBackground source={bgTutorial3} style={{height: 220, borderRadius: 20, overflow: 'hidden'}}>
                        <View width={'100%'} position={'absolute'} bottom={0} p={2} bgColor={Colors.primary} alignItems={'center'} justifyContent={'center'}>
                            <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>Campo de golf</Text>
                        </View>
                        <View flex={1} alignItems={'center'} justifyContent={'center'}>
                            <Image source={bgPlay}/>
                        </View>
                    </ImageBackground>
                </View>
            </View>

        </LayoutV4>
    )
}

export default TutorialsScreen;