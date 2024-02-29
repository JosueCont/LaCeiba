import React, { useState } from "react";
import { ScrollView, Text, View } from "native-base";
import { Colors } from "../Colors";
import BuysItems from "./BuysItems";
import _ from 'lodash';
import { RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";

import { connect } from "react-redux";

const BuysScreen = ({ route, navigation, appDuck }) => {

    const [loading, setLoading] = useState(null);

    const getBuys = async () => {
        setLoading(true)
        setLoading(false)
    }
    const buysDummy = [
        {
            id: 'SX99976',
            name: 'Puntos Invitados',
            date: '05/05/2023',
            price: '$1,500',
            image: 'https://images.vexels.com/content/144761/preview/gold-coins-icon-6b1d7a.png',
            count: 10,
            paymentData: {
                titularName: 'Francisco Guzman',
                cardNumber: '**** 2345'
            }
        },
        {
            id: 'SX99977',
            name: 'Guantes de Golf',
            date: '05/05/2023',
            price: '$1,500',
            image: 'https://www.buengolpe.com/club-de-golf/sites/default/files/guantesG%3AFORE.jpg',
            count: 2,
            paymentData: {
                titularName: 'Francisco Guzman',
                cardNumber: '**** 2345'
            }
        },
        {
            id: 'SX99978',
            name: 'Playeras Polo',
            date: '05/05/2023',
            price: '$3,000',
            image: 'https://http2.mlstatic.com/D_NQ_NP_858800-MLM44302691305_122020-O.jpg',
            count: 2,
            paymentData: {
                titularName: 'Francisco Guzman',
                cardNumber: '**** 2345'
            }
        },
        {
            id: 'SX99979',
            name: 'Palo de Golf',
            date: '05/05/2023',
            price: '$3,000',
            image: 'https://minutogolf.com/wp-content/uploads/2021/05/tipos-palos-golf-madera1024x400-min.jpg',
            count: 1,
            paymentData: {
                titularName: 'Francisco Guzman',
                cardNumber: '**** 2345'
            }
        },

    ]

    return (
        <LayoutV5>
            <View flex={1}>
                <View flex={1}>
                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Mis compras</Text>

                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.primary}
                                refreshing={loading}
                                onRefresh={getBuys}
                            />
                        }>

                        <View mx={8}>
                            {
                                buysDummy.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('BuysItemDetailScreen', { item })
                                        }}>
                                            <BuysItems mb={4} item={item} />
                                        </TouchableOpacity>


                                    )
                                })
                            }
                        </View>

                    </ScrollView>
                </View>
            </View>
        </LayoutV5>
    )
}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BuysScreen)