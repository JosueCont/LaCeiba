import React, {useState} from 'react'
import {Button, ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";

const BookingDetailScreen = ({navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)

    return (
        <View flex={1}>
            <View bgColor={Colors.green}>
                <SliderCustom
                    height={200}
                    items={[
                        {image: ImageRN.resolveAssetSource(require('../assets/imageGolf2.png')).uri},

                    ]}
                    position={sliderPosition}
                    setPosition={setSliderPosition}/>
            </View>
            <View flex={1} mx={10}>
                <ScrollView flexGrow={1} pt={10}>
                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>CAMPO DE GOLF</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18} textAlign={'center'}>ID DE RESERVACIÓN: H5L36</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>

                    <View mx={10} mb={6}>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={18}>
                            Miércoles 27 de julio

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={18}>
                            De 9:30 am a 11:30 am

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={18}>
                            4 personas

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={18}>
                            2 socios

                        </Text>
                        <Text color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={18}>
                            2 invitados
                        </Text>


                    </View>
                    <Button onPress={() => navigation.goBack()} mb={4}>Código QR</Button>
                    <Button onPress={() => navigation.goBack()} mb={4}>Modificar reservación</Button>
                    <Button onPress={() => navigation.goBack()} mb={4}>Cancelar reservación</Button>
                    <Button onPress={() => navigation.goBack()} mb={4}>Partidos</Button>


                </ScrollView>

            </View>

        </View>
    )
}

export default BookingDetailScreen;