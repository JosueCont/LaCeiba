import LayoutV4 from "./Layouts/LayoutV4"
import LayoutV3 from "./Layouts/LayoutV3";
import bgButton from "../assets/bgButton.png";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Button, Image, Spinner, Switch, Text, View } from "native-base";
import React, { useState } from "react";
import { useEffect } from "react";
import { Colors } from "../Colors";
import {connect} from "react-redux";
import { createBookingGF, getGFNextBooking } from "../api/Requests";
import moment from "moment";
import ModalAsk from "./Modals/ModalAsk";
import ModalInfo from "./Modals/ModalInfo";
import { useFocusEffect } from "@react-navigation/native";
import { dayWeek } from "../utils";
import { formatHour } from "../utils";

const FixedGroupDetail = ({appDuck, navigation, route}) => {
    const {schedule, groupData, userId} = route.params;
    const [groupDataConst, setGroupDataConst] = useState(null);
    const [membersInvite, setMembersInvite] = useState([])
    const [membersInviteNames, setMembersInviteNames] = useState([])
    const [modalAskVisible, setModalAskVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [textModal, setTextModal] = useState('Se agendó correctamente el grupo fijo');
    const [dateBooking, setDateBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(true);

    const toggle = (value, id, name) => {
        if(!value){
            setMembersInvite(membersInvite.filter((item)=> item!=id));
            setMembersInviteNames(membersInviteNames.filter((item)=> item!=name));
            return;
        }
        if(membersInvite.length >= 3) return;
        setMembersInvite([...membersInvite, id]);
        setMembersInviteNames([...membersInviteNames, name]);
    }

    useFocusEffect(
        React.useCallback(() => {
          //getAllFixedGroups();
          setMembersInvite([]);
            setMembersInviteNames([]);
            setGroupDataConst(groupData);
          return () => {
            setGroupDataConst(null);
          };
        }, [])
    );

    useEffect(()=>{
        // setMembersInvite([]);
        // setMembersInviteNames([]);
    }, [])

    useEffect(()=>{
        membersFormated();
    }, [membersInvite])

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
            const body = {
                dueDate : dateBooking,
                dueTime : schedule.fromHour,
                areaId : groupData.area.id,
                users : membersInvite
            }
            console.log(body);
            setLoading(true);
            const response = await createBookingGF(body, [groupData.id, userId]);
            console.log(response?.data);
            if(response.data){
                setLoading(false);
                setTextModal('Se agendó correctamente el grupo fijo');
                setModalInfoVisible(true);
            }
            
        } catch (error) {
            console.log(error);
            setTextModal('Ocurrió un error, intenta de nuevo');
        }
    }

    const membersFormated = () =>{
        let membersString = `${appDuck.user.firstName}\n`;
        membersInviteNames.map((value)=>{
            membersString += (value + '\n')
        })
        return membersString;
    }

    const goHome = () => {
        navigation.navigate('HomeScreen');
    }

    return(
        
        <LayoutV4 white={true} overlay={true}>
            <View>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'lg'}> {groupData.name} </Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'lg'}> {groupData.area.service.name} </Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'md'}> {groupData.area.name} </Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'md'}> {dayWeek[schedule.day].day} {getNextDayOfWeek(dayWeek[schedule.day].id)} </Text>
                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} mt={5} textAlign={'center'} fontSize={'md'}> {formatHour(schedule.fromHour)} - {formatHour(schedule.toHour)} </Text>
                {
                    groupDataConst?.leaders?.map((valueGroup, index)=>{
                        return(
                            
                            (<View ml={10} mt={5} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                                <View flexDirection={'column'}>
                                    <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} textAlign={'center'} fontSize={'md'}> {valueGroup.firstName} </Text>
                                    <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} textAlign={'center'} fontSize={'sm'}> Responsable del grupo </Text>
                                </View>
                                
                                <Switch
                                    key={index}
                                    justifyContent={'center'}
                                    trackColor={{ false: "#767577", true: membersInvite.includes(valueGroup.id) ? Colors.green : '#767577'}}
                                    thumbColor={membersInvite.includes(valueGroup.id) ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(status)=>{toggle(status, valueGroup.id, valueGroup.firstName); }}
                                    value={valueGroup.id == userId ? true : membersInvite.length <= 0 ? false : membersInvite.includes(valueGroup.id)}
                                    disabled={(valueGroup.id == userId) || (membersInvite.length>=groupData.area.maxPeople -1 && !membersInvite.includes(valueGroup.id))}
                                />
                            </View>
                            )
                        )
                    })
                }
                {
                    groupDataConst?.members?.map((valueGroup, index)=>{
                        return(
                            <View ml={10} mt={5} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                                <Text fontFamily={'titleConfortaaRegular'} color={Colors.green} textAlign={'center'} fontSize={'md'}> {valueGroup.firstName} </Text>
                                <Switch
                                    key={index}
                                    justifyContent={'center'}
                                    trackColor={{ false: "#767577", true: membersInvite.includes(valueGroup.id) ? Colors.green : "#767577"}}
                                    thumbColor={membersInvite.includes(valueGroup.id) ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(status)=>{toggle(status, valueGroup.id, valueGroup.firstName); }}
                                    value={membersInvite.length <= 0 ? false : membersInvite.includes(valueGroup.id)}
                                    disabled={membersInvite.length>=groupData.area.maxPeople -1 && !membersInvite.includes(valueGroup.id)}
                                />
                            </View>
                        )
                    })
                }
                

                <View flex={1} mb={10} mx={20}>
                    <Button disabled={loading || membersInvite.length<groupData.area.minPeople -1} opacity={loading || membersInvite.length < groupData.area.minPeople -1 ? 0.5 : 1} onPress={sendBooking} mt={5}>{loading ? <Spinner size={'sm'} color={'white'}></Spinner> : 'Aplicar'}</Button>
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