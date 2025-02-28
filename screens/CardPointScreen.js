import React, { useState, useEffect } from "react";
import { Button, Icon, Text, View, Spinner } from "native-base";
import { Colors } from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import bannerCardPoints from "../assets/bannerCardPoints.png"
import matechesIconGreen from "../assets/matechesIconGreen.png"
import golfMatchIcon from "../assets/golfMatchIcon.png"
import CardPointTable from "./CardPointTable";
import ModalScoreDetails from "./Modals/ModalScoreDetails";
import moment from "moment";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getOnePartnersScoreCards,editColorScoreCard} from "../api/Requests";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions, Image, ImageBackground } from "react-native";
import Constants from "expo-constants";
import { imageImport } from "../organizations/assets/ImageImporter";






const CardPointScreen = ({ route, navigation, appDuck }) => {


const [colorSelected, setColorSelected] = useState(null)
const [openModal, setOpenModal] = useState(false)
const isFocused = useIsFocused();
const [ghin, setGhin] = useState(null)
const [dataMatch, setDataMatch] = useState([])
const [loading, setLoading] = useState(null);

useEffect(() => {
    if (isFocused) {
        getProfileFunction()
       getMatch()
    }
}, [isFocused])

const getMatch = async() =>{
    try {
    setLoading(true)
    const response = await getOnePartnersScoreCards('', [route.params.dataScore.id])
    setDataMatch(response.data)
    setColorSelected(response.data.color)
    setLoading(false)
    } catch (e) {
        setLoading(false)
        alert(e)
    }
  }
  
const getProfileFunction = async () => {
    const ghin = await AsyncStorage.getItem('ghin');
    setGhin(ghin)
}
const updateColorScoreCard = async(color) => {
    try {
        let data = {
            color,
        }
        const response = await editColorScoreCard(data, [dataMatch.id])
        if(response.status == 200){
            setColorSelected(color)
          }    
        } catch (e) {
            alert(e)
            setColorSelected(null)
        } 
}


    return (
        <LayoutV4>
            <View position={'relative'} mb={5}>
                <Image source={bannerCardPoints} style={{ width: '100%', height: 200 }}></Image>
                <View p={6} position={'absolute'} flexDirection={'row'}>
                    <View mr={3} background={Colors.secondary} height={'auto'} width={'1px'}>
                    </View>
                    <View justifyContent={'space-between'} width={'150px'}>
                        <Text color={'#ffff'} fontFamily={'titleComfortaaBold'} fontSize={'md'}>{appDuck.user.fullName}</Text>
                       {/*  <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>{moment(route.params.dataScore.booking?.dueDate, "YYYY-MM-DD").format('DD/MMM/YY')}</Text>
                        <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>{moment(route.params.dataScore.booking.dueTime, "HH:mm").format("hh:mm a")}</Text> */}
                        <Text color={'#ffff'} fontFamily={'titleComfortaaBold'} numberOfLines={2} fontSize={'md'}>{ghin ? `GHIN: ${ghin}` : 'GHIN: No especificado'}</Text>
                    </View>
                </View>
            </View>
            <View flex={1} mx={6} mb={5}>
                <Text textAlign={'center'} mt={5} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'xl'}>TARJETA DE PUNTUACIÓN</Text>
                {dataMatch && dataMatch.numHoles && dataMatch.booking && <Text textAlign={'center'} color={Colors.primary} mb={3}>{dataMatch.numHoles} hoyos a jugar, iniciando en {dataMatch.booking.area.name}</Text>}
                <View flexDirection={'row'} mt={5} mb={5} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                    <Text mr={2} color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Marcas</Text>
                    <Button  onPress={() =>{
                        let color = 'Negras'
                        setColorSelected(color)
                        updateColorScoreCard(color)
                    }}
                    p={2} mr={2} height={6} width={6} style={colorSelected ==='Negras' ? {backgroundColor:'black', borderColor:'white', borderWidth:2} : {backgroundColor:'black'}}>
                    </Button>
                     <Button  onPress={() =>{
                        let color = 'Azules'
                        setColorSelected(color)
                        updateColorScoreCard(color)
                    }} 
                     pl={1} mr={2} height={6} width={6}  style={colorSelected ==='Azules' ? {backgroundColor:'#29A0E3', borderColor:'black', borderWidth:2} : {backgroundColor:'#29A0E3'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'Blancas'
                        setColorSelected(color)
                        updateColorScoreCard(color)
                    }} 
                     p={2} borderColor={Colors.primary} mr={2} height={6} width={6}  style={colorSelected ==='Blancas' ? {backgroundColor:'#fff', borderColor:'black', borderWidth:2} : {backgroundColor:'#fff'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'Doradas'
                        setColorSelected(color)
                        updateColorScoreCard(color)
                    }} 
                     p={2} mr={2} height={6} width={6} style={colorSelected ==='Doradas' ? {backgroundColor:'gold', borderColor:'black', borderWidth:2} : {backgroundColor:'gold'}}>
                    </Button>
                    <Button  onPress={() =>{
                        let color = 'Rojas'
                        setColorSelected(color)
                        updateColorScoreCard(color)
                    }} 
                     p={2} mr={2} height={6} width={6} style={colorSelected ==='Rojas' ? {backgroundColor:'red', borderColor:'black', borderWidth:2} : {backgroundColor:'red'}}>
                    </Button>
                    <Button onPress={()=>setOpenModal(true)} borderRadius={'3xl'} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                        Ver más
                    </Button>
                </View>
                <Text colo mb={4}  color={Colors.primary} fontFamily={'titleComfortaaBold'} fontSize={'xs'} textAlign={'center'}>
                *Presiona sobre una casilla para agregar el score
                </Text>
                {
                    loading === true ?
                    <Spinner color={Colors.primary} size={'lg'} />
                    :
                loading === false &&
                <View>
                <CardPointTable 
                idHole={route.params.dataScore.id}
                action={(v) => {
                    if (v === true) {
                        getMatch()
                    }
                }}
                />                 
                <View p={6} justifyContent={'center'} flexDirection={'row'}>
                    <ImageBackground source={imageImport(Constants.expoConfig.slug).bgButton} style={{width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}} borderRadius={60}>
                        <Image source={golfMatchIcon} width={21} height={21}/>
                    </ImageBackground>

                    <View ml={3} mr={3} background={Colors.secondary} height={'auto'} width={'2px'}>
                    </View>
                    <View justifyContent={'space-between'}>
                        <Text color={Colors.primary} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 1:  {dataMatch.round1}</Text>
                        <Text color={Colors.primary} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 2:  {dataMatch.round2}</Text>
                        <Text color={Colors.primary} fontFamily={'titleComfortaaBold'} fontWeight={'bold'} fontSize={'md'}>TOTAL:  {dataMatch.round1 + dataMatch.round2 }</Text>
                    </View>
                </View>
                <View mt={4} mb={4} justifyContent={'center'} flexDirection={'row'}>
                    { dataMatch.numHoles == 18 &&
                    <Button borderRadius={'3xl'} colorScheme={Colors.secondary} background={Colors.secondary} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} _text={{ color: Colors.primary, fontWeight: 'bold', fontSize: '18px' }}>
                         {`HANDICAP: ${dataMatch.handicap}`}
                    </Button>
                        }
                </View>
                </View>
                }
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