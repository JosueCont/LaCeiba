import React from "react";
import {Button, Image, View} from "native-base";
import imgLogo from '../assets/imgLogo.png';
import Layout from "./Layouts/Layout";
import * as Notifications from 'expo-notifications';
import { Linking } from "react-native";

const StartScreen = ({navigation}) => {

    const askForPermissionPushNotifications = async (screen) => {
        const {status} = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate(screen)
        } else {
            navigation.navigate('AskForPushNotificationsScreen')
        }
    }

    const openGoogleWallet = () => {
        Linking.openURL('https://pay.google.com/gp/v/save/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YWxsZXQtd2ViLWNsaWVudEB0ZXN0cGFzc2VzLTM3NDUxNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsIm9yaWdpbnMiOlsid3d3LmV4YW1wbGUuY29tIl0sInR5cCI6InNhdmV0b3dhbGxldCIsInBheWxvYWQiOnsiZ2VuZXJpY0NsYXNzZXMiOlt7ImlkIjoiMzM4ODAwMDAwMDAyMjE5NjE5NS5lNzQ0ZGE4MS0xMGIxLTQ1NjctOWQyNi05MzNjYTI4MWFiMDkifV0sImdlbmVyaWNPYmplY3RzIjpbeyJpZCI6IjMzODgwMDAwMDAwMjIxOTYxOTUudXNlcjEyMzQiLCJjbGFzc0lkIjoiMzM4ODAwMDAwMDAyMjE5NjE5NS5lNzQ0ZGE4MS0xMGIxLTQ1NjctOWQyNi05MzNjYTI4MWFiMDkiLCJzdGF0ZSI6IkFDVElWRSIsImhlcm9JbWFnZSI6eyJzb3VyY2VVcmkiOnsidXJpIjoiaHR0cHM6Ly9mYXJtNC5zdGF0aWNmbGlja3IuY29tLzM3MjMvMTExNzcwNDExMTVfNmU2YTNiNmY0OV9vLmpwZyJ9LCJjb250ZW50RGVzY3JpcHRpb24iOnsiZGVmYXVsdFZhbHVlIjp7Imxhbmd1YWdlIjoiZW4tVVMiLCJ2YWx1ZSI6Ikhlcm8gaW1hZ2UgZGVzY3JpcHRpb24ifX19LCJ0ZXh0TW9kdWxlc0RhdGEiOlt7ImhlYWRlciI6IkhlYWRlciBoYWNpZW5kYSIsImJvZHkiOiJCb2R5IGhhY2llbmRhIiwiaWQiOiJURVhUX01PRFVMRV9JRCJ9XSwibGlua3NNb2R1bGVEYXRhIjp7InVyaXMiOlt7InVyaSI6Imh0dHA6Ly9tYXBzLmdvb2dsZS5jb20vIiwiZGVzY3JpcHRpb24iOiJMaW5rIG1vZHVsZSBVUkkgZGVzY3JpcHRpb24iLCJpZCI6IkxJTktfTU9EVUxFX1VSSV9JRCJ9LHsidXJpIjoidGVsOjY1MDU1NTU1NTUiLCJkZXNjcmlwdGlvbiI6IkxpbmsgbW9kdWxlIHRlbCBkZXNjcmlwdGlvbiIsImlkIjoiTElOS19NT0RVTEVfVEVMX0lEIn1dfSwiaW1hZ2VNb2R1bGVzRGF0YSI6W3sibWFpbkltYWdlIjp7InNvdXJjZVVyaSI6eyJ1cmkiOiJodHRwOi8vZmFybTQuc3RhdGljZmxpY2tyLmNvbS8zNzM4LzEyNDQwNzk5NzgzXzNkYzNjMjA2MDZfYi5qcGcifSwiY29udGVudERlc2NyaXB0aW9uIjp7ImRlZmF1bHRWYWx1ZSI6eyJsYW5ndWFnZSI6ImVuLVVTIiwidmFsdWUiOiJJbWFnZSBtb2R1bGUgZGVzY3JpcHRpb24ifX19LCJpZCI6IklNQUdFX01PRFVMRV9JRCJ9XSwiYmFyY29kZSI6eyJ0eXBlIjoiUVJfQ09ERSIsInZhbHVlIjoiUVIgY29kZSJ9LCJjYXJkVGl0bGUiOnsiZGVmYXVsdFZhbHVlIjp7Imxhbmd1YWdlIjoiZW4tVVMiLCJ2YWx1ZSI6IlBydWViYSBlbnRyYWRhIGdvbGYifX0sImhlYWRlciI6eyJkZWZhdWx0VmFsdWUiOnsibGFuZ3VhZ2UiOiJlbi1VUyIsInZhbHVlIjoiUHJ1ZWJhIGhlYWRlciBnb2xmIn19LCJoZXhCYWNrZ3JvdW5kQ29sb3IiOiIjNDI4NWY0IiwibG9nbyI6eyJzb3VyY2VVcmkiOnsidXJpIjoiaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3dhbGxldC1sYWItdG9vbHMtY29kZWxhYi1hcnRpZmFjdHMtcHVibGljL3Bhc3NfZ29vZ2xlX2xvZ28uanBnIn0sImNvbnRlbnREZXNjcmlwdGlvbiI6eyJkZWZhdWx0VmFsdWUiOnsibGFuZ3VhZ2UiOiJlbi1VUyIsInZhbHVlIjoiR2VuZXJpYyBjYXJkIGxvZ28ifX19fV19LCJpYXQiOjE2NzM5NzIxNjl9.YEV4tCnVrHJJDS05diwPyl2JMld28_7IpRlJtEhrEgw7g2nhvUfyINtLP1FMDn4WZsm8-N_lHwJZrJrKGpFvIK4iKlnpSDfvqrTZCGFZtJGTIX4FpI3mM9uaQS6GjovZY2C08oH9Fk1H9pCsczWh7pdH2znoIKqCHnKOG49jKNP7bd6aPcSqqEJj7c6HqVevREaGqljdPWlIk8MsoEaLaHGlWu3A_Vnn-C_xU6APYZFxG2wUrsuThneAvNS_5IPFwSBTOpDPjz9o_YODHWyrjBbw5zhz1JX_u8gLn8Z0eKG4xuArDaBajxQGKGCgI6OfEfAALmxvauqo2SfqOq_-nA');
    }


    return (
        <Layout>
            <View flex={0.7} alignItems={'center'} justifyContent={'flex-end'}>
                <Image source={imgLogo}/>
            </View>
            <View flex={1}>
                <View mx={20} mt={20}>
                    <Button mb={2} onPress={() => askForPermissionPushNotifications('LoginScreen')}>Iniciar sesión</Button>
                    <Button mb={2} onPress={() => askForPermissionPushNotifications('RegisterScreen')}>Registrar</Button>
                </View>

            </View>
        </Layout>
    )
}


export default StartScreen;