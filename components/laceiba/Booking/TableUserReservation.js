import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { onDeletePlayer } from "../../../redux/ducks/bookingDuck";



const TableUserReservation = ({players, showQr, onDeletePlayer, hostId, isPast}) => {
    const focused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector(state => state.appDuck.user)
    const tableHeaders = hostId === user?.id && !isPast ? ['Estatus','Invitado','Socio','QR',' '] : ['Estatus','Invitado','Socio','QR']
    const [dataRows, setDataRows] = useState([])


    useEffect(() => {
        getDataRows()
    },[focused, players])

    const getDataRows = () => {
        if(players.length >0){
            let data = players.map((item, index) => hostId === user?.id && !isPast ? (
                [
                    item?.status === 'CONFIRMED' ? 'Confirmado' : item?.status ==='REJECTED' ? 'Rechazado' : 'Pendiente', 
                    item?.user !== null ? `${item?.user?.firstName?.split(' ')[0]} ${item?.user?.lastName?.split(' ')[0] }` : item?.guestName,
                    item?.user?.partner?.id ? true : false, 
                    item,
                    item
                ] 
            ):(
                [
                    item?.status === 'CONFIRMED' ? 'Confirmado' : item?.status ==='REJECTED' ? 'Rechazado' : 'Pendiente', 
                    item?.user !== null ? `${item?.user?.firstName?.split(' ')[0]} ${item?.user?.lastName?.split(' ')[0] }` : item?.guestName,
                    item?.user?.partner?.id ? true : false, 
                    item,
                ]
            ))
            console.log('data',data)
            setDataRows(data)
        }else{

        }
    }

    const getDataInfo = (row, index) => {
        const types = {
            0: getStatus(row,index),
            1: getNames(row),
            2: getIsPartner(row, index),
            3: getQr(row, index),
            4: getDelete(row, index)
        }

        return types[index]
    }

    const getQr = (row, index) => {
        return(
            hostId === user?.id && row?.status !== 'PENDING' && row?.status !== 'REJECTED' && row?.status !=='Rechazado'? (
                <TouchableOpacity style={{alignItems:'center'}} onPress={() => showQr(row)}>
                    <Ionicons name="qr-code-outline" size={24} color={ColorsCeiba.aqua} />
                </TouchableOpacity>
            ): row?.user?.id === user?.id &&  row?.status !== 'PENDING' && row?.status !== 'REJECTED' && row?.status !=='Rechazado' && (
                <TouchableOpacity style={{alignItems:'center'}} onPress={() => showQr(row)}>
                    <Ionicons name="qr-code-outline" size={24} color={ColorsCeiba.aqua} />
                </TouchableOpacity>
            )
        )
    }

    const getNames = (row) => {
        return <Text style={{alignItems:'center', fontSize: getFontSize(11), textTransform:'capitalize', paddingLeft:5}}>{row}</Text>
    }

    const getStatus = (row, index) => {
        const status = {
            'Confirmado' : ColorsCeiba.aqua,
            'Pendiente': ColorsCeiba.yellow,
            'PENDING': ColorsCeiba.yellow,
            'CONFIRMED': ColorsCeiba.aqua,
            'REJECTED': ColorsCeiba.red,
            'Rechazado': ColorsCeiba.red
        }

        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{width:12, height:12, borderRadius:6, backgroundColor: status[row], marginRight:5}}/>
                <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(11)}}>{row}</Text>
            </View>
        )
    }

    const getIsPartner = (row) => {
        return(
            <View style={{ alignItems:'center'}}>
                {row ? <AntDesign name="check" size={20} color="black" />
                : <AntDesign name="close" size={20} color="black" />}

            </View>
        )
    }

    const getDelete = (row, index) => {
        return(
            row?.userId != user?.id && hostId === user?.id && <TouchableOpacity style={{alignItems:'center'}} onPress={() =>onDeletePlayer(row)}>
                <FontAwesome6 name="trash-can" size={20} color={ColorsCeiba.red} />
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <Table style={{}}>
                <Row data={tableHeaders} textStyle={{textAlign:'center', fontSize: getFontSize(16)}} style={{marginBottom:15,}} />
                {dataRows?.map((item, index) => (
                    <TableWrapper key={index} style={{flexDirection:'row',}} >
                        {item?.map((row, cellIndex) => (
                            <Cell key={cellIndex} data={getDataInfo(row, cellIndex)}   style={{ flex:1, marginBottom:15,}} />
                        ))}
                    </TableWrapper>
                ))}
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //width: '100%',
        flex:1,
        marginBottom:15,
        justifyContent:'center', 
        marginHorizontal:10
        //backgroundColor:'red'
    }
})

export default TableUserReservation;