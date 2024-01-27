import LayoutV4 from "./Layouts/LayoutV4"
import { ImageBackground, TouchableOpacity } from "react-native";
import { Button, Image, Spinner, Switch, Text, View } from "native-base";
import React, { useState } from "react";
import { useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { createBookingGF, getAllBookings, getGFNextBooking } from "../api/Requests";
import moment from "moment";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from "@react-navigation/native";
import { dayWeek } from "../utils";
import { formatHour } from "../utils";

const FixedGroupDetail = ({appDuck, navigation, route}) => {
    const {schedule, groupData, userId, minPeople, maxPeople, blocked} = route.params;
    const [groupDataConst, setGroupDataConst] = useState(null);
    const [membersInvite, setMembersInvite] = useState([])
    const [membersInviteLeaders, setMembersInviteLeaders] = useState([]);
    const [membersInviteNames, setMembersInviteNames] = useState([])
    const [modalAskVisible, setModalAskVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('Se agendó correctamente el grupo fijo');
    const [dateBooking, setDateBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorBooking, setErrorBooking] = useState(false);
    const [init, setInit] = useState(true);
    const [bookingInvitations, setBookingInvitations] = useState([]);

    const toggle = (value, id, name, isLeader = false) => {
        if(!value){
            setMembersInvite(membersInvite.filter((item)=> item!=id));
            setMembersInviteNames(membersInviteNames.filter((item)=> item!=name));
            if(isLeader)
                setMembersInviteLeaders(membersInviteLeaders.filter((item)=>item!=id));
            return;
        }
        if(membersInvite.length >= maxPeople) return;
        setMembersInvite([...membersInvite, id]);
        setMembersInviteNames([...membersInviteNames, name]);
        if(isLeader)
            setMembersInviteLeaders([...membersInviteLeaders, id]);
    }

    useFocusEffect(
        React.useCallback(() => {
          //getAllFixedGroups();
            setMembersInvite([]);
            setMembersInviteLeaders([]);
            setMembersInviteNames([]);
            setGroupDataConst(groupData);
            setLoading(false);
            setErrorBooking(false);
          return () => {
            setBookingInvitations([]);
            setGroupDataConst(null);
          };
        }, [])
    );
    

    useEffect(()=>{
        matchBooking();
    }, [schedule]);

    useEffect(()=>{
        membersFormated();
    }, [membersInvite])

    const matchBooking = async () => {
        try {
            const bookings = await getAllBookings();
            const dueDateSplited = getNextDayOfWeek(dayWeek[schedule?.day].id).split('-');
            const dueDateParsed = dueDateSplited[2] + '-' + dueDateSplited[1] + '-' + dueDateSplited[0];
            
            const bookingFinded = bookings.data.items.filter((booking)=> booking.dueDate == dueDateParsed && booking.fixedGroupId == groupData.id && booking.dueTime == schedule?.fromHour);
            if(bookingFinded?.length >= 1) {
                setBookingInvitations(bookingFinded[0].invitations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getNextDayOfWeek = (dayOfWeek) => {
        const date = new Date();
        const sameDay = date.getDay() == dayOfWeek;
        var resultDate = new Date(date.getTime());
        if(!sameDay)
            resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        else
            resultDate.setDate(date.getDate() + 7 );
        
        if(!dateBooking){
            const dateParsed = moment(resultDate).format('YYYY-MM-DD')
            setDateBooking(dateParsed);
        }
        return moment(resultDate).format('DD-MM-YYYY');
    }

    const sendBooking = () => {
        setModalAskVisible(true);
    }

    const confirmBooking = async () => {
        try {
            let userLeader = null;
            if(membersInviteLeaders.length != 0){
                if(membersInviteLeaders.includes(userId)){
                    userLeader = userId;
                }else{
                    userLeader = membersInviteLeaders[0];
                }
            }
            if(!userLeader){
                userLeader = membersInvite[0];
            }

            const membersFiltered = membersInvite.filter((item)=>item != userLeader);

            const body = {
                dueDate : dateBooking,
                dueTime : schedule.fromHour,
                areaId : groupData.area.id,
                users : membersFiltered
            }
            console.log(body);
            setLoading(true);
            const response = await createBookingGF(body, [groupData.id, userLeader]);
            console.log(response?.data);
            if(response.data){
                setLoading(false);
                setTextModal('Se agendó correctamente el grupo fijo');
                setModalInfoVisible(true);
            }
            
        } catch (error) {
            console.log(error?.data);
            setErrorBooking(true);
            setTextModal('Ocurrió un error, intenta de nuevo');
            setModalInfoVisible(true);
            setLoading(false);
        }
    }

    const membersFormated = () =>{
        let membersString = ``;
        membersInviteNames.map((value)=>{
            membersString += (value + '\n')
        })
        return membersString;
    }

    const goHome = () => {
        if(!errorBooking){
            navigation.navigate('HomeScreen');
        }
        else{
            setErrorBooking(false);
        }
            
    }

    return(
        
        <LayoutV4 overlay={true}>
            <View flex={1} mx={4}>
                <Text textAlign={'center'} mt={8} mb={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>{groupData.name}</Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'lg'}>{groupData.area.service.name} | {groupData.area.name}</Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'md'}> {dayWeek[schedule?.day].day} {getNextDayOfWeek(dayWeek[schedule?.day].id)} </Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'md'} mb={8}> {formatHour(schedule?.fromHour)}</Text>
                {
                    groupData?.leaders?.map((valueGroup, index)=>{
                        return(
                            
                            (<View key={index} flexDirection={'row'} height={79} justifyContent={'center'} alignItems={'center'} bgColor={'#fff'} borderRadius={50} paddingX={6} mb={4} mx={4}
                                   style={{
                                       shadowColor: '#000',
                                       shadowOffset: { width: 0, height: 3 },
                                       shadowOpacity: 0.5,
                                       shadowRadius: 2,
                                       elevation:3
                                   }}>
                                <View flex={1} flexDirection={'column'} pr={1}>
                                    <Text numberOfLines={1} fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'md'}>{valueGroup.firstName}</Text>
                                    <Text numberOfLines={1} fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'sm'}> Responsable del grupo </Text>
                                </View>
                                <View flex={.5} borderLeftWidth={2} borderColor={Colors.secondary} height={'60%'} alignSelf={'center'}  justifyContent={'center'} alignItems={'center'}>
                                    <Switch
                                        justifyContent={'center'}
                                        trackColor={{ false: "#767577", true: blocked ? Colors.primary : valueGroup.id == userId  || membersInvite.includes(valueGroup.id) ? Colors.primary : '#767577'}}
                                        thumbColor={membersInvite.includes(valueGroup.id) ? "#f4f3f4" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(status)=>{toggle(status, valueGroup.id, valueGroup.firstName, true); }}
                                        value={blocked ? bookingInvitations.some((bi)=> bi.user.id  == valueGroup.id) : membersInvite.length <= 0 ? false : membersInvite.includes(valueGroup.id)}
                                        isDisabled={(membersInvite.length>=maxPeople && !membersInvite.includes(valueGroup.id)) || blocked}
                                    />
                                </View>
                            </View>
                            )
                        )
                    })
                }
                {
                    groupData?.members?.map((valueGroup, index)=>{
                        return(
                            <View key={index} flexDirection={'row'} height={79} justifyContent={'center'} alignItems={'center'} bgColor={'#fff'} borderRadius={50} paddingX={6} mb={4} mx={4}
                                  style={{
                                      shadowColor: '#000',
                                      shadowOffset: { width: 0, height: 3 },
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation:3
                                  }}>
                                <View flex={1} flexDirection={'column'} pr={1}>
                                    <Text numberOfLines={2} fontFamily={'titleConfortaaRegular'} color={Colors.primary} textAlign={'center'} fontSize={'md'}>{valueGroup.firstName}{'\n'}{valueGroup.lastName}</Text>
                                </View>
                                <View flex={.5} borderLeftWidth={2} borderColor={Colors.secondary} height={'60%'} alignSelf={'center'}  justifyContent={'center'} alignItems={'center'}>
                                <Switch
                                    justifyContent={'center'}
                                    trackColor={{ false: "#767577", true: blocked ? Colors.primary :membersInvite.includes(valueGroup.id) ? Colors.primary : "#767577"}}
                                    thumbColor={membersInvite.includes(valueGroup.id) ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(status)=>{toggle(status, valueGroup.id, valueGroup.firstName); }}
                                    value={blocked ? bookingInvitations.some((bi)=> bi.user.id == valueGroup.id) : membersInvite.length <= 0 ? false : membersInvite.includes(valueGroup.id)}
                                    isDisabled={(membersInvite.length>=maxPeople && !membersInvite.includes(valueGroup.id)) || blocked}
                                />
                                </View>
                            </View>
                        )
                    })
                }
                

                <View flex={1} mb={10} mt={5} px={10}>
                    <Button size={'lg'} disabled={loading || membersInvite.length<minPeople} opacity={loading || membersInvite.length < minPeople ? 0.5 : 1} onPress={sendBooking} mt={5}>{loading ? <Spinner size={'sm'} color={Colors.bgPrimaryText}></Spinner> : 'Aplicar'}</Button>
                </View>


                <ModalAsk
                setVisible={setModalAskVisible}
                visible={modalAskVisible}
                text={`¿Estás seguro que deseas agendar el grupo fijo?\n\n ${groupData.name} \n ${groupData.area.service.name} (${groupData.area.name}) \n${getNextDayOfWeek(dayWeek[schedule.day].id)} \n\n Miembros:\n ${membersFormated()}`}
                title={'Confirmación'}
                textButton={'Sī'}
                textNoButton={'No'}
                iconType={'check'}
                close={true}
                action={() => {
                    confirmBooking();
                    setModalAskVisible(false);
                }}/>

                <ModalInfo setVisible={setModalInfoVisible} visible={modalInfoVisible} close={false} iconType={'check'} textButton={'Aceptar'} text={textModal} action={goHome}/>
            </View>
            

        </LayoutV4>
    )
}

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}
export default connect(mapState)(FixedGroupDetail)