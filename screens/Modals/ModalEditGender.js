import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalInfoStyleSheet';
import {Button, Icon, Text, View, Input, FormControl, WarningOutlineIcon, Select} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints} from "../../api/Requests";
import {connect} from "react-redux";
import {editUser} from "../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {errorCapture, genders} from "../../utils";





const ModalEditGender = ({visible, setVisible, appDuck,action, partner}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [value, setValue] = useState('')
    const [validateEmpty, setValidateEmpty] = useState(false)
    const [pointsUser, setPointsUser] = useState(null)

    useEffect(() => {
        if(visible && partner){
            setValue(partner.user.gender)
            console.log(appDuck.user)
        }
    }, [visible, partner])



    const handleSubmit = async() => {
        try {
           let params ={
            gender: value
           }
           console.log(params)
           const response = await editUser(params, [appDuck.user.id]);
           if (response.status=== 200) {
               setVisible(false);
               action(true)
            }
        } catch (e) {
            let v = await errorCapture(e);
            alert(v.value)
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
                        <Text style={styles.modalText} mb={8} fontSize={'2xl'}>Género</Text>
                        <Select
                            width={250}
                            maxWidth={'100%'}
                            defaultValue={value}
                            onValueChange={(val) => {
                                setValue(val)
                            }}
                            onClose={()=> setFieldTouched('gender', true)}>
                            <Select.Item label={'No especificado'} value={''}/>
                            {Object.keys(genders).map(key => <Select.Item key={key} label={genders[key]} value={key}/>)}
                        </Select>
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

export default connect(mapState)(ModalEditGender);
