import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon, Toast, useToast} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints, transferPointsMembers} from "../../api/Requests";
import {connect} from "react-redux";



const ModalAddPoints = ({visible, error=false, setVisible, partnerAccion, points, textButton = 'Enviar', people, textButtonCancel = 'Cancelar', action, appDuck}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false);
    const [validateEnoughtPoints, setValidateEnoughtPoints] = useState(false);
    const [pointsUser, setPointsUser] = useState(null)
    const toast = useToast();
    const [messageError, setMessageError] = useState(null);

    useEffect(() => {
            getPointsFunction()
    }, [people])

    const getPointsFunction = async () => {
        try {
            const response = await getPoints('', [appDuck.user.id]);
            setPointsUser(response.data.totalPoints)

        } catch (e) {
            console.log(e.status)
        } finally {
        }
    }



    const validate = async(people) => {

        if(pointsUser == 0 || pointsUser < value){
            setValidateEnoughtPoints(true);
            return;
        }
    
        if(value>0 && value<=pointsUser){
            if(partnerAccion){
                setValidateEmpty(false);
                setValidateEnoughtPoints(false);
                setValue('')

                let params = {
                    "fromId": appDuck.user.id,
                    "toId": people.user.id,
                    "points": parseInt(value)
                }
                const response = await transferPointsMembers(params);
                if (response?.data?.status) {
                    action(true)
                } else {
                    action(false)
                    error(true)
                }
                return;
            }
            setValidateEmpty(false);
            setValue('')
            let params = {
                "fromId": appDuck.user.id,
                "toId": people.user.id,
                "points": parseInt(value)
              }
              try {
                const response = await transferPoints(params);
                console.log('res: ', response?.data);
                if(response?.data?.status){
                    action(true)
                }else{
                    toast.show({
                        description: response?.data?.message
                    });
                    action(false)
                    error(true)
                }  
              } catch (error) {
                setMessageError(error?.data?.message);
                setTimeout(() => {
                    setMessageError(null);
                }, 4000);
              }
              
              
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
                        colors={[Colors.modal.bgColor1, Colors.modal.bgColor2]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: heightGradient,
                            borderRadius: 20
                        }}
                    />
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top: -14, backgroundColor: Colors.darkPrimary, borderRadius: 60}}
                                      onPress={() =>{ 
                                        setVisible(false)
                                        setValue('')
                                        setValidateEmpty(false)
                                        setValidateEnoughtPoints(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={Colors.bgPrimaryText} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>
                        <Text style={styles.modalText} mb={8} fontSize={'sm'}>Puntos disponibles: {pointsUser}</Text>
                        <Text style={styles.modalText}  mb={8} fontSize={'lg'} >Asignar puntos a {people?.nombreSocio}</Text>
                        <Input  mb={2} isRequired value={value}  onChangeText={val =>{
                            let numberRegex = /^\d+$/;
                            const formatNumber= numberRegex.test(val) ? val : ''
                            setValue(formatNumber)
                             points(parseInt(val))
                        }} keyboardType="numeric" mx="3" placeholder="Puntos a transferir" w="100%" />
                        <FormControl isInvalid={validateEnoughtPoints} mb={6}>
                            <FormControl.ErrorMessage _text={{color: Colors.modal.textColor}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                No tienes suficientes puntos
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={validateEmpty} mb={6}>
                            <FormControl.ErrorMessage _text={{color: Colors.modal.textColor}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacío y debe ser mayor a 0 y máximo 12 puntos
                            </FormControl.ErrorMessage>
                        </FormControl>
                        {
                            messageError && 
                            <Text style={styles.modalText} mb={8} fontSize={'xs'} >{messageError} </Text>
                        }
                        <Button colorScheme={'green'} onPress={() => validate(people)} mb={4}>{textButton}</Button>
                        <Button colorScheme={'green'} onPress={() => {
                            action(false)
                            setValue('')
                            setValidateEmpty(false)
                            setValidateEnoughtPoints(false)
                        }}>{textButtonCancel}</Button>

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

export default connect(mapState)(ModalAddPoints);
