import React, {useEffect, useState} from "react";
import {ScrollView, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import MemberItem from "./MemberItem";
import {RefreshControl, TouchableOpacity} from "react-native";
import LayoutV3 from "./Layouts/LayoutV3";
import {getAdditionalMembers} from "../api/Requests";
import {connect} from "react-redux";

const MembersScreen = ({navigation, appDuck}) => {
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        getMembersFunction()
    }, [])

    const getMembersFunction = async () => {
        try {
            setLoading(true)
            const response = await getAdditionalMembers('/' + appDuck.user.partner.accion)
            setData(response.data)
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


                    {
                        loading === true ?
                            <Skeleton height={90} borderRadius={50}></Skeleton> :
                            loading === false &&
                            data.map((item,idx) => {
                                console.log(item)
                                return (
                                    <TouchableOpacity key={idx} onPress={() => navigation.navigate('MemberEditScreen',{member:item})}>
                                        <MemberItem name={item.nombreSocio} mb={4}/>
                                    </TouchableOpacity>
                                )
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

export default connect(mapState)(MembersScreen);