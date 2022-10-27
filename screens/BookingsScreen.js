import React, {useEffect, useState} from "react";
import {ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import BookinsItem from "./BookinsItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {getAllBookings, getAllInvitations} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";

const BookingsScreen = ({navigation, appDuck}) => {

    const [invitations, setInvitations] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        getData()
    }, []);

    const getBookings = async () => {
        const queryString = `?limit=${100}&sort=desc`;
        const response = await getAllBookings(queryString);
        setBookings(response?.data?.items);
        //console.log("Bookings", response.data);
    }

    const getInvitations = async () => {
        const queryString = `?userId=${appDuck.user.id}&limit=50`;

        const response = await getAllInvitations(queryString);
        setInvitations(response?.data?.items);
        //console.log(response.data);
    }

    const getData = async () => {
        try {
            setLoading(true)
            await getBookings();
            await getInvitations();
        } catch (e) {

        } finally {
            setLoading(false)
        }

    }

    return (
        <LayoutV3>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Mis reservaciones</Text>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getData}
                        />
                    }
                    flexGrow={1}>


                    {
                        invitations.map((invitation, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen', {service: 'Campo de golf', state: "r", invitation: invitation, booking: bookings.find((booking) => booking.id == invitation?.booking?.id)})}>
                                    <BookinsItem mb={4} dataInvitation={invitation} dataBooking={bookings.find((booking) => booking.id == invitation?.booking?.id)} data={{service: 'Campo de golf', state: invitation.status}}/>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>

                {/* <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen', {service : 'Campo de golf', state : "r"})}>
                    <BookinsItem mb={4} data={{service : 'Campo de golf', state : "r"}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen',  {service : 'Campo de golf', state : "c"})}>
                    <BookinsItem mb={4} data={{service : 'Campo golf', state : "c"}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen',  {service : 'Campo de golf', state : "p"})}>
                    <BookinsItem mb={4} data={{service : 'Campo golf', state : "p"}} />
                </TouchableOpacity> */}

                {/* <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/>
                <BookinsItem mb={4}/> */}

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