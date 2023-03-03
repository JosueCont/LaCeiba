import {Button, Icon, Text, View, Image} from "native-base";
import {Colors} from "../Colors";
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import ModalAddScore from "./Modals/ModalAddScore";
import  Reaact, { useState, useEffect } from "react";
import {useIsFocused} from "@react-navigation/native";
import {getOnePartnersScoreCards, editPartnersScoreCard} from "../api/Requests";
import moment from "moment";

const CardPointTable = ({navigation, mb = 2, idHole=null, action}) => {


   const  tableHead = ['Hoyo', '1', '2', '3','4','5', '6', '7','8','9']
   const  tableHead2 = ['Hoyo', '10', '11', '12','13','14', '15', '16','17','18']
   const [openModalScore, setOpenModalScore] = useState(false)
   const [holeScore, setHoleScore] = useState(null)
   const [holeScorePoints, setHoleScorePoints] = useState(['','','','','','','','','',''])
   const isFocused = useIsFocused();
   const [showTable1, setShowTable1] = useState(false)
   const [showTable2, setShowTable2] = useState(false)
   const [matchData, setMatchData] = useState([])   
   const [numHoles, setNumHoles] = useState(null)
   const [area, setArea] = useState(null)

useEffect(() => {
  getHoles()
}, [isFocused])

const getHoles = async() =>{
  const response = await getOnePartnersScoreCards('', [idHole])
  let numHoles = response.data.numHoles
  let area = response.data.booking.area.name  
  setArea(area)
  setNumHoles(numHoles)
  setMatchData(response.data)

  if(numHoles == 9 && area ==='Hoyo 1'){
    setShowTable1(true)
    setShowTable2(false)
  }
  else if (numHoles == 9 && area ==='Hoyo 10'){
    setShowTable1(false)
    setShowTable2(true)
  }
  else if(numHoles == 18 && area === 'Hoyo 1'){
    setShowTable1(true)
    setShowTable2(true)
  }
  else if(numHoles == 18 && area ==='Hoyo 10'){
    setShowTable1(false)
    setShowTable2(true)
  }

  let newHole = response.data.holes.sort((a, b) => parseFloat(a.hole) - parseFloat(b.hole));
  let holes = newHole.map(e=>{
      if(e.point === 0){
        e.point = ''
      }
      return e.point
  } )
  setHoleScorePoints(holes)
}


   const elementButton1 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[0]}</Text>
    </TouchableOpacity>
    
  );
  const elementButton2 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[1]}</Text>
    </TouchableOpacity>
  );
  const elementButton3 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[2]}</Text>
    </TouchableOpacity>
  );
  const elementButton4 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[3]}</Text>
    </TouchableOpacity>
  );
  const elementButton5 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[4]}</Text>
    </TouchableOpacity>
  );
  const elementButton6 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[5]}</Text>
    </TouchableOpacity>
  );
  const elementButton7 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[6]}</Text>
    </TouchableOpacity>
  );
  const elementButton8 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[7]}</Text>
    </TouchableOpacity>
  );
  const elementButton9 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[8]}</Text>
    </TouchableOpacity>
  );
  const elementButton10 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
        { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[0]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[9]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton11 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[1]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[10]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton12 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[2]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[11]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton13 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[3]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[12]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton14 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[4]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[13]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton15 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[5]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[14]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton16 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[6]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[15]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton17 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
     if(todayDate === matchData.booking.dueDate){
      setHoleScore(value)
      setOpenModalScore(true)
     }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[7]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[16]}</Text>
        }
    </TouchableOpacity>
  );
  const elementButton18 = (value) => (
    <TouchableOpacity style={{ backgroundColor: '#bfc9c5', justifyContent:'center' ,height:'100%' }} onPress={() => {
      let todayDate = moment().format('YYYY-MM-DD')
      if(todayDate === matchData.booking.dueDate){
       setHoleScore(value)
       setOpenModalScore(true)
      }
      }}>
         { numHoles === 9 && area ==='Hoyo 10' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[8]}</Text>
        }
          { numHoles === 18 || area ==='Hoyo 10' || area ==='Hoyo 1' &&
      <Text textAlign={'center'} color={Colors.green}>{holeScorePoints[17]}</Text>
        }
    </TouchableOpacity>
  );

  const AssginPoints = async (value, numHole) => {

    try {

      let data = {
          numHole: parseInt(numHole),
          newPoints: parseInt(value)
      }
      const response = await editPartnersScoreCard(data, [idHole])
      if(response.status == 200){
        getHoles()
        action(true)  
      }
    } catch (e) {
      alert(e)
      
    }
  }

   const  tableData = [
      [elementButton1(1), elementButton2(2), elementButton3(3), elementButton4(4), elementButton5(5), elementButton6(6), elementButton7(7), elementButton8(8), elementButton9(9)],
      ['4', '4', '4', '3', '5', '3', '4', '4', '5'],
    ]
    const  tableData2 = [
      [elementButton10(10), elementButton11(11), elementButton12(12), elementButton13(13), elementButton14(14), elementButton15(15), elementButton16(16), elementButton17(17), elementButton18(18)],
      ['4', '4', '4', '3', '5', '3', '4', '4', '5'],
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
          { showTable1 &&
          <View mb={10}>
        <Table borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
          <Row data={tableHead} flexArr={[3.08, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
          <Col data={tableTitle} style={styles.title} heightArr={[40,40]}  textStyle={styles.textRow}/>
          <Rows data={tableData} flexArr={[1, 1,1,]} style={styles.row} textStyle={styles.textRow}/>
          </TableWrapper>
        </Table>
        </View>
          }
         { showTable2 &&
        <View mb={5}>

        <Table borderStyle={{borderWidth: 1, borderColor: Colors.green}} color={Colors.green}>
        <Row data={tableHead2} flexArr={[3.08, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
            <Col data={tableTitle} style={styles.title} heightArr={[40,40]}  textStyle={styles.textRow}/>
            <Rows data={tableData2} flexArr={[1, 1,1,]} style={styles.row} textStyle={styles.textRow}/>
        </TableWrapper>
        </Table>
        </View>  
          }

           <ModalAddScore
                visible={openModalScore}
                setVisible={setOpenModalScore}
                numerHole={holeScore}
                AssginPoints={AssginPoints}
                >   
            </ModalAddScore> 
        </View>       
    )
    
}


export default CardPointTable;