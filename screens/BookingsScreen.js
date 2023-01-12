import React, {useEffect, useState} from "react";
import {ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import BookinsItem from "./BookinsItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {getAllBookings, getAllInvitations} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";

const BookingsScreen = ({navigation, appDuck}) => {

    const [invitations, setInvitations] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused]);

    const getBookings = async () => {
        const queryString = `?limit=${100}`;
        const response = await getAllBookings(queryString);
        setBookings(response?.data?.items);
        //console.log(response?.data?.items);
    }

    const getInvitations = async () => {
        const queryString = `?userId=${appDuck.user.id}&limit=50`;

        const response = await getAllInvitations(queryString);
        setInvitations(response?.data?.items);
    }

    const getData = async () => {
        try {
            setLoading(true)
            await getBookings();
            await getInvitations();
            
            //console.log(moment(date).format('YYYY-MM-DD'));
        } catch (e) {
            console.log(e);
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

                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Mis reservaciones</Text>

                    {
                        invitations.map((invitation, index) => {
                            const date = new Date();
                            const dateToday = moment(date, 'YYYY-MM-DD');
                            const dateparsed = moment(invitation.booking?.dueDate, 'YYYY-MM-DD');
                            const diff = dateToday.diff(dateparsed, 'days'); 
                            return (
                                diff <= 0 &&
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('BookingsDetailScreen', {service: 'Campo de golf', state: "r", invitation: invitation, booking: bookings.find((booking) => booking.id == invitation?.booking?.id)})}>
                                    <BookinsItem mb={4} dataInvitation={invitation} dataBooking={bookings.find((booking) => booking.id == invitation?.booking?.id)} data={{state: invitation.status}}/>
                                </TouchableOpacity>
                            );
                        })
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


export default connect(mapState)(BookingsScreen);