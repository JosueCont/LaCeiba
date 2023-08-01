import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints, transferPointsMembers} from "../../api/Requests";
import {connect} from "react-redux";



const ModalAddPoints = ({visible, error=false, setVisible, partnerAccion, points, textButton = 'Enviar', people, textButtonCancel = 'Cancelar', action, appDuck}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false)
    const [pointsUser, setPointsUser] = useState(null)

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
    
        if(value>0 && value<=pointsUser){
            if(partnerAccion){
                setValidateEmpty(false);
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
              const response = await transferPoints(params);
              if(response?.data?.status){
                action(true)
              }else{
                action(false)
                error(true)
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
                        <Text style={styles.modalText} mb={8} fontSize={'sm'}>Puntos disponibles: {pointsUser}</Text>
                        <Text style={styles.modalText}  mb={8} fontSize={'lg'} >Asignar puntos a {people?.nombreSocio}</Text>
                        <Input  mb={2} isRequired value={value}  onChangeText={val =>{
                            let numberRegex = /^\d+$/;
                            const formatNumber= numberRegex.test(val) ? val : ''
                            setValue(formatNumber)
                             points(parseInt(val))
                        }} keyboardType="numeric" mx="3" placeholder="Puntos a transferir" w="100%" />
                        <FormControl isInvalid={validateEmpty} mb={6}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacío y debe ser mayor a 0 y máximo {pointsUser} puntos
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button colorScheme={'green'} onPress={() => validate(people)} mb={4}>{textButton}</Button>
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

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ModalAddPoints);
