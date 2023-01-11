import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import { ImageBackground, TouchableOpacity } from "react-native";
import {Button, Image, ScrollView, Text, View} from "native-base";
import React, { useState, useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { getAllGF, getGFNextBooking } from "../api/Requests";
import { useFocusEffect } from "@react-navigation/native";
import { dayWeek, formatHour } from "../utils";
import pin from "../assets/pin.png";
import iconBooking from "../assets/iconBooking.png";
import moment from "moment/moment";

const FixedGroups = ({appDuck, navigation, route}) => {

    const {groupFounded} = route?.params;
    const [group, setGroup] = useState({});
    const [allGroups, setAllGroups] = useState([]);
    //const [groupFounded, setGroupFounded] = useState(null);
    const [schedulesAvailable, setSchedulesAvailable] = useState([]);

    useEffect(()=>{
        
    },[])

    useFocusEffect(
        React.useCallback(() => {
          getAllFixedGroups();
          return () => {
            cleanData();
          };
        }, [])
    );

    useEffect(()=>{
        //console.log(groupFounded);
    }, [groupFounded])


    useEffect(()=>{
        
    }, [schedulesAvailable])

    const cleanData = () => {
        setGroup(null);
        //setGroupFounded(null);
        setSchedulesAvailable([]);
    }
    
    
    const getAllFixedGroups = async () => {
        try {
            const response = await getAllGF();
            setAllGroups(response?.data);
            for (const groupElement of response?.data) {
                for (const leader of groupElement.leaders) {
                    if(leader?.id == appDuck.user.id){
                        //setGroupFounded(groupElement);
                    }
                }
            }

            const responseNextBooking = await getGFNextBooking('', [appDuck.user.id])
            const existGroup = responseNextBooking?.data.find(element => element.id == groupFounded.id);
            if(existGroup){
                setGroup(existGroup);
            }else{
                setGroup({});
            }
            
        } catch (error) {
            console.log(error?.data);
        }
    }

    return(
        
        <LayoutV4 overlay={true}>
            <View flex={1} mx={8}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                flexGrow={1}>
            <View flex={1} mt={8} mb={4} mx={8}>
                <ImageBackground resizeMode={'contain'} source={bgButton} style={{ width: '100%', height: 67, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} borderRadius={60}>
                    <Text fontSize={'lg'}> {groupFounded?.name} </Text>
                    <Text fontSize={'sm'}> {groupFounded?.area?.service?.name} </Text>
                </ImageBackground>
            </View>
            {groupFounded && <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} textAlign={'center'} fontSize={'lg'} mb={8}> {groupFounded?.area?.name} </Text>}
            {
                groupFounded && group && groupFounded?.schedules?.sort((a, b) => {
                    const nameA = a.day.toUpperCase()
                    const nameB = b.day.toUpperCase()
                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
                }).map((value, index)=>{
                    const exist = group.schedules?.find(element => element.id == value.id);
                    return(
                        value.isActive && (
                            <TouchableOpacity disabled={!exist} key={index} onPress={() => {navigation.navigate('FixedGroupDetail', {schedule: value, groupData: groupFounded, userId: appDuck.user.id});}}>
                            <View flexDirection={'row'} bgColor={'#fff'} borderRadius={50} mb={4} paddingX={8} paddingY={2}>

                                <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={'md'} color={Colors.green}> {dayWeek[value.day].day} {formatHour(value.fromHour)} </Text>
                                <Text fontSize={'md'} color={Colors.green}>{!exist ? 'Integrantes confirmados' : 'Integrantes por confirmar'}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>)
                    )
                })
            }
            </ScrollView>
        </View>
        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}
export default connect(mapState)(FixedGroups)