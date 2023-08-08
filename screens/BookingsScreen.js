import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import BookinsItem from "./BookinsItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {getAllBookings, getAllInvitations} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import { loggedOutAction } from "../redux/ducks/appDuck";

const BookingsScreen = ({navigation, loggedOutAction, appDuck}) => {

    const [invitations, setInvitations] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();
    const [emptyBookings, setEmptyBookings] = useState(null)
    const toast = useToast();

    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused]);

    const getBookings = async () => {
        const queryString = `?limit=${100}`;
        const response = await getAllBookings(queryString);
        setBookings(response?.data?.items);

    }

    const getInvitations = async () => {
        const queryString = `?userId=${appDuck.user.id}&limit=50`;

        const response = await getAllInvitations(queryString);
        setInvitations(response?.data?.items);
        let validateDate= response?.data?.items.map((invitation) => {
            const date = new Date();
            const dateToday = moment(date, 'YYYY-MM-DD');
            const dateparsed = moment(invitation.booking?.dueDate, 'YYYY-MM-DD');
            const diff = dateToday.diff(dateparsed, 'days'); 
            if(diff <= 0 && invitation?.booking){
                return true
            }else{
                return false
            }
              
        })
       let filterBooking = validateDate.filter(data => data)
       filterBooking.length > 0 ? setEmptyBookings(false) : setEmptyBookings(true)
    }
    

    const getData = async () => {
        try {
            setLoading(true)
            await getBookings();
            await getInvitations();
            
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
        <LayoutV3>
            <View flex={1} mx={4}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getData}
                        />
                    }
                    flexGrow={1}>

                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>MIS RESERVACIONES</Text>

                    { !emptyBookings &&
                        invitations.map((invitation, index) => {
                            const date = new Date();
                            const dateToday = moment(date, 'YYYY-MM-DD');
                            const dateparsed = moment(invitation.booking?.dueDate, 'YYYY-MM-DD');
                            const diff = dateToday.diff(dateparsed, 'days');                             
                            return (
                                diff <= 0 && invitation?.booking &&
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('BookingsDetailScreen', {invitation_id: invitation.id})}>
                                    <BookinsItem mb={4} dataInvitation={invitation} dataBooking={bookings.find((booking) => booking.id == invitation?.booking?.id)} data={{state: invitation.status}}/>
                                </TouchableOpacity>
                            );
                          
                        })
                    }

                    {
                       emptyBookings && 
                       <Text textAlign={'center'} mt={5} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'md'}>Sin Reservaciones</Text>
                    }
                </ScrollView>
            </View>
        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState, {loggedOutAction})(BookingsScreen);