import React, {useEffect, useState} from "react";
import { Spinner, View,  } from "native-base";
import { StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from "react-native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { ColorsCeiba } from "../../../../Colors";
import { getFontSize } from "../../../../utils";
import AvailableDaysItem from "../../../../components/laceiba/Booking/AvailableDaysItem";
import { MaterialIcons } from '@expo/vector-icons';
import AvailableHours from "../../../../components/laceiba/Booking/AvailableHours";
import _ from "lodash";
import { getAllIntervalsTime, unBlockHour } from "../../../../api/Requests";
import { getCounter, onResetCounter, setAtributeBooking, setDataBooking } from "../../../../redux/ducks/bookingDuck";

moment.locale('en');
const {height, width} = Dimensions.get('window');

const CreateBookingScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const focused = useIsFocused()
    const option = useSelector(state => state.bookingDuck.option)
    const booking = useSelector(state => state.bookingDuck.dataBooking)
    const appDuck = useSelector(state => state.appDuck)
    const infoBooking = useSelector(state => state.bookingDuck.createBooking)
    const [availableDays, setAvailableDays] = useState([])
    const [selectDay, setSelectDay] = useState(null)
    const [showFilter, setShowFilter] = useState(false)
    const [areaSelected, setAreaSelect] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hours, setHours] = useState([])
    const [filterSelected, setFilterSelect] = useState(0)
    const [originalHours, setOriginalHours] = useState([]); 


    useEffect(() => {
        //console.log('cargando nuevos')
        setAreaSelect(0)
        if(booking[option]?.areas.length > 0){
            if(booking[option]?.bookPartnerSameDay){
                setSelectDay(1)
            } else setSelectDay(0)

        }else{
            setSelectDay(null)
            setHours([])
            console.log('Se tiene que limpiar los horarios')
        }


    },[option])

    useEffect(() => {
        //getDays()
        getAvailableDays()
    },[areaSelected, option])

    useEffect(() => {
        if(selectDay != null && selectDay != undefined && areaSelected !=null && areaSelected != undefined &&  booking[option]?.areas.length > 0){
            getAllHours()
            setFilterSelect(0)
        }
    },[areaSelected, selectDay, option])

    useEffect(() => {
        if(focused){
            dispatch(setAtributeBooking({prop:'timeExpired', value: false}))
            if(infoBooking?.hour) getCancelReserved()

        }
    },[focused])

    const getAvailableDays = () => {
        //console.log('cambiando dias', booking[option]?.areas[areaSelected]?.calendarDays)
        const today = moment();

        // Mapear los días con la fecha futura
        const result = _.chain(booking[option]?.areas[areaSelected]?.calendarDays)
            .filter(day => day.isActive)
            .map(day => {
                const futureDate = today.clone().day(day.day);
                
                // Ajustar la fecha futura si es necesario
                if (!day.isActive || futureDate.isBefore(today)) {
                    futureDate.add(7, 'days');
                }

                const formattedDate = futureDate.format('YYYY-MM-DD');
                return { day: day.day, date: formattedDate };
            })
            .sortBy('date')
            .map(day => ({ day: `${day.day}`, date: moment(day.date).format('D'), dateString: moment(day.date,'YYYY-MM-DD').format('DD-MM-YYYY') }))
            .value();


        setAvailableDays(result)
        console.log('result',result)

    }

    const getAllHours = async() => {
        try {
            setLoading(true)
            let filters = `?date=${moment(availableDays[selectDay]?.dateString,'DD-MM-YYYY').format('YYYY-MM-DD')}&userId=${appDuck.user.id}`
            console.log('paraemtros', filters , availableDays[selectDay]?.dateString)
            const response = await getAllIntervalsTime(filters, [booking[option]?.areas[areaSelected]?.id])
            setHours(response?.data)
            setOriginalHours(response?.data)
            console.log('response horarios',response?.data)
        } catch (e) {
            console.log('error horarios',e)
        }finally{
            setLoading(false)
        }
    }

    /*const getDays = () => {
        let today = moment();
        const daysArray = [];

        daysArray.push({day:today.format('dddd'), date: today.format('D')});

        for (let i = 1; i <= 6; i++) {
            const nextDay = today.clone().add(i, 'days');
            daysArray.push({day:nextDay.format('dddd'), date: nextDay.format('D')});
        }
        setAvailableDays(daysArray)
        //console.log(daysArray)
    }*/

    const options = [
        {name:'Tee 1'}, {name: 'Tee 10'}
    ]

    const filters = [
        {name:'Todos', color: ColorsCeiba.white},
        {name:'Disponibles', color:ColorsCeiba.white},
        {name:'Reservado', color:ColorsCeiba.lightYellow},
        {name:'Ocupado', color:ColorsCeiba.lightgray},
        {name:'Mis reservas', color: ColorsCeiba.aqua}

    ]

   const onFilterHours = (index) => {
    let filterData;
    setFilterSelect(index)
        const options = {
            0: originalHours,
            1: originalHours.filter((item) => !item?.fullBooking && item?.booking === null),
            2: originalHours.filter((item) => item?.booking !=null &&  !item.booking?.invitations.some((reservation) => reservation?.user?.id === appDuck.user.id)),
            3: originalHours.filter((item) => item?.fullBooking),
            4: originalHours.filter((item) => item.booking?.invitations.find((reservation) => reservation?.user?.id === appDuck.user.id) && !item?.fullBooking)
        }

        filterData = options[index],
        setHours(filterData)

        console.log(filterData,)
   }

   const getCancelReserved = async() => {
    try {
        dispatch(getCounter(0, true));

        const response = await unBlockHour(`?dueDate=${infoBooking?.date}&dueTime=${infoBooking?.hour?.time}`, [appDuck.user.id, infoBooking?.area?.id])
        //stopCounterFunction()
        //dispatch(onResetCounter())
        console.log('cancelardo ',response?.data)
    } catch (e) {
        console.log('eror',e)
    }
   }

    return(
        <HeaderBooking>
            <View style={styles.container}>
                <Text style={styles.lblTitle}>{moment().format('MMMM D')} - {moment().clone().add(6, 'days').format('D')}</Text>
                <View style={{flexDirection:'row', marginBottom:27}}>
                    {availableDays.length > 0 ? (
                        <FlatList 
                            data={availableDays}
                            keyExtractor={(_, index) => (index+1).toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            //snapToOffsets={[...Array(availableDays.length)].map((x, i) =>  width * i + 56)}
                            //decelerationRate={0}
                            contentContainerStyle={{marginLeft:5}}
                            snapToAlignment="center"
                            renderItem={({item, index}) => (
                                <AvailableDaysItem 
                                    item={item} 
                                    index={index} 
                                    selectedDay={selectDay} 
                                    setSelectedDay={(val) => setSelectDay(val)}
                                    disabled={booking[option].bookPartnerSameDay}
                                />
                            )}
                        />
                    ):(
                        <Text>No hay días</Text>
                    )}
                </View>
                
                <View style={styles.contHoles}>
                    <View style={styles.contAreas}>
                        <FlatList 
                            data={booking[option]?.areas}
                            keyExtractor={(_, index) => (index+1).toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            //snapToOffsets={[...Array(availableDays.length)].map((x, i) =>  width * i + 56)}
                            //decelerationRate={0}
                            snapToAlignment="center"
                            renderItem={({item, index}) => (
                                <TouchableOpacity 
                                key={(index+1).toString()}
                                style={[styles.itemArea,{borderBottomColor: areaSelected === index ? ColorsCeiba.blackBtns : ColorsCeiba.white}]}
                                onPress={() => setAreaSelect(index)}>
                                    <Text>{item?.name}</Text>
                                </TouchableOpacity>

                            )}
                        />
                        
                    </View>
                    <View style={{zIndex:10}}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => setShowFilter(!showFilter)}>
                            <Text style={{color: ColorsCeiba.white, fontSize: getFontSize(12), fontWeight:'400'}}>Filtro</Text>
                            <MaterialIcons name="filter-list" size={20} color={ColorsCeiba.white} />
                        </TouchableOpacity>
                        {showFilter && (
                            <View style={styles.contFilter}>
                                {filters.map((item,index) => (
                                    <TouchableOpacity 
                                        key={(index+1).toString()} 
                                        style={[styles.btnFilterOption,{backgroundColor: index === filterSelected ? ColorsCeiba.lightBlue : ColorsCeiba.white}]} 
                                        onPress={() => onFilterHours(index)}>
                                        <View style={{width:15, height:15, borderRadius:7.5, marginRight:4, backgroundColor: item?.color,  borderWidth: index === 1 ? 1: 0,borderColor: index ===1 ? ColorsCeiba.darkGray : ColorsCeiba.white}}/>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                </View>


               {loading ? (
                    <View style={{width: '100%', height:200, justifyContent:'center', alignItems:'center'}}>
                        <Spinner color={ColorsCeiba.darkGray} size={'sm'}/>
                    </View>
               ):(
                   <AvailableHours 
                        hours={hours} 
                        selectedHour={async(item) =>{
                            if(!item.booking?.invitations.find((reservation) => reservation?.user?.id === appDuck.user.id) && !item?.fullBooking){
                                //if(infoBooking?.hour) dispatch(setAtributeBooking({prop:'timeExpired', value: false}))
                                dispatch(setDataBooking({
                                    area: booking[option]?.areas[areaSelected],
                                    hour: item,
                                    date: moment(availableDays[selectDay]?.dateString,'DD-MM-YYYY').format('YYYY-MM-DD'),
                                    activity: booking[option]
                                }))
                                if(item?.booking !== null) navigation.navigate('JoinPetition')
                                else navigation.navigate('CreatePetition',{item})
                            }
                            console.log('item', item)
                            //item?.status === 2 ? navigation.navigate('JoinPetition')
                            //: navigation.navigate('CreatePetition',{item})
                        }}
                    />

               )}
            </View>
        </HeaderBooking>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft:15, 
        marginTop: 25
    },
    lblTitle:{
        color: ColorsCeiba.blackBtns, 
        fontSize: getFontSize(20), 
        fontWeight:'400',
        textTransform:'capitalize',
        marginBottom:10
    },
    contHoles:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginRight:10,
        zIndex:100
    },
    btnFilter:{
        width:106,
        height: 30,
        backgroundColor:ColorsCeiba.blackBtns,
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row', 
        paddingHorizontal:15,
    },
    contFilter:{
        position:'absolute',
        top:35,
        left:0,
        //paddingHorizontal:8,
        paddingTop:10,
        backgroundColor:ColorsCeiba.white,
        zIndex:10,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contAreas:{
        flexDirection:'row', 
        width: width*.6,  
        flexWrap:'wrap'
    },
    itemArea:{
        marginRight:15,
        borderBottomWidth: 2, 
        paddingBottom:5, 
        marginBottom:5
    },
    btnFilterOption:{
        flex:1,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:8
    }
})

export default CreateBookingScreen;