import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Checkbox, FormControl, Icon, Select, Skeleton, Text, View} from "native-base";
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
import {bookService, cacheBookHour, getAdditionals, getIntervalsTime, getPoints, unBlockHour} from "../api/Requests";
import _ from "lodash";
import {useIsFocused} from "@react-navigation/native";

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
    const [sending, setSending] = useState(null);
    const [additionals, setAdditionals] = useState([]);
    const [groupValues, setGroupValues] = useState([]);
    const [pointsDay, setPointsDay] = useState(null);
    const [areaId, setAreaId] = useState(null);
    const [area, setArea] = useState(null);
    const [points, setPoints] = useState(null);

    const isFocused = useIsFocused();
    const tomorrow = new Date().setDate(new Date().getDate() + 1)
    const today = new Date().setDate(new Date().getDate())
    const todayPlus7 = new Date()
    todayPlus7.setDate(new Date().getDate() + 7)


    const {touched, handleSubmit, errors, setFieldValue, resetForm} = useFormik({
        initialValues: {
            date: '',
            hourSelected: '',
            peopleArray: [],
            areaSelected: 0
        },
        onSubmit: (formValue) => {
            console.log(44)
            sendConfirmationBooking(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({
            areaSelected: Yup
                .number()
                .required("El área obligatoria"),
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
                .min(area?.minPeople - 1, `Seleccione al menos ${area?.minPeople - 1} persona(s)`)

        })
    });


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
    }, [route?.params]);

    useEffect(() => {
        if (isFocused) {
            getAdditionalsFunction()
            getPointsFunction()
        }
    }, [isFocused])


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
        const response = await getIntervalsTime(queryString, [1]);
        setHours(response.data);
    }

    const validateHour = async (hour) => {
        try {
            const params = {
                dueDate: date,
                dueTime: hour
            }
            const response = await cacheBookHour(params, [appDuck.user.id, area?.id])
            console.log(response.data)
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

            setSending(true)
            //CALL ENDPOINT
            let params = {
                dueDate: date,
                dueTime: hourSelected,
                areaId: area?.id,
                guests: [],
                users: [],
                additionals: groupValues
            }

            let guests = _.filter(people, {'type': 'INVITADO'});
            for (const person of guests) {
                const guest = {
                    guestId: parseInt(person.data.person.idInvitado),
                    guestName: person.name,
                    guestEmail: person.data.person.mail
                }
                params.guests.push(guest);
            }

            let partners = _.filter(people, {'type': 'SOCIO'})
            for (const person2 of partners) {
                params.users.push(person2.data.person.user.id);
            }

            console.log(params)

            const response = await bookService(params, [appDuck.user.id]);
            if (!response.data?.message) {
                setModalConfirmBooking(false);
                navigation.navigate('BookingConfirmScreenSuccess', {people: people, date: date, hour: hourSelected})
                resetForm();
                cleanData();
                setSending(false)
            }
        } catch (e) {
            alert(JSON.stringify(e))
            setSending(false)
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

    const getAdditionalsFunction = async () => {
        try {
            setLoading(true)
            const response = await getAdditionals('', [appDuck.user.id]);

            console.log(response.data)
            setAdditionals(response.data)
            setLoading(false)
        } catch (e) {
            alert(JSON.stringify(e))
            console.log(e)
        }
    }


    const unBlockHourFunction = async (hour) => {
        try {
            const response = await unBlockHour(`?dueDate=${date}&dueTime=${hour}`, [appDuck.user.id, area?.id])
            console.log(response.data)
        } catch (e) {
            console.log(alert(JSON.stringify(e)))
        }
    }

    const recalculePoints = (pointsDayVar) => {
        let arrayPeople = people;
        let invitados = _.filter(arrayPeople, {'type': 'INVITADO'});
        if (pointsDayVar && invitados.length > 0 && points) {
            let arrayFinalRemove = [];
            for (var i = invitados.length; i > 0; i--) {
                if ((i * pointsDayVar) > points) {
                    arrayFinalRemove.push(invitados[i - 1].data.person.idStandard)
                }
            }
            var evens = _.remove(arrayPeople, function (o) {
                return !arrayFinalRemove.includes(o.data.person.idStandard);
            });
            setPeople(evens)
        }
    }

    const getPointsFunction = async () => {
        try {
            setLoading(true)
            const response = await getPoints('', [appDuck.user.id]);
            let pointsTotal = response.data.points;
            setPoints(pointsTotal)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
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

                <View mb={4}>
                    <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        Áreas
                    </Text>
                    {
                        loading === true ?
                            <Skeleton height={45} borderRadius={30}></Skeleton> :
                            loading === false &&
                            <FormControl isInvalid={errors.areaSelected}>
                                <Select
                                    onOpen={() => {

                                    }}
                                    selectedValue={areaId}
                                    onValueChange={(v) => {
                                        setAreaId(v)

                                        let areaFilter = _.find(route?.params?.service?.areas, {id: v});
                                        console.log(areaFilter, 329)
                                        console.log(date, 330)

                                        if (date) {
                                            let pointsDayValue = _.find(areaFilter?.calendarDays, {day: moment(date).locale('en').format('dddd')}).points;
                                            recalculePoints(pointsDayValue)
                                        }
                                        setArea(areaFilter)

                                    }}
                                    placeholder="Seleccionar">
                                    {
                                        route?.params?.service?.areas.map((item) => {
                                            return (
                                                <Select.Item label={item.name} value={item.id}/>
                                            )
                                        })
                                    }
                                </Select>
                                <FormControl.ErrorMessage alignSelf={'center'}>
                                    {errors.areaSelected}
                                </FormControl.ErrorMessage>
                            </FormControl>
                    }
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
                                    let pointsDayValue = _.find(area?.calendarDays, {day: moment(day.dateString).locale('en').format('dddd')}).points;
                                    setPointsDay(pointsDayValue)
                                    setDate(day.dateString)
                                    setFieldValue("date", day.dateString)
                                    setShowCalendar(false)
                                    console.log(pointsDayValue)
                                    recalculePoints(pointsDayValue)
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

                <View mb={4}>
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
                                        if (hourSelected) {
                                            unBlockHourFunction(v)
                                        }
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
                    <View mb={2}>
                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaBold'} fontSize={'sm'}>Tiempo para reservar {minutesLeft}:{secondsLeft}</Text>
                    </View>
                }
                <View mb={6}>
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
                                            <Text fontSize={12} color={'#000'}>{person.name}</Text>
                                            <Text color={'#000'} fontSize={10}>{person.type}</Text>
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


                    {
                        (pointsDay !== null && (people.length < area?.maxPeople - 1)) &&
                        <FormControl isInvalid={errors.peopleArray}>
                            <TouchableOpacity onPress={() => {
                                let invitados = _.filter(people, function (o) {
                                    if (o.type === 'INVITADO') return o
                                }).length;
                                let points = invitados * pointsDay;
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


                {
                    additionals.length > 0 &&
                    <View mb={10} pl={2}>
                        <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                            Servicios Adicionales
                        </Text>
                        {
                            loading === true ?
                                <Skeleton height={45} borderRadius={30}></Skeleton> :
                                loading === false &&
                                <Checkbox.Group
                                    onChange={(v) => {
                                        console.log(v, 453)
                                        setGroupValues(v)
                                    }}
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
                                        additionals.map((item) => {
                                            return (
                                                <Checkbox value={item} my={2} _text={{color: '#000'}}>
                                                    {_.upperFirst(item.descServicio.toLowerCase())}
                                                </Checkbox>
                                            )
                                        })
                                    }
                                </Checkbox.Group>
                        }

                    </View>
                }

                <Button onPress={() => handleSubmit()} isLoading={sending}>Reservar</Button>
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