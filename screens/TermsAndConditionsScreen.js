import React, {useState} from 'react'
import {ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import {Image as ImageRN} from "react-native";
import SliderCustom from "../components/SliderCustom/SliderCustom";

const TermsAndConditionsScreen = ({navigation}) => {
    const [sliderPosition, setSliderPosition] = useState(0)

    return (
        <View flex={1}>
            <View bgColor={Colors.green}>
                <SliderCustom
                    height={180}
                    items={[
                        {image: ImageRN.resolveAssetSource(require('../assets/bgTerms.png')).uri},

                    ]}
                    position={sliderPosition}
                    setPosition={setSliderPosition}/>
            </View>
            <View flex={1} mx={10}>
                <ScrollView flexGrow={1} pt={10}>
                    <Text color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={18}>TÉRMINOS Y CONDICIONES</Text>
                    <View borderWidth={1} borderColor={Colors.yellow} my={4}/>
                    <Text color={Colors.gray} fontSize={12}>
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.
                        {'\n'}{'\n'}
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed .
                    </Text>
                    <Text color={Colors.gray} fontSize={12}>
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.
                        {'\n'}{'\n'}
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed .
                    </Text>
                    <Text color={Colors.gray} fontSize={12}>
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed.
                        {'\n'}{'\n'}
                        Lorem ipsum dolor sit amet. Ut dolorem rerum quo molestias praesentium sit soluta fugiat ut maxime necessitatibus sed .
                    </Text>

                </ScrollView>

            </View>

        </View>
    )
}

export default TermsAndConditionsScreen;