import React, {useEffect, useState} from "react";
import {Input, ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import GuestItem from "./GuestItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {getGuests, validatePartner} from "../api/Requests";
import LayoutV5 from "./Layouts/LayoutV5";
import {connect} from "react-redux";
import _ from 'lodash';

const GuestsScreen = ({navigation, appDuck}) => {

    const [loading, setLoading] = useState(null);
    const [guests, setQuests] = useState([]);
    const [guestsFiltered, setQuestsFiltered] = useState([]);


    useEffect(() => {
        getQuestsFunction()
    }, [])

    const getQuestsFunction = async () => {
        try {
            setLoading(true)
            const response = await getGuests('')
            setQuests(response.data)
            setQuestsFiltered(response.data)
            console.log(response)
        } catch (e) {
            console.log(e)
            alert(e.data.message)
        } finally {
            setLoading(false)
        }
    }

    const verifyStatus = async (item) => {
        try {
            const response = await validatePartner(`/${appDuck.user.id}/partners/validate`)
            if (response.data.status === 'true') {
                navigation.navigate('GuestGeneratePassScreen', {guest: item})
            } else {
                navigation.navigate('QRNonPaymentScreen')
            }
        } catch (ex) {
            console.log(ex)
            alert(ex.data.message)
        }

    }

    const search = async (value) => {
        let filtered = _.filter(guests, function (item) {
            return item.nombre.toLowerCase().includes(value.toLowerCase()) || item.apellidoPaterno.toLowerCase().includes(value.toLowerCase()) || item.apellidoMaterno.toLowerCase().includes(value.toLowerCase())
        });
        setQuestsFiltered(filtered)
    }


    return (
        <LayoutV5>
            <View flex={1}>
                {/*<View mb={4} mt={10} flexDirection={'row'} justifyContent={'center'} mx={8}>*/}
                {/*    <View>*/}
                {/*        <Icon as={MaterialIcons} name={'circle'} color={Colors.yellow}/>*/}
                {/*    </View>*/}
                {/*    <View>*/}
                {/*        <Text color={Colors.green}>Invitado exclusivo para restaurantes</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <View flex={1}>
                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Invitados</Text>

                    <View mx={10}>
                        <Input placeholder={'Buscar'} onChangeText={(v) => search(v)}/>
                    </View>

                    <ScrollView
                        mt={5}
                        _contentContainerStyle={{flexGrow: 1}}
                        ScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.green}
                                refreshing={loading}
                                onRefresh={getQuestsFunction}
                            />
                        }>

                        <View mx={8}>
                            {
                                guestsFiltered.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => verifyStatus(item)}>
                                            <GuestItem mb={4} item={item}/>
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

export default connect(mapState)(GuestsScreen)