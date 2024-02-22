import React from "react";
import {Image, Text, View, useToast} from "native-base";
import {Colors} from "../../Colors";
import iconDownload from "../../assets/iconDownload.png";
import iconView from "../../assets/iconView.png";
import {TouchableOpacity, Share} from "react-native";
import * as Linking from 'expo-linking';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


const ManualItem = ({navigation, mb = 2, id, title = 'Title', url = '', type = '', html = ''}) => {

    const toast = useToast();


    const downloadFile =()=>{
        // Linking.openURL(url);
        if(url.includes('.pdf')){
        Linking.openURL(url);
        }else{
            let filename = url.substring(url.lastIndexOf('/')+1);
        let fileUri = FileSystem.documentDirectory + filename;
        FileSystem.downloadAsync(url, fileUri)
        .then(( {uri} ) => {
            saveFile(uri)
        })
          .catch(error => {
            console.ecrror(error);
          })   
        }
    }
    
    const saveFile = async (url) => {
        let { status } = await MediaLibrary.getPermissionsAsync();
        if (status === "granted") {
            console.log(url.toString())
            const asset = await MediaLibrary.createAssetAsync(url.toString())
            toast.show({
                description: "Imagen guardada en tu galería."
            })
        }
    }

    return (
        <View flexDirection={'row'} height={50} bgColor={'#fff'} borderRadius={50} mb={mb}>
            <View flex={1} justifyContent={'center'} pl={5}>
                <Text color={Colors.primary} fontSize={'xs'}>{title}</Text>
            </View>
            <View flex={0.4} mx={5} flexDirection={'row'} justifyContent={'flex-end'} alignSelf={'flex-end'} alignItems={'flex-end'} alignContent={'flex-end'}>
                {
                    type !== 'HTML' &&
                    <TouchableOpacity style={{flex: 1}} onPress={() => {
                        downloadFile()
                    }}>
                        <View flex={1} justifyContent={'center'} alignItems={'flex-end'}>
                            <Image source={iconDownload} style={{width: 30, height: 30}}></Image>
                        </View>
                    </TouchableOpacity>
                }


                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    if (type === 'HTML') {
                        navigation.navigate('HTMLViewer', {id: id, htmlString: html, title: title})

                    } else {
                        navigation.navigate('PDFAndImageViewer', {url: url, title: title})

                    }
                }}>
                    <View flex={1} justifyContent={'center'} alignItems={'flex-end'}>
                        <Image source={iconView} style={{width: 30, height: 30}}></Image>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default ManualItem;