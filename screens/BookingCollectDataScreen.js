import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Icon, Select, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import ModalConfirmBooking from "./Modals/ModalConfirmBooking";
import {Calendar} from "react-native-calendars";
import {TouchableOpacity} from "react-native";
import moment from 'moment';
import 'moment/locale/es';
import {MaterialIcons} from "@expo/vector-icons";
import {disabledDay} from "../utils";

moment.locale('es');

const BookingCollectDataScreen = ({navigation}) => {
    const [modalConfirmBooking, setModalConfirmBooking] = useState(null)
    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [date, setDate] = useState(null);
    const [markedDate, setMarkedDate] = useState(null);
    const [disabledDays, setDisabledDays] = useState([])
    const [loading, setLoading] = useState(null);
    const [showCalendar, setShowCalendar] = useState(null);
    const [hours, setHours] = useState(null);


    const tomorrow = new Date().setDate(new Date().getDate() + 1)
    const todayPlus7 = new Date()
    todayPlus7.setDate(new Date().getDate() + 7)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getHoursFunction()
            setLoading(false)
        }, 500)
    }, [])



    const getHoursFunction = () => {
        setHours([
            {label: '7:10 am', value: '7:10'},
            {label: '7:20 am', value: '7:20'}

        ])
    }


    return (
        <LayoutV4>
            <View flex={1} mx={12} my={10}>


                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Instalación | Servicio
                    </Text>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'xl'}>
                        Campo de golf
                    </Text>
                </View>


                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Fecha
                    </Text>

                    {
                        showCalendar === true ?
                            <Calendar
                                minDate={tomorrow}
                                maxDate={todayPlus7}
                                onDayPress={day => {
                                    setDate(day.dateString)
                                    // let selected = {};
                                    // selected[day.dateString] = {selected: true, marked: true}
                                    // setMarkedDate(selected)
                                    setShowCalendar(false)
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
                                markedDates={disabledDay()}
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
                            /> :
                            <TouchableOpacity onPress={() => {
                                setShowCalendar(!showCalendar)
                            }}>
                                <View height={50} bgColor={'#fff'} borderRadius={30} alignItems={'center'} justifyContent={'center'}>
                                    <Text color={'#000'}>{date ? moment(date).format('dddd, DD MMMM YYYY') : 'Selecciona una fecha'}</Text>
                                </View>
                            </TouchableOpacity>
                    }


                </View>

                <View>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Horario
                    </Text>

                    {
                        loading === true ?
                            <Skeleton></Skeleton> :
                            loading === false &&
                            <Select
                                onValueChange={(v) => {

                                }}
                                placeholder="Seleccionar">
                                {
                                    hours.map((item) => {
                                        return (
                                            <Select.Item label={item.label} value={item.value}/>

                                        )
                                    })
                                }
                            </Select>
                    }


                </View>
                <View mb={6} mt={2}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'sm'}>Tiempo para reservar 3:52</Text>
                </View>


                <View mb={6}>
                    <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Elige las personas
                    </Text>
                    <View height={75} bg={'#fff'} mb={2} flexDirection={'row'} borderRadius={10}>
                        <View width={65} alignItems={'center'} justifyContent={'center'}>
                            <Icon as={MaterialIcons} name={'check-circle'} size={'2xl'} color={'#50C878'}></Icon>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text color={'#000'}>Eduardo Couoh</Text>
                            <Text color={'#000'} fontSize={11}>Socio organizador</Text>
                        </View>

                    </View>
                    <View height={75} bg={'#fff'} mb={2} flexDirection={'row'}>
                        <View width={65} alignItems={'center'} justifyContent={'center'}>
                            <Icon as={MaterialIcons} name={'check-circle'} size={'2xl'} color={'#50C878'}></Icon>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text color={'#000'}>Eduardo Couoh</Text>
                            <Text color={'#000'} fontSize={11}>Socio organizador</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('BookingCollectDataSearchScreen')}>
                        <View height={75} bg={'rgba(255,255, 255,1)'} mb={2} flexDirection={'row'} borderStyle={'dashed'} borderWidth={1.5}>
                            <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={14} color={'#000'}>Seleccionar persona</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>


                {/*  <View flexDirection={'row'} mb={6}>
                    <View flex={1} p={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Socios
                        </Text>
                        <Input placeholder={'2'} textAlign={'center'}/>
                    </View>

                    <View flex={1} p={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Invitados
                        </Text>
                        <Input placeholder={'2'} textAlign={'center'}/>
                    </View>
                </View>*/}


                {/*   <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        ¿Cuenta con servicio de carrito de golf?
                    </Text>
                    <Input placeholder={'2 Carritos de golf'} textAlign={'center'}/>
                </View>

                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        ¿Cuenta con servicio de bolsa de golf?
                    </Text>
                    <Input placeholder={'2 bolsas'} textAlign={'center'}/>
                </View>
*/}

                <Button onPress={() => navigation.navigate('BookingConfirmScreen')}>Reservar</Button>

            </View>
            <ModalConfirmBooking
                visible={modalConfirmBooking}
                setVisible={setModalConfirmBooking}
                text={'Esta reserva descontará 3 green fee y 3 puntos comprometidos'}
            />
        </LayoutV4>
    )
}

export default BookingCollectDataScreen;