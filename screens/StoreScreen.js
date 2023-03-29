import React, { useEffect, useState } from "react";
import { Button, Input, ScrollView, Text, View } from "native-base";
import { Colors } from "../Colors";
import StoreItem from "./StoreItem";
import { RefreshControl, TouchableOpacity } from "react-native";
import LayoutV5 from "./Layouts/LayoutV5";
import { connect } from "react-redux";
import _ from 'lodash';
import { errorCapture } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const StoreScreen = ({ navigation, appDuck }) => {

    const [loading, setLoading] = useState(null);
    useEffect(() => {
    }, [])

    useFocusEffect(
        React.useCallback(() => {
        }, [])
    );

    const getProducts = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    return (
        <LayoutV5>
            <View flex={1}>
                <View flex={1}>

                    <Text textAlign={'center'} mt={8} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Tienda en Linea</Text>
                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{ flexGrow: 1 }}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getProducts}
                            />
                        }>
                        <View mx={8}>
                            <StoreItem navigation={navigation} mb={5} />
                            <StoreItem navigation={navigation} mb={5} />
                            <StoreItem navigation={navigation} mb={5} />
                            <StoreItem navigation={navigation} mb={5} />
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

export default connect(mapState)(StoreScreen)