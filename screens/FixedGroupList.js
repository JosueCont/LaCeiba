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
import { getOneGF } from "../api/Requests";

const FixedGroupList = ({appDuck, navigation, route}) => {

    const [groupsFoundedDetail, setGroupsFoundedDetail] = useState([]);
    const {groupsFounded} = route?.params;

    useFocusEffect(
        React.useCallback(() => {
            setGroupsFoundedDetail([]);
            getDetailGroups();
        }, [])
    );

    const getDetailGroups = async () => {
        try {
            for (const group of groupsFounded) {
                console.log(group.id);
                const response = await getOneGF('', [group.id]);
                console.log(response.data);
                setGroupsFoundedDetail([...groupsFoundedDetail, response.data]);
            }    
        } catch (error) {
            console.log('error: ', error);
        }
        
    }

    return (

        <LayoutV4 white={true} overlay={true}>
            <View flex={1}>
                <View>
                    <ImageBackground
                        source={{uri: ImageRN.resolveAssetSource(require('../assets/bgFixedGroups.png')).uri}}
                        style={{height: 180}}/>
                </View>
                <View flex={1} mx={10}>
                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Grupos fijos</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        flexGrow={1}>
                        {
                            groupsFoundedDetail.length>0 && groupsFoundedDetail.map((value, index) => {
                                const groupTarget = groupsFounded?.find(group => group.id == value.id);
                                const minP = groupTarget.area.minPeople;
                                const maxP = groupTarget.area.maxPeople;
                                return (
                                    <View key={index} flex={1} mb={4}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('FixedGroups', {
                                                groupFounded: value,
                                                userId: appDuck.user.id,
                                                minPeople: minP,
                                                maxPeople: maxP
                                            });
                                        }}>
                                            <ImageBackground resizeMode={'stretch'} source={bgButton} style={{
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