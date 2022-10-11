import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../../Colors";
import iconCall from "../../assets/iconCall.png";
import {TouchableOpacity} from "react-native";
import {dialCall} from "../../utils";

const DirectoryItem = ({navigation, mb = 2, title = 'Title', description = 'Number'}) => {
    return (
        <TouchableOpacity onPress={() => dialCall(description)}>
            <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
                <View flex={1} justifyContent={'center'} pl={5}>
                    <Text color={Colors.green} fontSize={'xs'}>{title}</Text>
                </View>
                <View>
                    <View flex={1} justifyContent={'center'} alignItems={'center'}>
                        <Image source={iconCall} style={{width: 30, height: 30}}></Image>
                    </View>
                </View>
                <View flex={1} justifyContent={'center'}>
                    <Text textAlign={'center'} color={Colors.green} fontSize={'xs'}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default DirectoryItem;