import {Button, ScrollView, Text, View} from "native-base";
import React, {useEffect, useState} from "react";
import {ImageBackground, RefreshControl} from "react-native";
import {getAllServices} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {useIsFocused} from "@react-navigation/native";
import _ from "lodash";

const BookingScreen = ({navigation}) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getServices();
        }
    }, [isFocused])

    const getServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices('');
            let servicesSort = _.sortBy(response.data.items, ['name'], ['asc']);
            setServices(servicesSort);

            setLoading(false);
        } catch (e) {
            alert(JSON.stringify(e))

        }

    }

    return (
        <LayoutV3>
            <View flex={1} mx={8}>
                <ScrollView
                    mt={6}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getServices}
                        />
                    }
                    flexGrow={1}>
                    {
                        services.map((service, index) => {
                            console.log(service)
                            return (
                                <View mb={5}>
                                    <View>
                                        <ImageBackground source={{uri: service.fileUrl}} style={{height: 180}} borderRadius={20}>

                                            <View style={{
                                                borderRadius: 20,
                                                height: "100%",
                                                width: "100%",
                                                position: 'absolute',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            }}/>
                                        </ImageBackground>
                                        <View width={'100%'} height={180} position={'absolute'}>
                                            <View flex={1}>
                                                <View flex={1} p={4}>
                                                    <Text fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{service?.name.toUpperCase()} </Text>
                                                </View>
                                                <View flex={1} flexDirection={'row'}>
                                                    <View flex={1}>

                                                    </View>
                                                    <View flex={1} justifyContent={'flex-end'} p={2}>
                                                        <Button onPress={() => navigation.navigate('BookingCollectDataScreen', {clean: true, service: service})}>Reservar</Button>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

        </LayoutV3>
    )
}

export default BookingScreen;