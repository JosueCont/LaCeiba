import LayoutV4 from "./Layouts/LayoutV4"
import {Image as ImageRN, ImageBackground, RefreshControl, TouchableOpacity} from "react-native";
import {Button, Image, ScrollView, Text, View, useToast} from "native-base";
import React, {useState, useEffect} from "react";
import {Colors} from "../Colors";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import iconBooking from "../assets/iconBooking.png";
import SliderCustom from "../components/SliderCustom/SliderCustom";
import { getAllGF, getOneGF } from "../api/Requests";
import { loggedOutAction } from "../redux/ducks/appDuck";

import { imageImport } from "../organizations/assets/ImageImporter";
import Constants from "expo-constants";

const FixedGroupList = ({appDuck, loggedOutAction, navigation, route}) => {

    const [groupsFoundedDetail, setGroupsFoundedDetail] = useState([]);
    const {groupsFounded} = route?.params;
    const toast = useToast();

    useFocusEffect(
        React.useCallback(() => {
            setGroupsFoundedDetail([]);
            getDetailGroups();
        }, [])
    );

    const getDetailGroups = async () => {
        try {
            for (const group of groupsFounded) {
                const response = await getOneGF('', [group.id]);
                setGroupsFoundedDetail(groupsReference => [...groupsReference, response.data]);
            }    
        } catch (error) {
            console.log('error: ', error);
            if(error?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
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
                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Grupos fijos</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        flexGrow={1}>
                        {
                            (groupsFoundedDetail.length>0 ) && groupsFoundedDetail.map((value, index) => {
                                const groupTarget = groupsFounded?.find(group => group.id == value.id);
                                
                                const minP = groupTarget?.minPeople !== null && groupTarget?.minPeople !== undefined && groupTarget?.minPeople != -1 ? groupTarget?.minPeople : groupTarget?.area ? groupTarget?.area?.minPeople : null;
                                const maxP = groupTarget?.maxPeople !== null && groupTarget?.maxPeople !== undefined && groupTarget?.maxPeople != -1 ? groupTarget?.maxPeople : groupTarget?.area ? groupTarget?.area?.maxPeople : null;
                                if(!value.isActive){
                                    return;
                                }
                                return (
                                    <View key={index} flex={1} mb={4}>
                                        <TouchableOpacity disabled={!value.isActive} onPress={() => {
                                            if(!value.isActive) return;
                                            navigation.navigate('FixedGroups', {
                                                groupFounded: value,
                                                userId: appDuck.user.id,
                                                minPeople: minP,
                                                maxPeople: maxP
                                            });
                                        }}>
                                            <ImageBackground resizeMode={'stretch'} source={imageImport(Constants.expoConfig.slug).bgButton} style={{
                                                opacity: value.isActive ? 1 : 0.7,
                                                width: '100%',
                                                height: 67,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }} borderRadius={60}>
                                                <Text fontSize={'lg'}> {value?.name} </Text>
                                                <Text fontSize={'sm'}> {value?.area ? value?.area?.service?.name : value?.schedules?.length > 0 ? value?.schedules[0]?.area?.service?.name : ''} </Text>
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
export default connect(mapState, {loggedOutAction})(FixedGroupList)