import React, {useState,useEffect} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from './ModalSliderSheet';
import {Button, Icon, Text, View, Input,FormControl, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../Colors";
import {LinearGradient} from "expo-linear-gradient";
import {getPoints,transferPoints} from "../../api/Requests";
import {connect} from "react-redux";
import {editUser} from "../../api/Requests";
import SliderCustomScoreCard from "../../components/SliderCustom/SliderCustomScoreCard";
import {Image as ImageRN} from "react-native";




const ModalScoreDetails = ({visible, setVisible}) => {
    const [heightGradient, setHeightGradient] = useState(null);
    const [sliderPosition, setSliderPosition] = useState(0);



    return (
        <Modal
            presentationStyle="pageSheet"
            animationType="slide"
            visible={visible}
            transparent={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={{...styles.modalView, height: '100%'}} onLayout={(event) => {
                    const {x, y, height, width} = event.nativeEvent.layout;
                    setHeightGradient(height)
                }}>
                
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: 25, height: 25, position: 'absolute', right: -8, top:2, backgroundColor: Colors.greenV4, borderRadius: 60}}
                                      onPress={() =>{ 
                                        setVisible(false)
                                      }}>
                        <Icon as={AntDesign} name={'close'} color={'white'} size={'xs'}></Icon>
                    </TouchableOpacity>
                   
                    <View flex={1} justifyContent={'center'} alignItems={'center'} height={230} style={{height: '100%'}}>
                        <SliderCustomScoreCard 
                             height={'100%'}
                             items={[
                                {image: ImageRN.resolveAssetSource(require('../../assets/scoreCard9.png')).uri},
                                {image: ImageRN.resolveAssetSource(require('../../assets/scoreCard18.png')).uri}
                            ]}
                            position={sliderPosition}
                            setPosition={setSliderPosition}
                        />
                    </View>
                </View>
            </View>
        </Modal>

    );
};


export default ModalScoreDetails
