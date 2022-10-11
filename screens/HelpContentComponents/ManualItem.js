import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../../Colors";
import iconDownload from "../../assets/iconDownload.png";
import iconView from "../../assets/iconView.png";
import {TouchableOpacity} from "react-native";

const ManualItem = ({navigation, mb = 2, title = 'Title', url = ''}) => {


    return (
        <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} pl={5}>
                <Text color={Colors.green} fontSize={'xs'}>{title}</Text>
            </View>
            <View flex={0.4} mx={5} flexDirection={'row'}>
                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image source={iconDownload} style={{width: 30, height: 30}}></Image>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PDFAndImageViewer', {url: url})}>
                    <View flex={1} justifyContent={'center'} alignItems={'center'}>
                        <Image source={iconView} style={{width: 30, height: 30}}></Image>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default ManualItem;