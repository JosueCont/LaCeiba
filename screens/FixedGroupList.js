import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import {Image as ImageRN, ImageBackground, RefreshControl, TouchableOpacity} from "react-native";
import {Button, Image, ScrollView, Text, View} from "native-base";
import React, {useState, useEffect} from "react";
import {Colors} from "../Colors";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import iconBooking from "../assets/iconBooking.png";
import SliderCustom from "../components/SliderCustom/SliderCustom";

const FixedGroupList = ({appDuck, navigation, route}) => {

    const {groupsFounded} = route?.params;

    return (

        <LayoutV4 white={true} overlay={true}>
            <View flex={1}>
                <View>
                    <ImageBackground
                        source={{uri: ImageRN.resolveAssetSource(require('../assets/bgFixedGroups.png')).uri}}
                        style={{height: 180}}/>
                </View>
                <View flex={1} mx={10}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        flexGrow={1}>
                        <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Grupos fijos</Text>
                        {
                            groupsFounded && groupsFounded.map((value, index) => {
                                return (
                                    <View key={index} flex={1} mb={4}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('FixedGroups', {
                                                groupFounded: value,
                                                userId: appDuck.user.id
                                            });
                                        }}>
                                            <ImageBackground resizeMode={'contain'} source={bgButton} style={{
                                                width: '100%',
                                                height: 67,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }} borderRadius={60}>
                                                <Text fontSize={'lg'}> {value?.name} </Text>
                                                <Text fontSize={'sm'}> {value?.area?.service?.name} </Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                )

                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}
export default connect(mapState)(FixedGroupList)