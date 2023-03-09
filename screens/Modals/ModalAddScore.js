import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,Image,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints} from "../../api/Requests";
import {connect} from "react-redux";
import {editUser} from "../../api/Requests";
import golfFlag from '../../assets/golfFlag.png';
import AsyncStorage from "@react-native-async-storage/async-storage";





const ModalAddScore = ({visible, setVisible, appDuck,action, numerHole,AssginPoints}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false)
    const [pointsUser, setPointsUser] = useState(null)





    const handleSubmit = async() => {
        setVisible(false)
        setValue('')
        AssginPoints(value, numerHole)
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
                        <View justifyContent={'center'} alignItems={'center'}>
                        <Image  source={golfFlag} style={{width: 60, height: 60}}></Image>   
                        </View>

                        <Text color={Colors.yellow} style={styles.modalText} mt={2} mb={4} fontSize={'2xl'}>Hoyo {numerHole}</Text>
                        <Text style={styles.modalText} mb={1} fontSize={'sm'}>Score</Text>
                    
                        <Input width={'full'} maxLength={3} mb={5} isRequired value={value}  onChangeText={val =>{
                             let numberRegex = /^\d+$/;
                             const formatNumber= numberRegex.test(val) ? val : ''
                            setValue(formatNumber)
                        }}/>
                        {/* <FormControl isInvalid={validateEmpty} mb={6}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio y deber ser mayor a 0 y maximo {pointsUser} puntos
                            </FormControl.ErrorMessage>
                        </FormControl> */}
                        <Button colorScheme={'green'} disabled={value=== ''} onPress={() => handleSubmit()} mt={4} mb={1}>Agregar</Button>
                        <Button colorScheme={'green'} onPress={() => setVisible(false)} mt={2} mb={1}>Cancelar</Button>

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

export default connect(mapState)(ModalAddScore);
