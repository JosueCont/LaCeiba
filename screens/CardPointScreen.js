import React from "react";
import { Button, Icon, Text, View, Image } from "native-base";
import { Colors } from "../Colors";
import LayoutV4 from "./Layouts/LayoutV4";
import bannerCardPoints from "../assets/bannerCardPoints.png"
import matechesIconGreen from "../assets/matechesIconGreen.png"
import CardPointTable from "./CardPointTable";
const CardPointScreen = ({ navigation }) => {

    return (
        <LayoutV4>
            <View position={'relative'} mb={5}>
                <Image source={bannerCardPoints} style={{ width: '100%', height: 200 }}></Image>
                <View p={6} position={'absolute'} flexDirection={'row'}>
                    <View mr={3} background={Colors.yellow} height={'auto'} width={'1px'}>
                    </View>
                    <View justifyContent={'space-between'} width={'150px'}>
                        <Text color={'#ffff'} fontFamily={'titleComfortaaBold'} fontSize={'md'}>Francisco Hernandez</Text>
                        <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>10/Mar/23</Text>
                        <Text color={'#ffff'} fontFamily={'titleLight'} fontSize={'md'}>9:00 am</Text>
                        <Text width={'50%'} color={'#ffff'} fontFamily={'titleComfortaaBold'} numberOfLines={2} fontSize={'md'}>GHIN 123456</Text>
                    </View>
                </View>

            </View>
            <View flex={1} mx={6} mb={5}>
                <Text textAlign={'center'} mt={5} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'xl'}>TARJETA DE PUNTUACIÓN</Text>
                <View flexDirection={'row'} mt={5} mb={5} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
                    <Text mr={2} color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'sm'}>Marcas</Text>

                    <Button pl={1} mr={2} height={6} width={6} background={'#29A0E3'} colorScheme={'#29A0E3'}>
                    </Button>
                    <Button p={2} borderColor={Colors.green} mr={2} height={6} width={6} background={'white'} colorScheme={'white'}>
                    </Button>
                    <Button p={2} mr={2} height={6} width={6} colorScheme={'red'}>
                    </Button>
                    <Button p={2} mr={2} height={6} width={6} colorScheme={'yellow'}>
                    </Button>
                    <Button p={2} mr={2} height={6} width={6} background={'black'} colorScheme={'black'}>
                    </Button>

                    <Button borderRadius={'3xl'} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                        Ver mas
                    </Button>
                </View>
                <CardPointTable/>
                <View p={6} justifyContent={'center'} flexDirection={'row'}>
                    <Image source={matechesIconGreen} width={'70px'} height={'70px'} mr={3}></Image>

                    <View mr={3} background={Colors.yellow} height={'auto'} width={'2px'}>
                    </View>
                    <View justifyContent={'space-between'}>
                        <Text color={Colors.green} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 1:  96</Text>
                        <Text color={Colors.green} fontFamily={'titleRegular'} fontSize={'md'}>Vuelta 2:  96</Text>
                        <Text color={Colors.green} fontFamily={'titleComfortaaBold'} fontWeight={'bold'} fontSize={'md'}>TOTAL:  188</Text>
                    </View>
                </View>

                <View mt={4} mb={4} justifyContent={'center'} flexDirection={'row'}>
                    <Button borderRadius={'3xl'} colorScheme={Colors.yellow} background={Colors.yellow} px={4} py={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} _text={{ color: Colors.green, fontWeight: 'bold', fontSize: '18px' }}>
                        HANDICAP = 123
                    </Button>
                </View>
            </View>

        </LayoutV4>

    )

}


export default CardPointScreen;