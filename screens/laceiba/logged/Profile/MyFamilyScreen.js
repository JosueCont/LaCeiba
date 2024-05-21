import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import { Skeleton } from "native-base";
import { useSelector } from "react-redux";
import { getFontSize } from "../../../../utils";
import { getPartnersFamily } from "../../../../api/Requests";
import { ColorsCeiba } from "../../../../Colors";
import { useIsFocused } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');

const MyFamilyScreen = () => {
    const focused = useIsFocused()
    const [loading, setLoading] = useState(true)
    const [membersFamily, setMembersFamily] = useState([])
    const user = useSelector(state => state.appDuck.user)


    useEffect(()=> {
        getInfoFamily()
    },[focused])

    const getInfoFamily = async() => {
        try {
            setLoading(true)
            console.log('user',user)
            const response = await getPartnersFamily(`?partnerId=${user?.partner?.id}&claveSocio=${user?.partner?.claveSocio}`)
            setMembersFamily(response?.data?.items)
            console.log('fmily', response?.data)
        } catch (e) {
            console.log('error',e)
        }finally{
            setLoading(false)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(18), alignSelf:'center', marginTop:15, marginBottom:30 }}>Familiares</Text>
            <View style={{ height: height , }}>
               {loading ? (
                    <View style={{alignItems:'center'}}>
                        {
                            Array.from({length:3}).map((_,index) => (
                                <Skeleton key={index} lines={1} borderRadius={8} height={20} width={width*.8} mb={2} backgroundColor={'gray.100'}/>
                            ))

                        }
                    </View>
               ): membersFamily.length > 0 ? (
                   <FlatList 
                        data={membersFamily}
                        keyExtractor={(item, index) => (index+1).toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flex:1, alignItems:'center'}}
                        renderItem={({item,index}) => (
                            <View style={{width: width*.8, height:80, backgroundColor: ColorsCeiba.lightgray, borderRadius:8, justifyContent:'center', paddingLeft:10, marginBottom:10}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={styles.contImage}>
                                        <Image source={require('../../../../assets/iconPerson.png')} style={styles.img}/>
                                    </View>
                                    <View style={{justifyContent:'center'}}>
                                        <Text style={{color: ColorsCeiba.darkGray, fontSize: getFontSize(16), fontWeight:'700', width: width*.5, textTransform:'capitalize'}}>{item?.nombreSocio}</Text>
                                        <Text style={{color: ColorsCeiba.darkGray}}>{item?.parentesco}</Text>
    
                                    </View>
    
                                </View>
                            </View>
                        )}
                    />

               ) :(
                <View>
                    <Text>No se han agregado familiares</Text>
                </View>
               )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    contImage:{
        width:60,
        height:60,
        borderRadius:300,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor: ColorsCeiba.white,
        marginRight:10,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    img:{
        width: 56, 
        height: 56,
        borderRadius:300, 
        resizeMode:'cover'
    },
})

export default MyFamilyScreen;