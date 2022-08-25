import React, {useState} from "react";
import {Button, View} from "native-base";
import Layout from "./Layouts/Layout";
import {loggedOutAction} from "../redux/ducks/appDuck";
import {connect} from "react-redux";

const ComponentsScreen = ({navigation, loggedOutAction}) => {

    const [modalInfoVisible, setModalInfoVisible] = useState(null)
    const [modalResendSMSVisible, setModalResendSMSVisible] = useState(null)
    const [modalCompletedVisible, setModalCompletedVisible] = useState(null)
    const [modalRequestSentVisible, setModalRequestSentVisible] = useState(null)


    return (
        <Layout overlay={true}>
            <View flex={1} justifyContent={'center'} mx={10}>
                <Button onPress={() => navigation.navigate('HomeScreen')} mb={2}>Home screen</Button>

            </View>

        </Layout>
    )
}

const mapState = () => {
    return {}
}

export default connect(mapState, {loggedOutAction})(ComponentsScreen)