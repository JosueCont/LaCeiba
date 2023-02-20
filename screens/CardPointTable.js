import React from "react";
import {Button, Icon, Text, View, Image} from "native-base";
import {Colors} from "../Colors";
import { StyleSheet} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const CardPointTable = ({navigation, mb = 2}) => {


   const  tableHead = ['Hoyo', '1', '2', '3','4','5', '6', '7','8','9']
   const  tableHead2 = ['Hoyo', '10', '11', '12','13','14', '15', '16','17','18']

   const  tableData = [
      ['25', '', '', '', '', '', '', '', ''],
      ['2', '', '', '', '', '', '', '', ''],
    ]
    const  tableData2 = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
    ]
    const tableTitle= ['Score', 'Par']

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'transparent' },
        head: {  height: 40,  backgroundColor: 'transparent'},
        wrapper: { flexDirection: 'row' },
        title: {backgroundColor: 'transparent',},
        row: {  height: 40 },
        text: { textAlign: 'center' ,color: Colors.green, fontWeight:'bold' },
        textRow: { textAlign: 'center' ,color: Colors.green }

      });

    return (
        <View>
          <View mb={10}>
        <Table borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
          <Row data={tableHead} flexArr={[3.08, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
          <Col data={tableTitle} style={styles.title} heightArr={[40,40]}  textStyle={styles.textRow}/>
          <Rows data={tableData} flexArr={[1, 1,1,]} style={styles.row} textStyle={styles.textRow}/>
          </TableWrapper>
        </Table>
        </View>

        <View mb={5}>

        <Table borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
        <Row data={tableHead2} flexArr={[3.08, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
            <Col data={tableTitle} style={styles.title} heightArr={[40,40]}  textStyle={styles.textRow}/>
            <Rows data={tableData2} flexArr={[1, 1,1,]} style={styles.row} textStyle={styles.textRow}/>
        </TableWrapper>
        </Table>
        </View>   
        </View>       
    )
    
}


export default CardPointTable;