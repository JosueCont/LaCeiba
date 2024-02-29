import {Button, Icon, Text, View, Image, ScrollView, useToast} from "native-base";
import iconGroupSmall from "../assets/iconGroupSmall.png";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import MatchItem from "./MatchItem";
import {MaterialIcons} from "@expo/vector-icons";
import {TouchableOpacity, RefreshControl} from "react-native";
import React, { useEffect, useState } from "react";
import {useIsFocused} from "@react-navigation/native";
import {connect} from "react-redux";
import {getAllPartnersScoreCards} from "../api/Requests";
import moment from "moment";
import { loggedOutAction } from "../redux/ducks/appDuck";




const MatchesScreen = ({navigation, loggedOutAction, appDuck}) => {

    const [todayMatches,setTodayMatches] = useState([])
    const [pastMatches,setPastMatches] = useState([])
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const toast = useToast();


    useEffect(() => {
        if (isFocused) {
            getData()
            console.log(appDuck)
        }
    }, [isFocused]);


    const getMatches = async () => {

        const response = await getAllPartnersScoreCards('', [appDuck.user.id])
        let todayDate = moment().format('YYYY-MM-DD')
       let formatMatches = response?.data.sort((a, b) => b.id - a.id);
        let dayMatches = formatMatches.filter(e => e.booking.dueDate === todayDate)
        setTodayMatches(dayMatches);       
        let pastMatches = formatMatches.filter(e => e.booking.dueDate < todayDate)
        setPastMatches(pastMatches);       
    }
    const getData = async () => {
        try {
            setLoading(true)
            await getMatches();
            
            //console.log(moment(date).format('YYYY-MM-DD'));
        } catch (e) {
            console.log(e);
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction()
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <LayoutV4>
            <View flex={1} mx={8} mb={5}>
            <View mx={12} flexDirection={'row'} mt={5}>
                    <View flex={1} p={2}>
                        <Button  p={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} onPress={()=> navigation.navigate('ScoreCardRegistryTableScreen')}>
                        Registro de ventajas
                        </Button>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            refreshing={loading}
                            onRefresh={getData}
                        />
                    }
                    flexGrow={1}>
                <Text textAlign={'center'} mt={2} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>JUEGOS DEL DÍA</Text>
                <View mt={1} alignItems={'center'} flexDirection={'row'} justifyContent='center' mb={4}>
                {/* <Image mr={1} source={iconGroupSmall} style={{width: 15, height: 15}}></Image> */}
                {/* <Text textAlign={'center'} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'xs'}>GRUPO FIJO</Text> */}
                </View>
                    {
                        
                        todayMatches.map((matche, index) => {
                            let hourMatche = moment(matche.booking.dueTime, 'HH:mm').format('HH')
                            let hourMatcheToday = moment().format('HH')
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('CardPointScreen', {dataScore: matche })}>
                                    <MatchItem mb={4} dataMatche={matche} yellow={ hourMatche === hourMatcheToday ? true : false}/>
                                </TouchableOpacity>
                            );
                        })
                    }
                    { todayMatches.length === 0 &&
                        <Text textAlign={'center'} mb={4} color={Colors.primary} fontSize={'sm'}>No hay proximos juegos</Text>
                    }
                <View mt={4} flexDirection={'row'} justifyContent='center' mb={4}>
                <View mt={3} mr={2} width={'15%'} background={Colors.primary} height={'2px'}/>
                <Text textAlign={'center'} mb={4} color={Colors.primary} fontSize={'md'}>JUEGOS FINALIZADOS</Text>
                <View mt={3} ml={2} width={'15%'} background={Colors.primary} height={'2px'}/>

                </View>
                { pastMatches.length > 0 &&
                        pastMatches.map((matche, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('CardPointScreen', {dataScore: matche })}>
                                    <MatchItem mb={4} dataMatche={matche}/>
                                </TouchableOpacity>
                            );
                        })
                }
                { pastMatches.length === 0 &&
                <Text textAlign={'center'} mb={4} color={Colors.primary} fontSize={'sm'}>No hay proximos juegos</Text>
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


export default connect(mapState, {loggedOutAction})(MatchesScreen);