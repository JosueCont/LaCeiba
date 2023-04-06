import React, { useState } from "react";
import {Button, Checkbox, Icon, Input, Spinner, Text, View, ScrollView, Box} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import { createGuest, generatePass, getFreeServices } from "../api/Requests";
import { useEffect } from "react";
import { Calendar } from "react-native-calendars";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from "@react-navigation/native";

const GuestGeneratePass = ({navigation, route}) => {

    const [freeServices, setFreeServices] = useState([])
    const [groupValues, setGroupValues] = useState([]);
    const [dateSelected, setDateSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('Ocurrió un error, intenta más tarde.');
    const [markedDates, setMarkedDates] = useState(null);
    const tomorrow = new Date().setDate(new Date().getDate() + 1)
    const today = new Date().setDate(new Date().getDate())
    const todayPlus7 = new Date()
    todayPlus7.setDate(new Date().getDate() + 5)

    

    useFocusEffect(
        React.useCallback(() => {
          cleanData();
            getFS();
        }, [])
    );

    useEffect(()=>{
        const getFS = async () =>{
            const response = await getFreeServices();
            setFreeServices(response.data);
            console.log(response.data);
        }
        const result = getFS()
        .catch(console.error);
    }, [])

    const getFS = async () =>{
        const response = await getFreeServices();
        setFreeServices(response.data);
        console.log(response.data);
    }

    const cleanData = ()=>{
        setMarkedDates(null);
        setDateSelected(null);
        setGroupValues([]);
        setLoading(false);
    }

    const generatePassAction = async()=>{
        try {
            if(loading) return;
            setLoading(true);
       
            const bodyString = {
                expirationDate: dateSelected,
                freeServices: groupValues
            }
            const response = await generatePass(bodyString, [route?.params?.data?.user?.id, route?.params?.data?.id]);
            console.log(response?.data);
            setLoading(false);
            navigation.navigate("GuestGeneratePassSuccessScreen");    
        } catch (error) {
            console.log(error?.data);
            setLoading(false);
            setModalInfoVisible(true);
        }
        
    }

    const markDay = (day) => {
        let markedDaysObjs = []//disabledDay();
        if (day) {
            markedDaysObjs[day] = {selected: true, marked: true}
        }
        setMarkedDates(markedDaysObjs)
    }


    return (
        <LayoutV3>

            <ScrollView
                showsVerticalScrollIndicator={false}
                flexGrow={1}>
            <View flex={1} mx={10} mt={8} justifyContent={'center'}>
                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={2}>
                    {route?.params?.data?.name}
                </Text>

                <Text color={Colors.green} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Generar pase de acceso
                </Text>
                <Text color={Colors.green} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Seleccione la fecha que desea asignar el acceso a este invitado
                </Text>

                <Calendar
                            
                                        minDate={today}
                                        maxDate={todayPlus7}
                                        onDayPress={day => {
                                            console.log(day.dateString);
                                            setDateSelected(day.dateString);
                                            markDay(day.dateString);
                                            // if (area) {
                                            //     let pointsDayValue = _.find(area?.calendarDays, {day: moment(day.dateString).locale('en').format('dddd')}).points;
                                            //     setPointsDay(pointsDayValue)
                                            //     recalculePoints(pointsDayValue)

                                            // }
                                            // setDate(day.dateString)
                                            // setFieldValue("date", day.dateString)
                                            // setShowCalendar(false)
                                        }}
                                        onDayLongPress={day => {
                                            console.log('selected day', day);
                                        }}
                                        monthFormat={'MMMM yyyy'}
                                        onMonthChange={month => {
                                            //console.log('month changed', month);
                                        }}

                                        hideExtraDays={true}

                                        firstDay={1}
                                        onPressArrowLeft={subtractMonth => subtractMonth()}
                                        onPressArrowRight={addMonth => addMonth()}
                                        disableAllTouchEventsForDisabledDays={true}
                                        enableSwipeMonths={true}
                                        date={dateSelected}
                                        markedDates={markedDates}
                                        theme={{
                                            'stylesheet.calendar.header': {
                                                monthText: {
                                                    color: Colors.gray,
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
                                            todayBackgroundColor: Colors.gray,
                                            todayTextColor: '#ffffff',
                                            dayTextColor: Colors.green,
                                            textDayFontSize: 14,
                                            arrowColor: Colors.yellow,
                                            width: '100%',
                                            selectedDayBackgroundColor: Colors.green,
                                            selectedDayTextColor: '#ffffff',
                                        }}
                                    />
                <Text color={Colors.green} fontSize={'sm'} textAlign={'left'} fontFamily={'titleComfortaaBold'} mt={5}>
                    Área sin restricción
                </Text>

                <View pr={8}>
                        <Checkbox.Group
                            onChange={setGroupValues}
                            flexDirection={'column'}
                            alignItems={'flex-start'}
                            justifyContent={'center'}
                            mt={3}
                            value={groupValues}    
                            _checkbox={{
                                bgColor: 'white',
                                borderWidth: 0.5,
                                _checked: {
                                    bgColor: Colors.green,
                                    borderColor: Colors.green
                                },
                                _icon: {
                                    color: '#fff'
                                }
                            }}>
                            {
                                freeServices.map((item, index) => {
                                    return (
                                        item.isActive === true &&
                                            <Checkbox mx={3} mb={2} value={item.id} _text={{color: '#000'}} >
                                                <Text color={Colors.green} numberOfLines={2}>{item.name}</Text>
                                            </Checkbox>

                                    )
                                })
                            }
                        </Checkbox.Group>
                    </View>
                <Button mb={5} mt={5} isDisabled={groupValues.length===0 || dateSelected === null} onPress={() => {generatePassAction();}}>{loading ? <Spinner size={'sm'} color={'white'}></Spinner> : 'Generar pase y enviar'}</Button>
                <Text color={Colors.green} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={1}>
                    Este pase será enviado a
                </Text>
                <Text color={Colors.green} underline={true} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    {route?.params?.data?.email}
                </Text>
            </View>
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={textModal}>

            </ModalInfo>
        </ScrollView>
        </LayoutV3>
    )
}


export default GuestGeneratePass;