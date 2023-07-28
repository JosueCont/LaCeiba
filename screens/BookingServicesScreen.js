import {Button, ScrollView, Text, View, useToast} from "native-base";
import React, {useEffect, useState} from "react";
import {ImageBackground, RefreshControl} from "react-native";
import {getAllServices} from "../api/Requests";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import _ from "lodash";
import {errorCapture} from "../utils";
import ModalInfo from "./Modals/ModalInfo";
import { loggedOutAction } from '../redux/ducks/appDuck';

const BookingServicesScreen = ({navigation, loggedOutAction}) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(null);
    const [getActiveStatus, setGetActiveStatus] = useState({isActive: true, reason: "Esta es una razón"});
    const [textModalInfo, setTextModalInfo] = useState("");
    const [modalInfo, setModalInfo] = useState(null);
    const isFocused = useIsFocused();
    const toast = useToast();

    useFocusEffect(
        React.useCallback(() => {
          if(!getActiveStatus.isActive){
            setTextModalInfo(`Su cuenta presenta un bloqueo.\nrazón:\n ${getActiveStatus.reason} `)
            setModalInfo(true);
          }
        }, [])
    );


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
            let v = await errorCapture(e);
            alert(v.value)
            if(e?.data?.message == 'Unauthorized'){
                toast.show({
                    description: "Sin autorización. Inicie sesión nuevamente"
                })
                loggedOutAction();
            }

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

            <ModalInfo
                setVisible={setModalInfo}
                visible={modalInfo}
                close={false}
                title="Cuenta inactiva"
                text={textModalInfo}
                textButton="Entendido"
                action={()=>{navigation.goBack();}}>
            </ModalInfo>

        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState, {loggedOutAction}) (BookingServicesScreen);