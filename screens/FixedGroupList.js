import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Button, Image, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const FixedGroupList = ({appDuck, navigation, route}) => {

    const {groupsFounded} = route?.params;

    return(
        
        <LayoutV4 white={true} overlay={true}>
            <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'xl'}> Mis grupos fijos </Text>
            {
                groupsFounded && groupsFounded.map((value, index)=>{
                    
                    return(
                       (<TouchableOpacity key={index} onPress={() => {navigation.navigate('FixedGroups', {groupFounded: value, userId: appDuck.user.id});}}>
                            <View mt={6} ml={10} mr={10} flex={1} justifyContent={'center'} alignItems={'center'}>
                                <ImageBackground source={bgButton} style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} borderRadius={60}>
                                    <Text fontSize={'md'}> {value?.name} </Text>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>)
                    )
                    
                })
            }
            
        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}
export default connect(mapState)(FixedGroupList)