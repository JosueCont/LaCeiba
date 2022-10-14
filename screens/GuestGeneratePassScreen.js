import React, {useEffect, useState} from "react";
import {Button, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import {generateGuestsQR} from "../api/Requests";
import ModalInfo from "./Modals/ModalInfo";
import {Calendar} from "react-native-calendars";
import Constants from "expo-constants";
import {connect} from "react-redux";
import {disabledDay} from "../utils";


const GuestGeneratePassScreen = ({navigation, route, appDuck}) => {

    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [date, setDate] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);

    const today = new Date()
    const todayPlus7 = new Date()
    todayPlus7.setDate(new Date().getDate() + 7)


    useEffect(() => {
        getDisabledDays()
    }, [route.params.guest.idInvitado])

    const generateQuestQRFunction = async () => {
        try {
            const data = {
                "idInvitado": route.params.guest.idInvitado,
                "guestName": route.params.guest.nombre + ' ' + route.params.guest.apellidoPaterno + ' ' + route.params.guest.apellidoMaterno,
                "guestEmail": Constants.manifest.extra.debug === true ? Constants.manifest.extra.debugEmail : route.params.guest.mail,
                "expirationDate": date
            }
            const response = await generateGuestsQR(data, [appDuck.user.id])
            console.log(response.data)
            navigation.navigate('GuestGeneratePassSuccessScreen')
        } catch (ex) {
            console.log(ex)
            if (ex.status === 400) {
                setModalText('El invitado tiene 3 invitaciones este mes')
                setModalVisible(true);
            } else {
                setModalText(ex.data.message)
                setModalVisible(true);
            }

        }
    }

    const getDisabledDays = (day) => {
        let markedDaysObjs = disabledDay();
        markedDaysObjs[day] = {selected: true, marked: true}
        setMarkedDates(markedDaysObjs)
    }


    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={10} mt={10}>
                {/*<View alignItems={'center'} mt={10} mb={6}>*/}
                {/*    <ImageBackground borderRadius={60} source={imagePerson2} style={{height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>*/}
                {/*    </ImageBackground>*/}
                {/*</View>*/}
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'lg'}>{route.params.guest.nombre} {route.params.guest.apellidoPaterno}</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'lg'} adjustsFontSizeToFit numberOfLines={1}>GENERAR PASE DE ACCESO</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'} adjustsFontSizeToFit numberOfLines={2}>Seleccione la fecha que desea {'\n'}asignar el acceso a este invitado</Text>
                <View mb={6}>
                    <Calendar
                        minDate={today}
                        maxDate={todayPlus7}
                        onDayPress={day => {
                            console.log('selected day', day);
                            setDate(day.dateString)
                            getDisabledDays(day.dateString)
                        }}
                        onDayLongPress={day => {
                            console.log('selected day', day);
                        }}
                        monthFormat={'MMMM yyyy'}
                        onMonthChange={month => {
                            console.log('month changed', month);
                        }}

                        hideExtraDays={false}
                        firstDay={1}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        markedDates={markedDates}
                        theme={{
                            'stylesheet.calendar.header': {
                                monthText: {
                                    color: Colors.green,
                                    fontWeight: '700',
                                    fontSize: 20,
                                },
                                dayHeader: {
                                    marginTop: 2,
                                    marginBottom: 7,
                                    width: 30,
                                    textAlign: 'center',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: Colors.green
                                },
                            },
                            todayTextColor: Colors.green,
                            dayTextColor: Colors.green,
                            textDayFontSize: 14,
                            arrowColor: Colors.yellow,
                            width: '100%',
                            selectedDayBackgroundColor: Colors.green,
                            selectedDayTextColor: '#ffffff',
                        }}
                    />
                </View>

                <Button onPress={() => generateQuestQRFunction()} mb={6}>Generar pase y enviar</Button>
                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>Este pase será enviado a:</Text>
                <Text textAlign={'center'} mb={6} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>{route.params.guest.mail}</Text>
            </View>

            <ModalInfo text={modalText} visible={modalVisible} setVisible={setModalVisible} textButton={'Entendido'} iconType={'exclamation'} close={true}/>
        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(GuestGeneratePassScreen)