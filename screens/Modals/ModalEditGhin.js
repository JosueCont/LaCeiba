import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints} from "../../api/Requests";
import {connect} from "react-redux";
import {editUser} from "../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";





const ModalEditGhin = ({visible, setVisible, appDuck,action}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false)
    const [pointsUser, setPointsUser] = useState(null)

    useEffect(() => {
        getGhinUser()
    }, [visible])


    const getGhinUser = async() =>{
        const ghin =  await AsyncStorage.getItem('ghin');
        setValue(ghin)
    }


    const handleSubmit = async() => {
        try {
           let params ={
            ghin: value
           }
           const response = await editUser(params, [appDuck.user.id]);
           if (response.status=== 200) {
               setVisible(false);
               await AsyncStorage.setItem('ghin', value)
               action(true)
            }
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
            setSending(false)
            action(false)

        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView} onLayout={(event) => {
                    const {x, y, height, width} = event.nativeEvent.layout;
                    setHeightGradient(height)
                }}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={[Colors.greenV5, Colors.greenV2]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: heightGradient,
                            borderRadius: 20
                        }}
                    />
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.greenV4, borderRadius: 60}}
                                      onPress={() =>{ 
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>
                        <Text style={styles.modalText} mb={8} fontSize={'2xl'}>GHIN</Text>
                        <Input maxLength={7} width={'full'}  mb={5} isRequired value={value}  onChangeText={val =>{
                            setValue(val)
                        }}/>
                        {/* <FormControl isInvalid={validateEmpty} mb={6}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio y deber ser mayor a 0 y maximo {pointsUser} puntos
                            </FormControl.ErrorMessage>
                        </FormControl> */}
                        <Button colorScheme={'green'} onPress={() => handleSubmit()} mt={4} mb={1}>Actualizar</Button>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ModalEditGhin);
