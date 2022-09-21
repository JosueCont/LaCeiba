import React, {useEffect, useState} from "react";
import {ScrollView, View} from "native-base";
import {Colors} from "../Colors";
import GuestItem from "./GuestItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import {getGuests, validatePartner} from "../api/Requests";
import LayoutV5 from "./Layouts/LayoutV5";
import {connect} from "react-redux";

const GuestsScreen = ({navigation, appDuck}) => {

    const [loading, setLoading] = useState(null);
    const [guests, setQuests] = useState([]);

    useEffect(() => {
        getQuestsFunction()
    }, [])

    const getQuestsFunction = async () => {
        try {
            setLoading(true)
            const response = await getGuests('')
            setQuests(response.data)
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
            alert(ex)
        }

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
                <View flex={1} mt={10}>
                    <ScrollView
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
                                guests.map((item) => {
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