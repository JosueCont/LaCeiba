import React, {useState} from 'react'
import {ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";

const ServicesDetailScreen = ({navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)

    return (
        <View flex={1}>
            <View bgColor={Colors.green}>
                <SliderCustom
                    height={250}
                    items={[
                        {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide01.png')).uri},
                        {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide02.png')).uri},
                        {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide03.png')).uri},
                        {image: ImageRN.resolveAssetSource(require('../assets/slider/Slide04.png')).uri},

                    ]}
                    position={sliderPosition}
                    setPosition={setSliderPosition}/>
            </View>
            <View flex={1} mx={10}>
                <ScrollView flexGrow={1} pt={10}>
                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18}>AEROBICS</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>
                    <Text color={Colors.gray} fontSize={12}>
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.
                        {'\n'}{'\n'}
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed .
                    </Text>
                    <Text color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={16} mb={4} mt={6}>Horarios</Text>
                    <View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Lunes</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Martes</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Miércoles</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Jueves</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Viernes</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Sábado</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} mb={2}>
                            <View width={100} borderRightWidth={1.5} mr={4}>
                                <Text color={'#000'}>Domingo</Text>
                            </View>
                            <View flex={1}>
                                <Text color={'#000'}>07:00 am - 4:00 pm</Text>
                            </View>
                        </View>

                    </View>

                </ScrollView>

            </View>

        </View>
    )
}

export default ServicesDetailScreen;