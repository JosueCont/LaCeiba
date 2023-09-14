import {Button, Checkbox, Divider, FormControl, Icon, InfoIcon, ScrollView, Select, Skeleton, Text, View, useToast} from "native-base";
import {Colors} from "../Colors";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Calendar} from "react-native-calendars";
import {TouchableOpacity} from "react-native";
import moment from 'moment';
import 'moment/locale/es';
import {MaterialIcons} from "@expo/vector-icons";
import {disabledDay, errorCapture} from "../utils";
import ModalBookingConfirmation from "./Modals/ModalBookingConfirmation";
import ModalInfo from "./Modals/ModalInfo";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {bookService, cacheBookHour, getAdditionals, getIntervalsTime, getPoints, transferPoints, unBlockHour} from "../api/Requests";
import _ from "lodash";
import {useIsFocused} from "@react-navigation/native";
import LayoutV3 from "./Layouts/LayoutV3";
import HolesItemSelected from "../components/HolesItemSelected"
import { alignItems } from "styled-system";

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
    const [loadingHours, setLoadingHours] = useState(false);
    const [blockingHours, setBlockingHours] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [hours, setHours] = useState(null);
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
    todayPlus7.setDate(todayPlus7.getDate() + 5)
    const [holes,setHoles] = useState(null)
    const [hoursMessageInfo, setHoursMessageInfo] = useState('')


    const {touched, handleSubmit, errors, setFieldValue, resetForm} = useFormik({
        initialValues: {
            date: '',
            hourSelected: '',
            peopleArray: [],
            areaSelected: 0,
            },
            validateOnChange: true,
            enableReinitialize: true,
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
            }),
        onSubmit: (formValue) => {
            
            sendConfirmationBooking(formValue)
        },
    });

    useEffect(() => {
        if (timeLeft == 0) {
            setMinutesLeft('00');
            setSecondsLeft('00');
            setHourSelected(null);
            setFieldValue('hourSelected', '')
            //setModalConfirmBooking(false)
        }
        if (!timeLeft) {
            setMinutesLeft(null);
            setSecondsLeft(null);
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            convertToMinutes(timeLeft);
        }, 550);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {

        setTimeout(() => {
            getAdditionalsFunction()
            getPointsFunction()
            if (route?.params?.service?.areas.length === 1) {
                areaSelect(route?.params?.service?.areas[0].id)
            }
        }, 500)

    }, [route?.params?.service?.id])

    useEffect(() => {
        cleanData();
        resetForm()
    }, [route?.params?.service?.id])


    const addPerson = (data) => {

        const person = {
            data: data,
            name: data.type == 'p' ? data.person.nombreSocio : data.person.nombre + ' ' + data.person.apellidoPaterno,
            type: data.type == 'p' ? "SOCIO" : "INVITADO",
            totalPoints: 0

        }
        if(data.type == 'p'){          
            setPoints(old => {
                let totalPoints = 0          
                data.person.user.pointsTransferred.map( point => {    
                        if( point.toId === appDuck.user.id){
                            totalPoints = totalPoints + point.points
                        }
                })
                person.totalPoints = totalPoints
                return old + totalPoints
            })
        }else{
            setPoints(old => old - pointsDay)
        }

        let arrayPeopleTemp = [...people, person]
        setFieldValue("peopleArray", arrayPeopleTemp);
        setPeople(arrayPeopleTemp);

    }

    const removePerson = (index , person) => {
        let arrayPeopleTemp = people.filter((_, i) => i != index)

        if(person.type === 'INVITADO'){
        setFieldValue("peopleArray", arrayPeopleTemp);
        setPeople(arrayPeopleTemp);
        setPoints(old => old + pointsDay)
        }else{
            setFieldValue("peopleArray", arrayPeopleTemp);
            setPeople(arrayPeopleTemp);
            setPoints(old => old - person.totalPoints)          
            // let arrayPeopleTemp = people.filter((e) => e.type != 'INVITADO')
            // setFieldValue("peopleArray", arrayPeopleTemp);
            // setPeople(arrayPeopleTemp);
        }
        if(arrayPeopleTemp.length === 0){
            setFieldValue("peopleArray", []);
        }
    }

    const getHoursFunction = async (dateString) => {
        const queryString = `?date=${dateString}&userId=${appDuck.user.id}`;
        setLoadingHours(true)
        try {
            const response = await getIntervalsTime(queryString, [areaId]);
            setHourSelected(old =>null)   
            setHours(response.data)
            if(response.data.length === 0){
                setHoursMessageInfo("No encontramos horarios disponibles para el día seleccionado.")
            }
            setLoadingHours(false)
        } catch (error) {
            console.log(error)
            if(error?.data?.code === 400){
                setHoursMessageInfo(error?.data?.message)
            }else{
                setHoursMessageInfo('No se pudo recuperar la lista de horarios.')
            }
            setHours(null);
            setHourSelected(old =>null);
            setLoadingHours(false)
        }
        
    }

    const validateHour = async (hour) => {
        setBlockingHours(true)
        try {
            const params = {
                dueDate: date,
                dueTime: hour
            }
            // Intenetamos desbloquear la hora previamente seleccionada
            if (hourSelected) {
                let r = await unBlockHourFunction(hourSelected)
            }
            
            // Reservamos el nuevo horario
            const response = await cacheBookHour(params, [appDuck.user.id, areaId])
            if (response.status === 201) {
                setFieldValue("hourSelected", hour);
                setHourSelected(hour)
                setTimeLeft(route?.params?.service?.timeToConfirm * 60);
            }else{
                setFieldValue("hourSelected", '');
                setHourSelected('')
                alert('No fue posible desbloquear la hora.')
            }
            setBlockingHours(false)
        } catch (e) {
            let v = await errorCapture(e);
            setModalInfo(true);
            setHourSelected(old => null);
            setTimeLeft(null);
            setBlockingHours(false)
        }

    }

    const confirmBooking = async (specificEmail = null) => {
        try {
            setSending(true)
            let params = {
                dueDate: date,
                dueTime: hourSelected,
                areaId: areaId,
            }
        console.log('specificEmail',specificEmail)
            if(specificEmail !== null){
                params['specificEmail'] = specificEmail
            }

            if (groupValues.length > 0) {
                params['additionals'] = groupValues
            }

            if(holes !== null){
                params['numHoles'] = holes
            }

            let guests = _.filter(people, {'type': 'INVITADO'});
            let partners2 = _.filter(people, {'type': 'SOCIO'})

            let partnerTransferPoints = []
            partners2.forEach(e =>{
                e.totalPoints > 0 ? partnerTransferPoints.push(e.data.person.user.id) : '';
            })


            let guestsArray = [];
            for (const person of guests) {
                const guest = {
                    guestId: parseInt(person.data.person.idInvitado),
                    guestName: person.name,
                    guestEmail: person.data.person.mail,
                    points: pointsDay
                }
                guestsArray.push(guest);
            }
            if (guestsArray.length > 0) {
                params['guests'] = guestsArray;
                if(partnerTransferPoints.length > 0){
                    params['partnerTransferPoints'] = partnerTransferPoints

                }
            }


            let partners = _.filter(people, {'type': 'SOCIO'})
            let peopleArray = [];
            for (const person2 of partners) {
                peopleArray.push(person2.data.person.user.id)
            }

            if (peopleArray.length > 0) {
                params['users'] = peopleArray;
            }
            console.log('confirmBooking', appDuck.user.id, params)

            const response = await bookService(params, [appDuck.user.id]);
            
            console.log(response)
            if (!response.data?.message) {
                setModalConfirmBooking(false);
                resetForm();
                cleanData();
                setSending(false)
                navigation.navigate('BookingConfirmScreenSuccess', {people: people, date: date, hour: hourSelected})
            }
        } catch (e) {
            console.log(e)
            let v = await errorCapture(e);
            alert(v.value)
            setSending(false)
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
        setPointsDay(null)
        setAreaId(null);
        setArea(null);
        setHoles(null)
        setHours(null)
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
            console.log(response.data, 252)
            setAdditionals(response.data)
            setGroupValues(response.data)
            setLoading(false)
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
        }
    }

    const unBlockHourFunction = async (hour) => {
        try {
            const response = await unBlockHour(`?dueDate=${date}&dueTime=${hour}`, [appDuck.user.id, areaId])
            console.log(response.data, 265)
            return response.data;
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
        }
    }

    // const recalculePoints = (pointsDayVar) => {
    //     let arrayPeople = people;
    //     let invitados = _.filter(arrayPeople, {'type': 'INVITADO'});
    //     if (pointsDayVar && invitados.length > 0 && points) {
            
    //         let arrayFinalRemove = [];
    //         for (var i = invitados.length; i > 0; i--) {
    //             if ((i * pointsDayVar) > points) {
    //                 arrayFinalRemove.push(invitados[i - 1].data.person.idStandard)
    //             }
    //         }
    //         var evens = _.remove(arrayPeople, function (o) {
    //             return !arrayFinalRemove.includes(o.data.person.idStandard);
    //         });
    //         setPeople(evens)
    //     }
    // }

    const getPointsFunction = async () => {
        try {
            setLoading(true)
            const response = await getPoints('', [appDuck.user.id]);
            let pointsTotal = response.data.totalPoints;
            setPoints(pointsTotal)
            setLoading(false)

        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
        }
    }


    const areaSelect = async (v) => {
        try {
            setAreaId(v)
            setDate(null);
            getPointsFunction( )
            setPeople([])
            let areaFilter = _.find(route?.params?.service?.areas, {'id': v});
            setArea(areaFilter)
        } catch (e) {

            let v = await errorCapture(e);
            alert(v.value)
        }

    }

    const calculatePoints = async(dayPoints) => {
        let partners = _.filter(people, {'type': 'SOCIO'})
        const response = await getPoints('', [appDuck.user.id]);
        let pointsTotal = response.data.totalPoints;
        let pointGuests = _.filter(people, {'type': 'INVITADO'}).length * dayPoints
        let totalPoints = pointsTotal
        partners.forEach(e =>{
            let points = 0;
            points = points + e.totalPoints
            totalPoints = totalPoints + points
        })
        setPoints(totalPoints - pointGuests)
    }

    const getHole = (holes)=>{
        setHoles(holes)
    }


    useEffect(() => {
        console.log(route?.params?.service)
    }, [])


    return (
        <LayoutV3>
            <View flex={1} mx={12} my={10}>
                <View flex={1}>
                    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
                        <View mb={6}>
                            <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'sm'}>
                                Reservación de
                            </Text>
                            <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>
                                {route?.params?.service?.name}
                            </Text>
                        </View>

                        {
                            route?.params?.service?.areas.length > 1 &&
                            <View mb={4}>
                                <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                    Área
                                </Text>
                                {
                                    loading === true ?
                                        <Skeleton height={45} borderRadius={30}></Skeleton> :
                                        loading === false &&
                                        <FormControl isInvalid={errors.areaSelected}>
                                            <Select
                                                selectedValue={areaId}
                                                onOpen={() => {

                                                }}
                                                onValueChange={(v) => {
                                                    areaSelect(v)

                                                }}
                                                placeholder="Seleccionar">
                                                {
                                                    _.sortBy(route?.params?.service?.areas, ['name'], ['asc']).map((item) => {
                                                        return (
                                                            <Select.Item key={item.id} label={item.name} value={item.id}/>
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
                        }
                        { route?.params?.service.isGolf &&

                            <View mb={6}>
                                 <View  mb={4} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                                    <Text justifyContent={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>Número de hoyos a jugar</Text>
                                 </View>
                                 {
                                    loading === true ?
                                    <Skeleton height={45} borderRadius={30}></Skeleton> :

                                    <HolesItemSelected defaultHole={holes} getHole={getHole}></HolesItemSelected>

                                 }
                             </View>
                        }
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
                                            let guest = _.filter(people, {'type': 'INVITADO'})

                                            if (area) {
                                                let pointsDayValue = _.find(area?.calendarDays, {day: moment(day.dateString).locale('en').format('dddd')}).points;
                                                setPointsDay(pointsDayValue)
                                            }
                                            if(guest.length > 0) {
                                                let pointsDayValue = _.find(area?.calendarDays, {day: moment(day.dateString).locale('en').format('dddd')}).points;
                                                calculatePoints(pointsDayValue)
                                            }

                                            setDate(day.dateString)
                                            setFieldValue("date", day.dateString)
                                            getHoursFunction(day.dateString)
                                            setShowCalendar(false)
                                            setTimeLeft(null)
                                        }}
                                        onDayLongPress={day => {
                                            //console.log('selected day', day);
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
                                        markedDates={disabledDay(area.calendarDays, route?.params?.service.bookNextDay)}
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
                                    :
                                    loading === true ?
                                        <Skeleton height={45} borderRadius={30}></Skeleton> :
                                        <TouchableOpacity style={{opacity: areaId ? 1 : 0.5}} disabled={areaId ? false : true} onPress={() => {
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
                            {
                                loadingHours === true ?
                                    <Skeleton height={45} borderRadius={30}></Skeleton> :
                                    !date ?
                                    <View bg={'rgba(255,255, 255,0.3)'} p={4} borderRadius={8} justifyContent={'center'} alignItems={'center'}>
                                        <View flex={1} flexDirection={'row'} alignItems={'center'} mx={3} >
                                            <InfoIcon size={'md'} color={Colors.yellow} mr={3}/>
                                            <Text fontSize={14} color={Colors.green}>Seleccionar una fecha para ver los horarios disponibles</Text>
                                        </View>
                                    </View>
                                 : (hours && hours?.length > 0) ?
                                    <View>
                                        <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                            Horario
                                        </Text>
                                        <FormControl isInvalid={errors.hourSelected}>
                                            <Select

                                                isDisabled={date == null}
                                                selectedValue={hourSelected ? hourSelected : ''}
                                                onOpen={() => {
                                                // getHoursFunction(date)
                                                }}
                                                onValueChange={async (v) => {
                                                /*  if (hourSelected) {
                                                        let r = await unBlockHourFunction(v)
                                                        console.log(r, 503)
                                                        if (r) {
                                                            setHourSelected(old =>v);
                                                            validateHour(v);
                                                        } else {
                                                            alert('No fue posible desbloquear la hora.')
                                                        }
                                                    } else {
                                                        setHourSelected(old =>v);
                                                        validateHour(v);
                                                    } */
                                                    validateHour(v);
                                                }}
                                                placeholder="Seleccionar">
                                                {
                                                    hours && hours.map((item, idx) => {
                                                        return (
                                                            <Select.Item key={idx} label={item} value={item}/>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            {!blockingHours &&<FormControl.ErrorMessage alignSelf={'center'}>
                                                {errors.hourSelected}
                                            </FormControl.ErrorMessage>
}
                                        </FormControl>
                                    </View>
                                    :<View bg={'rgba(255,255, 255,0.3)'} p={4} borderRadius={8} justifyContent={'center'} alignItems={'center'}>
                                        <View flex={1} flexDirection={'row'} alignItems={'center'} mx={3} >
                                            <InfoIcon size={'md'} color={Colors.yellow} mr={3}/>
                                            <Text fontSize={14} color={Colors.green}>{hoursMessageInfo}</Text>
                                        </View>
                                    </View>
                            }
                        </View>
                        {
                            loadingHours &&
                            <View mb={2}>
                                <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Consultando horarios disponibles...</Text>
                            </View>
                        }
                        {
                            blockingHours &&
                            <View mb={2}>
                                <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Apartando horario seleccionado...</Text>
                            </View>
                        }
                        {
                            !blockingHours && minutesLeft &&
                            <View mb={2}>
                                <Text textAlign={'center'} mb={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Tiempo para reservar {minutesLeft}:{secondsLeft}</Text>
                            </View>
                        }

                        {
                            area?.maxPeople > 1 &&
                            <View mb={6}>
                                <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                    Puntos
                                </Text>
                                <View flexDir={'row'} mb={3}>
                                    <View flex={1}>
                                        <Text textAlign={'center'} color={points>= 0 ? Colors.green : 'red.500'} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>
                                            {points}
                                        </Text>
                                        <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'xs'}>
                                            Disponibles
                                        </Text>
                                    </View>
                                    <View flex={1}>
                                        <Text textAlign={'center'} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'}>
                                            {_.filter(people, {'type': 'INVITADO'}).length * pointsDay}
                                        </Text>
                                        <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'xs'}>
                                            A utilizar
                                        </Text>
                                    </View>

                                </View>

                                {
                                (points < 0) &&
                                <Text textAlign={'center'} color={'red.500'} fontSize={'xs'} mb={4}>
                                   Puntos insuficientes, elimina algún invitado para poder completar tu reservación
                                </Text>
                                }


                                <Text textAlign={'center'} mb={4} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                    Elige las personas
                                </Text>

                                {
                                    (pointsDay && (people.length < area?.maxPeople - 1) && area?.maxPeople > 1) &&
                                    <FormControl mb={2} isInvalid={errors.peopleArray}>
                                        <TouchableOpacity onPress={() => {
                                            let invitados = _.filter(people, function (o) {
                                                if (o.type === 'INVITADO') return o
                                            }).length;
                                            let point = invitados * pointsDay;
                                            navigation.navigate('BookingCollectDataSearchScreen', {onAddPerson: addPerson, currentPeople: people, points:points, point: point, pointsDay: pointsDay})
                                        }}>
                                            <View height={75} bg={'rgba(255,255, 255,1)'} flexDirection={'row'} borderStyle={'dashed'} borderWidth={1.5}>
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
                                                <View key={index} height={75} bg={'#fff'} mb={2} flexDirection={'row'}>
                                                    <View width={65} alignItems={'center'} justifyContent={'center'}>
                                                        <Icon as={MaterialIcons} name={'check-circle'} size={'2xl'} color={'#50C878'}></Icon>
                                                    </View>
                                                    <View flex={1} justifyContent={'center'}>
                                                        <Text fontSize={12} color={'#000'}>{person.name}</Text>
                                                        <Text color={'#000'} fontSize={10}>{person.type}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => {
                                                        removePerson(index, person)
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


                            </View>
                        }


                        {
                            (route?.params?.service?.isGolf === true && additionals.length > 0) &&
                            <View mb={10} pl={2}>
                                <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                                    Servicios Adicionales
                                </Text>
                                {
                                    loading === true ?
                                        <Skeleton height={45} borderRadius={30}></Skeleton> :
                                        loading === false &&
                                        <View>
                                            <Checkbox.Group
                                                onChange={(values) => {
                                                    console.log(values)
                                                    setGroupValues(values)
                                                }}
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
                                                    additionals.map((item, index) => {
                                                        return (
                                                            <Checkbox key={index} value={item} my={2} _text={{color: '#000'}}>
                                                                {_.upperFirst(item.descServicio.toLowerCase())}
                                                            </Checkbox>
                                                        )
                                                    })
                                                }
                                            </Checkbox.Group>
                                        </View>
                                }

                            </View>
                        }
                    </ScrollView>
                </View>

                <View>
                <Button disabled={points < 0 || (route?.params?.service?.isGolf && !holes) || !hourSelected} onPress={() =>handleSubmit()} isLoading={sending}>Reservar</Button>
                </View>
            </View>
            {modalConfirmBooking && 
                <ModalBookingConfirmation
                    visible={modalConfirmBooking}
                    date={date}
                    hour={hourSelected}
                    people={people}
                    partnerHost={appDuck.user}
                    timeLeft={<View mb={2}>
                    <Text textAlign={'center'} mb={2}  fontFamily={'titleComfortaaBold'} color={Colors.yellow} fontSize={'xs'}>Tiempo para reservar {minutesLeft}:{secondsLeft}</Text>
                </View>}
                    setVisible={setModalConfirmBooking}
                    onConfirm={confirmBooking}>

                </ModalBookingConfirmation>
            }
            <ModalInfo
                setVisible={setModalInfo}
                visible={modalInfo}
                title="Hora seleccionada"
                text="Este horario ya ha sido apartado. Intenta seleccionar otro."
                textButton="Aceptar">
            </ModalInfo>

        </LayoutV3>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(BookingCollectDataScreen);