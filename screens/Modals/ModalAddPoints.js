import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";

const ModalAddPoints = ({visible, setVisible, points, textButton = 'Enviar', people, textButtonCancel = 'Cancelar', action}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false)


    const validate = () => {
        if(value>0 && value<=20){
            setValidateEmpty(false);
            setValue('')
            action(true)
        }else{
            setValidateEmpty(true)
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
                                        setValue('')
                                        setValidateEmpty(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>
                        <Text style={styles.modalText} mb={8} fontSize={'sm'}>Puntos disponibles</Text>
                        <Text style={styles.modalText}  mb={8} fontSize={'lg'} >Asignar puntos a {people?.user?.fullName}</Text>
                        <Input  mb={2} maxLength={2 } isRequired value={value}  onChangeText={val =>{
                            setValue(val)
                             points(parseInt(val))
                        }} keyboardType="numeric" mx="3" placeholder="Puntos" w="100%" />
                        <FormControl isInvalid={validateEmpty}  mb={6}>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                El valor no puede ser vacio y deber ser mayor a 0 y maximo 20 puntos
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button colorScheme={'green'} onPress={() => validate()} mb={4}>{textButton}</Button>
                        <Button colorScheme={'green'} onPress={() => {
                            action(false)
                            setValue('')
                            setValidateEmpty(false)
                        }}>{textButtonCancel}</Button>

                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalAddPoints;