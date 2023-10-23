import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {addPartnerSap} from "../../api/Requests";
import {connect} from "react-redux";
import {errorCapture} from "../../utils";
import { useIsFocused } from "@react-navigation/core";





const ModalAddPartnerSap = ({visible, setVisible, appDuck, action}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [validateEmptyName, setValidateEmptyName] = useState(false)
    const [validateEmptyLastNameFather, setValidateEmptyLastNameFather] = useState(false)
    const [validateEmptyLastNameMother, setValidateEmptyLastNameMother] = useState(false)
    const [validateEmptyEmail, setValidateEmptyEmail] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    const [name, setName] = useState('');
    const [lastNameFather, setLastNameFather] = useState('');
    const [lastNameMother, setLastNameMother] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(visible){
            return;
        }
        resetValues();
    }, [visible])

    const resetValues = () => {
        setName('');
        setLastNameFather('');
        setLastNameMother('');
        setEmail('');
        setIsLoading(false);
    }


    const handleSubmit = async() => {
        try {
           let hasErrors = false;
           if(name.length <= 0){
               setValidateEmptyName(true);
               hasErrors = true;
           }
           if(lastNameFather.length <= 0){
               setValidateEmptyLastNameFather(true);
               hasErrors = true;
           }
           if(lastNameMother.length <= 0){
               setValidateEmptyLastNameMother(true);
               hasErrors = true;
           }
           if(email.length <= 0){
               setValidateEmptyEmail(true);
               hasErrors = true;
           }

           if(hasErrors){
               return;
           }
           let params ={
            name,
            lastNameFather,
            lastNameMother,
            email
           }
           console.log(params);
           setIsLoading(true);
           const response = await addPartnerSap(params, null);
        //    setTimeout(() => {
        //     setIsLoading(false);
        //     setVisible(false);
        //     action(true)
        //    }, 3000);
           console.log(response.data);
           if (response.status=== 200 || response.status == 201) {
               setIsLoading(false);
               setVisible(false);
               action(true)
            }
        } catch (e) {
            console.log(e);
            let v = await errorCapture(e);
            alert(v.value)
            setIsLoading(false);
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
                                        resetValues();
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View>
                        <Text style={styles.modalText} mb={3} fontSize={'xl'}>Nombre</Text>
                        <Input maxLength={60} width={'full'}  mb={3} isRequired value={name.toUpperCase()}  onChangeText={val =>{
                            setValidateEmptyName(false);
                            setName(val.toUpperCase())
                        }}/>
                        <FormControl isInvalid={validateEmptyName} mb={3}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio
                            </FormControl.ErrorMessage>
                        </FormControl>


                        <Text style={styles.modalText} mb={3} fontSize={'xl'}>Apellido paterno</Text>
                        <Input maxLength={60} width={'full'}  mb={3} isRequired value={lastNameFather.toUpperCase()}  onChangeText={val =>{
                            setValidateEmptyLastNameFather(false);
                            setLastNameFather(val.toUpperCase())
                        }}/>
                        <FormControl isInvalid={validateEmptyLastNameFather} mb={3}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio
                            </FormControl.ErrorMessage>
                        </FormControl>


                        <Text style={styles.modalText} mb={3} fontSize={'xl'}>Apellido materno</Text>
                        <Input maxLength={60} width={'full'}  mb={3} isRequired value={lastNameMother.toUpperCase()}  onChangeText={val =>{
                            setValidateEmptyLastNameMother(false);
                            setLastNameMother(val.toUpperCase())
                        }}/>
                        <FormControl isInvalid={validateEmptyLastNameMother} mb={3}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <Text style={styles.modalText} mb={3} fontSize={'xl'}>Correo electrónico</Text>
                        <Input maxLength={100} width={'full'}  mb={3} isRequired value={email}  onChangeText={val =>{
                            setValidateEmptyEmail(false);
                            setEmail(val)
                        }}/>
                        <FormControl isInvalid={validateEmptyEmail} mb={3}>
                            <FormControl.ErrorMessage _text={{color: "white"}} leftIcon={<WarningOutlineIcon  size="xs" />}>
                                El valor no puede ser vacio
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button colorScheme={'green'} isLoading={isLoading} onPress={() => {
                            setValidateEmptyName(false);
                            setValidateEmptyLastNameFather(false);
                            setValidateEmptyLastNameMother(false);
                            setValidateEmptyEmail(false);
                            handleSubmit();
                        }} mt={4} mb={1}>Guardar información</Button>
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

export default connect(mapState)(ModalAddPartnerSap);
