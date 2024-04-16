import React, {useEffect, useState} from "react";
import { View,  } from "native-base";
import { StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from "react-native";
import HeaderBooking from "../../../../components/laceiba/Headers/HeaderBooking";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { ColorsCeiba } from "../../../../Colors";
import { getFontSize } from "../../../../utils";
import AvailableDaysItem from "../../../../components/laceiba/Booking/AvailableDaysItem";
import { MaterialIcons } from '@expo/vector-icons';
import AvailableHours from "../../../../components/laceiba/Booking/AvailableHours";


const {height, width} = Dimensions.get('window');

const CreateBookingScreen = () => {
    const navigation = useNavigation()
    const option = useSelector(state => state.bookingDuck.option)
    const [availableDays, setAvailableDays] = useState([])
    const [selectDay, setSelectDay] = useState(0)
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        console.log('cargando nuevos')
    },[option])

    useEffect(() => {
        getDays()
    },[])

    const getDays = () => {
        let today = moment();
        const daysArray = [];

        daysArray.push({day:today.format('dddd'), date: today.format('D')});

        for (let i = 1; i <= 6; i++) {
            const nextDay = today.clone().add(i, 'days');
            daysArray.push({day:nextDay.format('dddd'), date: nextDay.format('D')});
        }
        setAvailableDays(daysArray)
        //console.log(daysArray)
    }

    const options = [
        {name:'Tee 1'}, {name: 'Tee 10'}
    ]

    const filters = [
        {name:'Todos', color: ColorsCeiba.white},
        {name:'Disponibles', color:ColorsCeiba.aqua},
        {name:'Reservado', color:ColorsCeiba.lightYellow},
        {name:'Ocupado', color:ColorsCeiba.lightgray},

    ]

    const hours = [
        {"id":1,"date":"3:09 PM","status":1},
        {"id":2,"date":"6:06 AM","status":3},
        {"id":3,"date":"2:43 PM","status":3},
        {"id":4,"date":"1:14 PM","status":3},
        {"id":5,"date":"11:40 AM","status":2},
        {"id":6,"date":"2:01 PM","status":3},
        {"id":7,"date":"11:48 AM","status":1},
        {"id":8,"date":"4:01 PM","status":1},
        {"id":9,"date":"1:25 PM","status":3},
        {"id":10,"date":"11:27 AM","status":2},
        {"id":11,"date":"11:25 AM","status":3},
        {"id":12,"date":"9:27 AM","status":3},
        {"id":13,"date":"11:24 AM","status":1},
        {"id":14,"date":"12:01 PM","status":2},
        {"id":15,"date":"8:29 AM","status":2},
        {"id":16,"date":"11:52 AM","status":3},
        {"id":17,"date":"1:54 PM","status":3},
        {"id":18,"date":"2:27 PM","status":2},
        {"id":19,"date":"11:24 AM","status":1},
        {"id":20,"date":"8:38 AM","status":1},
        {"id":21,"date":"3:57 PM","status":1},
        {"id":22,"date":"8:28 AM","status":3},
        {"id":23,"date":"1:09 PM","status":1},
        {"id":24,"date":"3:09 PM","status":1},
        {"id":25,"date":"7:24 AM","status":2},
        {"id":26,"date":"8:27 AM","status":2},
        {"id":27,"date":"11:01 AM","status":2},
        {"id":28,"date":"1:19 PM","status":1},
        {"id":29,"date":"8:35 AM","status":2},
        {"id":30,"date":"4:03 PM","status":2},
        {"id":31,"date":"8:52 AM","status":1},
        {"id":32,"date":"11:39 AM","status":1},
        {"id":33,"date":"8:52 AM","status":1},
        {"id":34,"date":"10:50 AM","status":1},
        {"id":35,"date":"3:14 PM","status":1}
    ]

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
                                />
                            )}
                        />
                    ):(
                        <Text>No hay días</Text>
                    )}
                </View>
                
                <View style={styles.contHoles}>
                    <View style={{flexDirection:'row'}}>
                        {options.map((item,index) => (
                            <TouchableOpacity key={index+1} style={{marginRight:15,borderBottomWidth: 2, borderBottomColor: ColorsCeiba.blackBtns, paddingBottom:5}}>
                                <Text>{item?.name}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                    <View style={{zIndex:10}}>
                        <TouchableOpacity style={styles.btnFilter} onPress={() => setShowFilter(!showFilter)}>
                            <Text style={{color: ColorsCeiba.white, fontSize: getFontSize(12), fontWeight:'400'}}>Filtro</Text>
                            <MaterialIcons name="filter-list" size={20} color={ColorsCeiba.white} />
                        </TouchableOpacity>
                        {showFilter && (
                            <View style={styles.contFilter}>
                                {filters.map((item,index) => (
                                    <TouchableOpacity key={index+1} style={{flex:1, height:50, flexDirection:'row',}}>
                                        <View style={{width:15, height:15, borderRadius:7.5, marginRight:4, backgroundColor: item?.color}}/>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                </View>


                <AvailableHours 
                    hours={hours} 
                    selectedHour={(item) =>{
                        console.log('item', item)
                        item?.status === 2 ? navigation.navigate('JoinPetition')
                        : navigation.navigate('CreatePetition',{item})
                    }}
                />
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
        paddingHorizontal:8,
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
    }
})

export default CreateBookingScreen;