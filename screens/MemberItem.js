import React from "react";
import {Image, Text, View} from "native-base";
import {Colors} from "../Colors";
import iconDetail from '../assets/iconDetail.png'
import _ from "lodash";

const MemberItem = ({navigation, mb = 2, name = 'Name'}) => {


    return (
        <View flexDirection={'row'} height={90} bgColor={'#fff'} borderRadius={50} mb={mb}>
            {/*<View flex={1} justifyContent={'center'} alignItems={'center'}>*/}

            {/*    <Image source={iconPerson} style={{width: 55, height: 55}} borderRadius={60}/>*/}
            {/*</View>*/}

            <View flex={1} justifyContent={'center'} pl={10}>
                <Text color={Colors.green} fontSize={'sm'}>{_.startCase(name.toLowerCase())}</Text>
            </View>
            <View borderWidth={1} height={'60%'} alignSelf={'center'} mr={3} borderColor={Colors.yellow}/>
            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                <Image source={iconDetail} style={{width: 30, height: 30}}></Image>
            </View>
        </View>
    )
}


export default MemberItem;