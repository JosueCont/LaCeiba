import React, { useState, useEffect } from "react";
import { Button, Icon, Text, View, Image } from "native-base";
import { Colors } from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import bannerCardPoints from "../assets/bannerCardPoints.png"
import matechesIconGreen from "../assets/matechesIconGreen.png"
import CardPointTable from "./CardPointTable";
import ModalScoreDetails from "./Modals/ModalScoreDetails";
import moment from "moment";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";






const CardPointScreen = ({ route, navigation, appDuck }) => {


const [colorSelected, setColorSelected] = useState(null)
const [openModal, setOpenModal] = useState(false)
const isFocused = useIsFocused();
const [ghin, setGhin] = useState(null)


useEffect(() => {
    if (isFocused) {
        getProfileFunction()
    }
}, [isFocused])



const getProfileFunction = async () => {
    const ghin = await AsyncStorage.getItem('ghin');
    setGhin(ghin)
}


    return (
        <LayoutV4>
            <View position={'relative'} mb={5}>
                <Image source={bannerCardPoints} style={{ width: '100%', height: 200 }}></Image>
                <View p={6} position={'absolute'} flexDirection={'row'}>
                    <View mr={3} background={Colors.yellow} height={'auto'} width={'1px'}>
                    </View>
                    <View justifyContent={'space-between'} width={'150px'}>
                        <Text color={'#ffff'} fontFamily={'titleComfortaaBold'} fontSize={'md'}>{appDuck.user.fullName}</Text>
                        <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>{moment(route.params.dataScore.booking?.dueDate, "YYYY-MM-DD").format('DD/MMM/YY')}</Text>
                        <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>{moment(route.params.dataScore.booking.dueTime, "HH:mm").format("hh:mm a")}</Text>
                        <Text width={'50%'} color={'#ffff'} fontFamily={'titleComfortaaBold'} numberOfLines={2} fontSize={'md'}>{ghin ? `GHIN: ${ghin}` : 'No especificado'}</Text>
                    </View>
                </View>

            </View>
            <View flex={1} mx={6} mb={5}>
                <Text textAlign={'center'} mt={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'xl'}>TARJETA DE PUNTUACIÓN</Text>
                <View flexDirection={'row'} mt={5} mb={5} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                    <Text mr={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Marcas</Text>
                   
                     <Button  onPress={() =>{
                        let color = 'blue'
                        setColorSelected(color)
                    }} 
                     pl={1} mr={2} height={6} width={6}  style={colorSelected ==='blue' ? {backgroundColor:'#29A0E3', borderColor:'black', borderWidth:2} : {backgroundColor:'#29A0E3'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'white'
                        setColorSelected(color)
                    }} 
                     p={2} borderColor={Colors.green} mr={2} height={6} width={6}  style={colorSelected ==='white' ? {backgroundColor:'#fff', borderColor:'black', borderWidth:2} : {backgroundColor:'#fff'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'red'
                        setColorSelected(color)
                    }} 
                     p={2} mr={2} height={6} width={6} style={colorSelected ==='red' ? {backgroundColor:'red', borderColor:'black', borderWidth:2} : {backgroundColor:'red'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'gold'
                        setColorSelected(color)
                    }} 
                     p={2} mr={2} height={6} width={6} style={colorSelected ==='gold' ? {backgroundColor:'gold', borderColor:'black', borderWidth:2} : {backgroundColor:'gold'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'green'
                        setColorSelected(color)
                    }} 
                     p={2} mr={2} height={6} width={6} style={colorSelected ==='green' ? {backgroundColor:Colors.green, borderColor:'black', borderWidth:2} : {backgroundColor:Colors.green}} >
                    </Button>
                    <Button onPress={()=>setOpenModal(true)} borderRadius={'3xl'} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                        Ver mas
                    </Button>
                </View>
                <CardPointTable idHole={route.params.dataScore.id}/>
                <View p={6} justifyContent={'center'} flexDirection={'row'}>
                    <Image source={matechesIconGreen} width={'70px'} height={'70px'} mr={3}></Image>

                    <View mr={3} background={Colors.yellow} height={'auto'} width={'2px'}>
                    </View>
                    <View justifyContent={'space-between'}>
                        <Text color={Colors.green} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 1:  {route.params.dataScore.round1}</Text>
                        <Text color={Colors.green} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 2:  {route.params.dataScore.round2}</Text>
                        <Text color={Colors.green} fontFamily={'titleComfortaaBold'} fontWeight={'bold'} fontSize={'md'}>TOTAL:  {route.params.dataScore.round1 + route.params.dataScore.round2 }</Text>
                    </View>
                </View>

                <View mt={4} mb={4} justifyContent={'center'} flexDirection={'row'}>
                    <Button borderRadius={'3xl'} colorScheme={Colors.yellow} background={Colors.yellow} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} _text={{ color: Colors.green, fontWeight: 'bold', fontSize: '18px' }}>
                         {`HANDICAP: ${route.params.dataScore.handicap}`}
                    </Button>
                </View>
            </View>
        
            <ModalScoreDetails
                visible={openModal}
                setVisible={setOpenModal}
                >   
            </ModalScoreDetails>

        </LayoutV4>

    )

}


const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(CardPointScreen);