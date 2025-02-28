import React, { useState } from "react";
import {Button, Checkbox, Icon, Input, Spinner, Text, View, ScrollView, Box} from "native-base";
import LayoutV3 from "./Layouts/LayoutV3";
import {Colors} from "../Colors";
import { createGuest, generatePass, getFreeServices } from "../api/Requests";
import { useEffect } from "react";
import { Calendar } from "react-native-calendars";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

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
    const isFocused = useIsFocused();

    

   /*  useFocusEffect(
        React.useCallback(() => {
          cleanData();
            getFS();
        }, [])
    ); */
    useEffect(()=>{
        if(isFocused){
            cleanData();
            getFS();
        }
    },[isFocused])

   /*  useEffect(()=>{
        const getFS = async () =>{
            const response = await getFreeServices();
            setFreeServices(response.data);
            console.log(response.data);
        }
        const result = getFS()
        .catch(console.error);
    }, []) */

    const getFS = async () =>{
        const response = await getFreeServices();
        setFreeServices(response.data);
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
                freeServices: [...groupValues],
                sendQrGenerated:true
            }
            const response = await generatePass(bodyString, [route?.params?.data?.user?.id, route?.params?.data?.id]);
            console.log(bodyString, response?.data);
            setLoading(false);
            //navigation.navigate("GuestGeneratePassSuccessScreen");  
            navigation.navigate('GuestGeneratePassQRScreen', {qrPass:response.data })  
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
                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={2}>
                    {route?.params?.data?.name}
                </Text>

                <Text color={Colors.primary} fontSize={'lg'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
                    Generar pase de acceso
                </Text>
                <Text color={Colors.primary} fontSize={'sm'} textAlign={'center'} fontFamily={'titleComfortaaBold'} mb={5}>
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
                                                    color: Colors.darkGray,
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
                                                    color: Colors.primary
                                                },
                                            },
                                            todayBackgroundColor: 'transparent',
                                            todayTextColor: Colors.primary,
                                            dayTextColor: Colors.primary,
                                            textDayFontSize: 14,
                                            arrowColor: Colors.secondary,
                                            width: '100%',
                                            selectedDayBackgroundColor: Colors.primary,
                                            selectedDayTextColor: '#ffffff',
                                        }}
                                    />
                <Text color={Colors.primary} fontSize={'md'} textAlign={'left'} fontFamily={'titleComfortaaBold'} mt={5}>
                    Área sin restricción
                </Text>

                <View pr={8}>
                        {freeServices.length > 0 && <Checkbox.Group
                            onChange={values => setGroupValues(()=>values || [])}
                            flexDirection={'column'}
                            alignItems={'flex-start'}
                            justifyContent={'center'}
                            mt={3}
                            defaultValue={groupValues}    
                            _checkbox={{
                                bgColor: 'white',
                                borderRadius: 3,
                                borderWidth: 0.5,
                                _checked: {
                                    bgColor: Colors.primary,
                                    borderColor: Colors.primary,
                                    borderWidth: 0.5,
                                },
                                _icon: {
                                    color: '#fff'
                                }
                            }}
                            >
                            {
                                freeServices.map((item, index) => {
                                    return (
                                        item.isActive === true &&
                                            <Checkbox key={index} mx={3} mb={3} value={(item.id).toString()} _text={{color: '#000'}} >
                                                <Text size={'md'} color={Colors.primary} numberOfLines={2}>{item.name}</Text>
                                            </Checkbox>

                                    )
                                })
                            }
                        </Checkbox.Group>
}
                    </View>
                <Button mb={5} mt={5} isDisabled={groupValues.length===0 || dateSelected === null} onPress={() => {generatePassAction();}}>{loading ? <Spinner size={'sm'} color={Colors.bgPrimaryText}></Spinner> : 'Generar pase'}</Button>
            </View>
            <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={true} iconType={'exclamation'} textButton={'Aceptar'} text={textModal}>

            </ModalInfo>
        </ScrollView>
        </LayoutV3>
    )
}


export default GuestGeneratePass;