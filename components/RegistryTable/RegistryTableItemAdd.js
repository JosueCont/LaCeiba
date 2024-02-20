import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CloseIcon,
    Icon,
    Image,
    Select,
    Text,
    View
} from "native-base";
import {Colors} from "../../Colors";
import {Alert, KeyboardAvoidingView, Modal, Platform, TextInput, TouchableOpacity} from "react-native";
import iconEdit from "../../assets/iconEdit.png";
import iconTrash from "../../assets/iconTrash.png";
import moment from "moment";
import 'moment/locale/es';
import {Calendar} from "react-native-calendars";
import {AntDesign} from "@expo/vector-icons";

moment.locale('es');

const scoreStatus = {
    "WON": "Ganó",
    "LOST": "Perdió",
    "DRAW": "Empató"
}

const RegistryTableItemAdd = ({item, onAdd, onUpdate, onCancel, loading=false})=>{
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [date, setDate] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [status, setStatus] = useState('');
    const [points, setPoints] = useState('');
    const [dateOpacity, setDateOpacity] = useState(1);
    const [markedDates, setMarkedDates] = useState({})
    const selectRef = useRef()

    const onAddRecord = () =>{
        if(playerName.trim() === '') return
        let data = {
            date: moment(date).format('YYYY-MM-DD'),
            playerName : playerName.trim(),
            status,
            points: parseInt(points)
        }
        console.log(data)
        item ? onUpdate(data) : onAdd(data)
    }
    useEffect(()=>{
        if(item){
            console.log(item)
            setDate(item.date)
            setPlayerName(item.playerName)
            setStatus(item.status)
            setPoints(item.points.toString())
            let arrayDays = {};
            arrayDays[moment(item.date).format('YYYY-MM-DD')] = {selected:true, marked: true};
            setMarkedDates(arrayDays)
        }
    },[item])

    return (<View paddingY={3} paddingX={3} mb={1}
            style={{
                backgroundColor: Colors.gray
            }}>
        <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'} paddingBottom={1} >
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                {Platform.OS === 'android' ?
                    <TouchableOpacity
                        style={{width:'100%'}}
                        onPress={() => {
                            setShowCalendar(!showCalendar)
                        }
                    }>
                        <TextInput placeholder={'Fecha'}
                                   height={31}
                                   editable={false}
                                   value={(date ? moment(date).format('YYYY-MM-DD'): '')}
                                   style={{color:Colors.primary, fontSize:12, backgroundColor:'white', borderRadius:20, paddingHorizontal:3, textAlign:'center'}}/>
                    </TouchableOpacity>
                    :<TextInput placeholder={'Fecha'}
                            onPressIn={()=>{
                                setDateOpacity(0.5)
                            }}
                            onPressOut={(e) => {
                                setDateOpacity(1)
                                setShowCalendar(!showCalendar)
                            }}
                            height={31}
                            editable={false}
                            value={(date ? moment(date).format('YYYY-MM-DD'): '')}
                            style={{width:'100%',color:Colors.primary, fontSize:12, backgroundColor:'white',opacity:dateOpacity, borderRadius:20, paddingHorizontal:3, textAlign:'center'}}/>

                }
            </View>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <KeyboardAvoidingView
                    style={{width:'100%'}}
                    behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
                >
                    <TextInput
                        placeholder={'Nombre'}
                        height={31}
                        selectTextOnFocus={true}
                        value={playerName}
                        onChangeText={text => {
                            setPlayerName(text)
                        }}
                        style={{color:Colors.primary, fontSize:12, backgroundColor:'white', borderRadius:20, paddingHorizontal:3, textAlign:'center'}}/>
                </KeyboardAvoidingView>
            </View>
        </View>

            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'} paddingTop={1} paddingBottom={2} mb={2}>
                <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                    <Select
                        width={'100%'}
                        fontSize={12}
                        height={31}
                        paddingX={3}
                        dropdownIcon={<ChevronDownIcon style={{marginLeft:0, marginRight: 5}}/>}
                        dropdownOpenIcon={<ChevronUpIcon style={{marginLeft:0, marginRight: 5}}/>}
                        placeholder={'Resultado'}
                        selectedValue={status}
                        onValueChange={itemValue => {setStatus(itemValue)}}
                        style={{width: '100%'}}
                    >
                        {Object.keys(scoreStatus).map(e => <Select.Item key={e} label={scoreStatus[e]} value={e}/>)}
                    </Select>
                </View>
            <View flex={1} flexDirection={'column'} px={1} alignItems={'center'}>
                <KeyboardAvoidingView
                    style={{width:'100%'}}
                    behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
                >
                    <TextInput
                        height={31}
                        placeholder={'Puntos'}
                        keyboardType={'number-pad'}
                        value={points}
                        maxLength={3}
                        onChangeText={text => {
                            setPoints(old => text.replace(/[^-0-9.]/g, ''))
                        }}
                        selectTextOnFocus={true}
                        style={{color:Colors.primary, fontSize:12, backgroundColor:'white', borderRadius:20, paddingHorizontal:3, textAlign:'center'}}/>
                </KeyboardAvoidingView>
            </View>
        </View>
        {item ?
                <View flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} px={1} >
                    <Button
                        isDisabled={loading}
                        bgColor={Colors.red}
                        mr={2}
                        size={'xs'}
                        height={31}
                        lineHeight={1.5}
                        startIcon={<CloseIcon size={5} />}
                        onPress={onCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        isDisabled={date === '' || playerName.trim() === '' || status === '' || points === '' || loading}
                        isLoading={loading}
                        size={'xs'}
                        height={31}
                        lineHeight={1.5}
                        startIcon={<CheckIcon size={5} />}
                        onPress={onAddRecord}
                    >
                        Actualizar
                    </Button>
                </View>
            :
                <View flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} px={1} >
                    <Button
                        isDisabled={date === '' || playerName.trim() === '' || status === '' || points === '' || loading}
                        isLoading={loading}
                        size={'xs'}
                        height={31}
                        lineHeight={1.5}
                        startIcon={<CheckIcon size={5} />}
                        onPress={onAddRecord}
                    >
                        Agregar
                    </Button>
                </View>
            }
            <Modal
                animationType="slide"
                transparent={false}
                visible={showCalendar}
                onRequestClose={() => {
                    setShowCalendar(false)
                }}>
                    <View flex={1}>
                <Calendar
                    minDate={moment().subtract(1, 'weeks').format('YYYY-MM-DD')}
                    maxDate={moment().format('YYYY-MM-DD')}
                    markedDates={markedDates}
                    hideExtraDays={true}
                    firstDay={1}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                    onDayPress={day => {
                        setDate(day.dateString)
                        setShowCalendar(false)
                    }}
                    style={{
                        marginTop:25
                    }}
                    theme={{
                        'stylesheet.calendar.header': {
                            monthText: {
                                color: Colors.primary,
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
                        selectedDayTextColor: Colors.bgPrimaryText,
                    }}
                />
                </View>
                <View flex={0.25} justifyContent={'center'} alignItems={'center'}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: Colors.primary, borderRadius: 60}}
                                      onPress={() =>{ 
                                        setShowCalendar(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'lg'}></Icon>
                    </TouchableOpacity>
                    </View>
            </Modal>
</View>
    )
}

export default RegistryTableItemAdd