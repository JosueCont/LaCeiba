import LayoutV4 from "./Layouts/LayoutV4";
import {Button, Icon, Text, View} from "native-base";
import React from "react";
import {Colors} from "../Colors";
import {AntDesign} from "@expo/vector-icons";
import moment from "moment";


const BookingConfirmScreenSuccess = ({route, navigation}) => {
    return (
        <LayoutV4 white={true}>
            <View flex={1} mx={8} pt={10}>

                <View flex={1}>
                    <View alignItems={'center'} mb={10}>
                        {/* <ImageBackground borderRadius={60} source={bgButton} style={{height: 100, width: 100, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={iconPersonSmall} width={'50%'} resizeMode={'contain'}/>
                        </ImageBackground> */}
                        <Icon as={AntDesign} name={'checkcircleo'} color={Colors.yellow} size={'6xl'}/>
                    </View>

                    <Text mb={5} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'xl'}>EL CAMPO DE GOLF HA SIDO RESERVADO CON ÉXITO</Text>
                    

                    <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>FECHA Y HORA</Text>
                    <Text mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        {moment(route?.params?.date,"YYYY-MM-DD").format("DD-MM-YYYY")} a las</Text>
                    <Text mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>
                        {moment(route?.params?.hour,"HH:mm").format("hh:mm a")}
                    </Text>
                    {
                        route?.params?.people.some(person => person.data.type == 'p') &&
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>SOCIOS</Text>
                    }
                    {
                        route?.params?.people.map((person, index)=>{
                            return(
                                person.data.type == 'p' && <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>{person.name}</Text>
                            )
                        })
                    }
                   

                    {
                        route?.params.people.some(person => person.data.type == 'g') &&
                        <Text my={5} mb={2} textAlign={'center'} color={Colors.green} fontFamily={'titleBrandonBldBold'} fontSize={'md'}>INVITADOS</Text>
                        // &&
                    }
                    {
                        route?.params?.people.map((person, index)=>{
                            return(
                                person.data.type == 'g' && <Text textAlign={'center'} color={Colors.green} fontFamily={'titleConfortaaRegular'} fontSize={'md'}>{person.name}</Text>
                            )
                        })
                    }

                    
                    <Button my={6} onPress={() => navigation.navigate('HomeScreen')}>De acuerdo</Button>
                </View>

            </View>

        </LayoutV4>
    )
}

export default BookingConfirmScreenSuccess;