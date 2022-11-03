import React, {useState} from "react";
import {ScrollView, Text, View} from "native-base";
import {Colors} from "../Colors";
import MemberItem from "./MemberItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import LayoutV3 from "./Layouts/LayoutV3";
import {getAdditionalMembers} from "../api/Requests";
import {connect} from "react-redux";

const MembersScreen = ({navigation, appDuck}) => {
    const [loading, setLoading] = useState(null);

    console.log(appDuck)
    const getMembersFunction = async () => {
        try {
            setLoading(true)
            const response = await getAdditionalMembers('/')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutV3>
            <View flex={1} mx={8}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.green}
                            refreshing={loading}
                            onRefresh={getMembersFunction}
                        />
                    }
                    flex={1}>
                    <Text textAlign={'center'} mt={10} mb={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>Miembros adicionales</Text>


                    <TouchableOpacity onPress={() => navigation.navigate('MemberEditScreen')}>
                        <MemberItem mb={4}/>
                    </TouchableOpacity>

                    <MemberItem mb={4}/>
                    <MemberItem mb={4}/>
                    <MemberItem mb={4}/>
                    <MemberItem mb={4}/>
                    <MemberItem mb={4}/>
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

export default connect(mapState)(MembersScreen);