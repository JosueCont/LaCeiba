import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Button, Image, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { getAllGF, getGFNextBooking } from "../api/Requests";
import { useFocusEffect } from "@react-navigation/native";
import { dayWeek, formatHour } from "../utils";

const FixedGroupList = ({appDuck, navigation, route}) => {

    const [group, setGroup] = useState({});
    const [allGroups, setAllGroups] = useState([]);
    const [groupFounded, setGroupFounded] = useState(null);
    const [groupsFounded, setGroupsFounded] = useState([]);
    const [schedulesAvailable, setSchedulesAvailable] = useState([]);

    useEffect(()=>{
        
    },[])

    useFocusEffect(
        React.useCallback(() => {
          cleanData();
          getAllFixedGroups();
          return () => {
            cleanData();
          };
        }, [])
    );

    

    const cleanData = () => {
        setGroup(null);
        setGroupFounded(null);
        setGroupsFounded([]);
        setSchedulesAvailable([]);
    }
    
    useEffect(()=>{
        console.log(groupsFounded.length);
    }, [groupsFounded])

    
    const getAllFixedGroups = async () => {
        try {
            const response = await getAllGF();
            setAllGroups(response?.data);
            for (const groupElement of response?.data) {
                for (const leader of groupElement.leaders) {
                    if(leader?.id == appDuck.user.id){
                        setGroupsFounded([...groupsFounded, groupElement]);
                    }
                }
            }
            
            
        } catch (error) {
            console.log(error?.data);
        }
    }
    

    return(
        
        <LayoutV4 white={true} overlay={true}>
            <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'xl'}> Mis grupos fijos </Text>
            {
                groupsFounded.map((value, index)=>{
                    
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