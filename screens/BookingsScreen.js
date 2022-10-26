import React from "react";
import {Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import BookinsItem from "./BookinsItem";
import {TouchableOpacity} from "react-native";
import { useEffect } from "react";
import {connect} from "react-redux";
import { getAllBookings, getAllInvitations } from "../api/Requests";
import { useState } from "react";

const BookingsScreen = ({navigation, appDuck}) => {

    const [invitations, setInvitations] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        getBookings();
        getInvitations();
    }, []);

    const getBookings = async () => {
        const queryString = `?limit=${100}`;
        const response = await getAllBookings(queryString);
        setBookings(response?.data?.items);
        //console.log("Bookings", response.data);
    }

    const getInvitations = async () => {
        const queryString = `?userId=${appDuck.user.id}`;
       
        const response = await getAllInvitations(queryString);
        setInvitations(response?.data?.items);
        //console.log(response.data);
    }

    return (
        <LayoutV4>
            <View flex={1} mx={8}>

                <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Mis reservaciones</Text>

                {
                    invitations.map((invitation, index)=>{
                        return(
                            <TouchableOpacity onPress={() => navigation.navigate('BookingsDetailScreen', {service : 'Campo de golf', state : "r", invitation: invitation, booking: bookings.find((booking)=>booking.id == invitation?.booking?.id) })}>
                            <BookinsItem mb={4} dataInvitation={invitation} dataBooking={bookings.find((booking)=>booking.id == invitation?.booking?.id)} data={{service : 'Campo de golf', state : invitation.status}  }/>
                            </TouchableOpacity>
                        );
                    })
                }


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

        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}


export default connect(mapState)(BookingsScreen);