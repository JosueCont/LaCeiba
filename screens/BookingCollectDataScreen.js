import LayoutV4 from "./Layouts/LayoutV4";
import {Button, FormControl, Icon, Select, Skeleton, Text, View} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Calendar} from "react-native-calendars";
import {TouchableOpacity} from "react-native";
import moment from 'moment';
import 'moment/locale/es';
import {MaterialIcons} from "@expo/vector-icons";
import {disabledDay} from "../utils";
import ModalBookingConfirmation from "./Modals/ModalBookingConfirmation";
import ModalInfo from "./Modals/ModalInfo";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {bookService, cacheBookHour, getIntervalsTime} from "../api/Requests";
import _ from "lodash";

moment.locale('es');

const BookingCollectDataScreen = ({route, navigation, appDuck}) => {
    const [modalConfirmBooking, setModalConfirmBooking] = useState(null)
    const [modalInfo, setModalInfo] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [date, setDate] = useState(null);
    const [markedDate, setMarkedDate] = useState(null);
    const [disabledDays, setDisabledDays] = useState([])
    const [loading, setLoading] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [hours, setHours] = useState([]);
    const [hourSelected, setHourSelected] = useState(null);
    const [people, setPeople] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [minutesLeft, setMinutesLeft] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(null);

    const {touched, handleSubmit, errors, setFieldValue, resetForm} = useFormik({
        initialValues: {
            date: '',
            hourSelected: '',
            peopleArray: []
        },
        onSubmit: (formValue) => {
            console.log(44)
            sendConfirmationBooking(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({

            date: Yup
                .string()
                .trim()
                .required("La fecha es obligatoria"),
            hourSelected: Yup
                .string()
                .trim()
                .required("La hora es obligatoria"),
            peopleArray: Yup
                .array()
                //.required('Los invitados son obligatorios')
                .min(route?.params?.service?.areas[0]?.minPeople - 1, `Seleccione al menos ${route?.params?.service?.areas[0]?.minPeople - 1} persona(s)`)

        })
    });

    const tomorrow = new Date().setDate(new Date().getDate() + 1)
    const today = new Date().setDate(new Date().getDate())
    const todayPlus7 = new Date()
    todayPlus7.setDate(new Date().getDate() + 7)

    useEffect(() => {
        if (timeLeft == 0) {
            setMinutesLeft('00');
            setSecondsLeft('00');
            //setDate(null);
            setHourSelected(null);
        }
        if (!timeLeft) {
            setMinutesLeft(null);
            setSecondsLeft(null);
            return
        }
        ;
        const intervalId = setInterval(() => {

            setTimeLeft(timeLeft - 1);
            convertToMinutes(timeLeft);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])


    useEffect(() => {
        if (route?.params?.clean) {
            cleanData();
        }
    }, [route?.params])


    const addPerson = (data) => {
        const person = {
            data: data,
            name: data.type == 'p' ? data.person.nombreSocio : data.person.nombre + ' ' + data.person.apellidoPaterno,
            type: data.type == 'p' ? "SOCIO" : "INVITADO"
        }
        let arrayPeopleTemp = [...people, person]
        setFieldValue("peopleArray", arrayPeopleTemp);
        setPeople(arrayPeopleTemp);

    }

    const removePerson = (index) => {
        let arrayPeopleTemp = people.filter((_, i) => i != index)
        setFieldValue("peopleArray", arrayPeopleTemp);
        setPeople(arrayPeopleTemp);
    }

    const getHoursFunction = async (dateString) => {
        const queryString = `?date=${dateString}`;
        console.log(dateString);
        const response = await getIntervalsTime(queryString, [1]);
        setHours(response.data);
    }

    const validateHour = async (hour) => {
        try {
            const params = {
                dueDate: date,
                dueTime: hour
            }
            const response = await cacheBookHour(params, [appDuck.user.id, route?.params?.service?.areas[0]?.id])
            if (response) {
                setFieldValue("hourSelected", hour);
                setTimeLeft(route?.params?.service?.timeToConfirm * 60);
            }
        } catch (e) {
            setModalInfo(true);
            setHourSelected(null);
            setTimeLeft(null);
        }

    }

    const confirmBooking = async () => {
        try {
            //CALL ENDPOINT
            let params = {
                dueDate: date,
                dueTime: hourSelected,
                areaId: route?.params?.service?.areas[0]?.id,
                guests: []
            }
            for (const person of people) {
                const guest = {
                    guestId: person.data.type == 'g' ? parseInt(person.data.person.idInvitado) : person.data.person.id,
                    guestName: person.name,
                    guestEmail: person.data.type == 'g' ? person.data.person.mail : person.data.person.email
                }
                params.guests.push(guest);
            }
            const response = await bookService(params, [appDuck.user.id]);
            if (!response.data?.message) {
                setModalConfirmBooking(false);
                navigation.navigate('BookingConfirmScreenSuccess', {people: people, date: date, hour: hourSelected})
                resetForm();
                cleanData();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const cleanData = () => {
        setShowCalendar(false);
        setDate(null);
        setHourSelected(null);
        setPeople([]);
        setTimeLeft(null);
        setMinutesLeft(null);
        setSecondsLeft(null);
    }

    const sendConfirmationBooking = async (values) => {
        setModalConfirmBooking(true)
    }

    const convertToMinutes = (time) => {
        let minutes = time >= 60 ? Math.floor(time / 60) : 0;
        minutes = String(minutes).padStart(2, "0");
        let seconds = time - minutes * 60;
        seconds = String(seconds).padStart(2, "0");
        setMinutesLeft(minutes);
        setSecondsLeft(seconds);
    }



    return (
        <LayoutV4>
            <View flex={1} mx={12} my={10}>
                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                        Instalación | Servicio
                    </Text>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>
                        {route?.params?.service?.name}
                    </Text>
                </View>
                <View mb={6}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Fecha
                    </Text>

                    {
                        showCalendar === true ?
                            <Calendar
                                minDate={route?.params?.service?.bookNextDay ? tomorrow : today}
                                maxDate={todayPlus7}
                                onDayPress={day => {
                                    console.log(day);
                                    setDate(day.dateString)
                                    setFieldValue("date", day.dateString)
                                    // let selected = {};
                                    // selected[day.dateString] = {selected: true, marked: true}
                                    // setMarkedDate(selected)
                                    setShowCalendar(false)
                                    //getHoursFunction(day.dateString);
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
                            />
                            :
                            <TouchableOpacity onPress={() => {
                                setShowCalendar(!showCalendar)
                            }}>
                                <FormControl isInvalid={errors.date}>
                                    <View height={50} bgColor={'#fff'} borderRadius={30} alignItems={'center'} justifyContent={'center'}>
                                        <Text color={'#000'}>{date ? moment(date).format('dddd, DD MMMM YYYY') : 'Selecciona una fecha'}</Text>
                                    </View>
                                    <FormControl.ErrorMessage alignSelf={'center'}>
                                        {errors.date}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                            </TouchableOpacity>
                    }
                </View>

                <View>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Horario
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={45} borderRadius={30}></Skeleton> :
                            loading === false &&
                            <FormControl isInvalid={errors.hourSelected}>
                                <Select
                                    isDisabled={date == null}
                                    selectedValue={hourSelected ? hourSelected : ''}
                                    onOpen={() => {
                                        getHoursFunction(date)
                                    }}
                                    onValueChange={(v) => {
                                        setHourSelected(v);
                                        validateHour(v);
                                    }}
                                    placeholder="Seleccionar">
                                    {
                                        hours.map((item) => {
                                            return (
                                                <Select.Item label={item} value={item}/>
                                            )
                                        })
                                    }
                                </Select>
                                <FormControl.ErrorMessage alignSelf={'center'}>
                                    {errors.hourSelected}
                                </FormControl.ErrorMessage>
                            </FormControl>
                    }
                </View>
                {

                    minutesLeft &&
                    <View mt={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'sm'}>Tiempo para reservar {minutesLeft}:{secondsLeft} </Text>
                    </View>
                }
                <View my={6} mb={6}>
                    <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Elige las personas
                    </Text>
                    <View height={75} bg={'#fff'} mb={2} flexDirection={'row'} borderRadius={10}>
                        <View width={65} alignItems={'center'} justifyContent={'center'}>
                            <Icon as={MaterialIcons} name={'check-circle'} size={'2xl'} color={'#50C878'}></Icon>
                        </View>
                        <View flex={1} justifyContent={'center'}>
                            <Text color={'#000'}>{appDuck.user.firstName} {appDuck.user.lastName}</Text>
                            <Text color={'#000'} fontSize={11}>Socio organizador</Text>
                        </View>
                    </View>
                    <View>
                        {
                            people.map((person, index) => {
                                return (
                                    <View height={75} bg={'#fff'} mb={2} flexDirection={'row'}>
                                        <View width={65} alignItems={'center'} justifyContent={'center'}>
                                            <Icon as={MaterialIcons} name={'check-circle'} size={'2xl'} color={'#50C878'}></Icon>
                                        </View>
                                        <View flex={1} justifyContent={'center'}>
                                            <Text fontSize={12} color={'#000'}>{person.name} </Text>
                                            <Text color={'#000'} fontSize={10}>{person.type} </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            removePerson(index)
                                        }}>
                                            <View flex={1} width={65} alignItems={'center'} justifyContent={'center'}>
                                                <Icon as={MaterialIcons} name={'delete'} size={'2xl'} color={'red.500'}></Icon>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>


                    {people.length < route?.params?.service?.areas[0]?.maxPeople - 1 &&
                        <FormControl isInvalid={errors.peopleArray}>
                            <TouchableOpacity onPress={() => {
                                console.log(people)
                                let invitados = _.filter(people, function (o) {
                                    if (o.type === 'INVITADO') return o
                                }).length;
                                let points = invitados * 3;
                                console.log(points)

                                navigation.navigate('BookingCollectDataSearchScreen', {onAddPerson: addPerson, currentPeople: people, points: points})
                            }}>
                                <View height={75} bg={'rgba(255,255, 255,1)'} mb={2} flexDirection={'row'} borderStyle={'dashed'} borderWidth={1.5}>
                                    <View flex={1} justifyContent={'center'} alignItems={'center'}>
                                        <Text fontSize={14} color={'#000'}>Seleccionar persona</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <FormControl.ErrorMessage alignSelf={'center'}>
                                {errors.peopleArray}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    }

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

                <Button onPress={() => /*navigation.navigate('BookingConfirmScreen')*/ handleSubmit()}>Reservar</Button>

            </View>
            <ModalBookingConfirmation
                visible={modalConfirmBooking}
                date={date}
                hour={hourSelected}
                people={people}
                setVisible={setModalConfirmBooking}
                onConfirm={confirmBooking}>

            </ModalBookingConfirmation>
            <ModalInfo
                setVisible={setModalInfo}
                visible={modalInfo}
                title="Hora seleccionada"
                text="Este horario ya ha sido apartado. Intenta seleccionar otro."
                textButton="Aceptar">
            </ModalInfo>
            {/* <ModalConfirmBooking
                visible={modalConfirmBooking}
                setVisible={setModalConfirmBooking}
                text={'Esta reserva descontará 3 green fee y 3 puntos comprometidos'}
            /> */}
        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookingCollectDataScreen);