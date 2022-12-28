import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Image, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { getAllGF, getGFNextBooking } from "../api/Requests";
import { useFocusEffect } from "@react-navigation/native";
import { dayWeek, formatHour } from "../utils";

const FixedGroups = ({appDuck, navigation, route}) => {

    const [group, setGroup] = useState({});
    const [allGroups, setAllGroups] = useState([]);
    const [groupFounded, setGroupFounded] = useState(null);
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
        setGroupFounded(null);
        setSchedulesAvailable([]);
    }
    
    
    const getAllFixedGroups = async () => {
        try {
            const response = await getAllGF();
            setAllGroups(response?.data);
            for (const groupElement of response?.data) {
                for (const leader of groupElement.leaders) {
                    if(leader?.id == appDuck.user.id){
                        setGroupFounded(groupElement);
                    }
                }
            }

            const responseNextBooking = await getGFNextBooking('', [appDuck.user.id])
            if(responseNextBooking?.data[0]){
                setGroup(responseNextBooking?.data[0]);
            }else{
                setGroup({schedules: [{id: 61}, {id: 64}]});
            }
            
        } catch (error) {
            console.log(error?.data);
        }
    }

    const checkDisableSchedule = (sched) => {
        for (const schedule of group.schedules) {
            for (const scheduleGroupFounded of groupFounded.schedules) {
                if(schedule.id == scheduleGroupFounded.id && !schedulesAvailable.includes(schedule.id)){
                    setSchedulesAvailable([...schedulesAvailable, schedule.id]);
                }
            }
        }
        console.log(schedulesAvailable.includes(sched.id));
        return !schedulesAvailable.includes(sched.id);
    }

    return(
        
        <LayoutV4 white={true} overlay={true}>
            <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'xl'}> Mi grupo fijo </Text>
            {groupFounded && <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'lg'}> {groupFounded?.name} </Text>}
            {groupFounded && <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'md'}> {groupFounded?.area?.service?.name} </Text>}
            {groupFounded && <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'md'}> {groupFounded?.area?.name} </Text>}
            {
                groupFounded && group && groupFounded?.schedules?.map((value, index)=>{
                    const exist = group.schedules?.find(element => element.id == value.id);
                    return(
                        value.isActive && (<TouchableOpacity disabled={!exist} key={index} onPress={() => {navigation.navigate('FixedGroupDetail', {schedule: value, groupData: groupFounded, userId: appDuck.user.id});}}>
                            <View mt={4} flex={1} justifyContent={'center'} alignItems={'center'}>
                                <ImageBackground source={bgButton} style={{width: '90%', height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                                    <Text fontSize={'md'}> {dayWeek[value.day].day} {formatHour(value.fromHour)} </Text>
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
export default connect(mapState)(FixedGroups)