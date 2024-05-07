import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { getFontSize } from "../../../utils";
import { ColorsCeiba } from "../../../Colors";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { onDeletePlayer } from "../../../redux/ducks/bookingDuck";


const TablePlayers = ({players, showDelete=false}) => {
    const focused = useIsFocused();
    const dispatch = useDispatch();
    const tableHeaders = showDelete ? ['Estatus','Nombre','Socio',' '] : ['Estatus','Nombre','Socio']
    const [dataRows, setDataRows] = useState([])
    const user = useSelector(state => state.appDuck.user)


    //!showDelete && tableHeaders.pop()
    useEffect(() => {
        getDataRows()
    },[focused, players])

    const getDataRows = () => {
        if(players.length >0){
            let data = players.map((item, index) => (
                showDelete ? 
                [
                    item?.status || item?.idInvitado ? 'Confirmado' : 'Pendiente', 
                    `${item?.user?.firstName?.split(' ')[0] || item?.nombre?.split(' ')[0]} ${item?.user?.lastName?.split(' ')[0] || item?.apellidoPaterno?.split(' ')[0]}`, 
                    item?.membership?.id ? true : false, 
                    item?.id || item?.idInvitado
                ] : [
                    item?.status || item?.idInvitado ? 'Confirmado' : 'Pendiente', 
                    `${item?.user?.firstName?.split(' ')[0] || item?.nombre?.split(' ')[0]} ${item?.user?.lastName?.split(' ')[0] || item?.apellidoPaterno?.split(' ')[0]}`, 
                    item?.membership?.id ? true : false, 
                ]
            ))
            setDataRows(data)
        }else{

        }
    }

    const getDataInfo = (row, index) => {
        const types = {
            0: getStatus(row,index),
            1: getNames(row),
            2: getIsPartner(row, index),
            3: getDelete(row, index)
        }

        return types[index]
    }

    const getNames = (row) => {
        return <Text style={{alignItems:'center', fontSize: getFontSize(12), textTransform:'capitalize', paddingLeft:5}}>{row}</Text>
    }

    const getStatus = (row, index) => {
        const status = {
            'Confirmado' : ColorsCeiba.aqua,
            'Pendiente': ColorsCeiba.yellow
        }

        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={{width:12, height:12, borderRadius:6, backgroundColor: status[row], marginRight:5}}/>
                <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(12)}}>{row}</Text>
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
           showDelete && row != user?.partner?.id &&  <TouchableOpacity style={{alignItems:'center'}} onPress={() => dispatch(onDeletePlayer(row))}>
                <FontAwesome6 name="trash-can" size={20} color={ColorsCeiba.red} />
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <Table style={{}}>
                <Row data={tableHeaders} textStyle={{textAlign:'center', fontSize: getFontSize(16)}} style={{marginBottom:15}}/>
                {dataRows?.map((item, index) => (
                    <TableWrapper key={index} style={{flexDirection:'row', }} >
                        {item?.map((row, cellIndex) => (
                            <Cell key={cellIndex} data={getDataInfo(row, cellIndex)}   style={{ flex:1, marginBottom:15,}}/>
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

export default TablePlayers;