import React, {useState} from "react";
import {Button, FormControl, Input, Select, Text, View} from "native-base";
import Layout from "./Layouts/Layout";
import {findPartner} from "../api/Requests";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {setAttribute} from "../redux/ducks/navigationDuck";
import {ScrollView} from "react-native";
import ModalInfo from "./Modals/ModalInfo";
import _ from 'lodash';

const RegisterScreen = ({navigation, setAttribute}) => {
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalUserExists, setModalUserExists] = useState(null);


    const {touched, handleSubmit, errors, setFieldValue} = useFormik({
        initialValues: {
            numberAction: '',
            namePartner: '',
            lastNamePartner: '',
            relationship: ''
        },
        onSubmit: (formValue) => {
            registerPartnerFuncion(formValue)
        },
        validateOnChange: true,
        validationSchema: Yup.object({

            numberAction: Yup
                .string()
                // .matches(/^(\S+$)/g, 'Este campo no puede contener solo espacios en blanco.')
                .required("El número de acción es obligatorio"),
            namePartner: Yup
                .string()
                // .matches(/^(\S+$)/g, 'Este campo no puede contener solo espacios en blanco.')
                .required("El nombre del socio es obligatorio"),
            lastNamePartner: Yup
                .string()
                //.matches(/^(\S+$)/g, 'Este campo no puede contener solo espacios en blanco.')
                .required("El apellido del socio es obligatorio"),
            relationship: Yup
                .string()
                //.matches(/^(\S+$)/g, 'Este campo no puede contener solo espacios en blanco.')
                .required("El parentesco es obligatorio"),
        })
    });

    const registerPartnerFuncion = async (values) => {

        try {


            const queryString = `?userId=${values.numberAction}&firstName=${values.namePartner}&lastName=${values.lastNamePartner}&parent=${values.relationship}`;

            const response = await findPartner(queryString);

            console.log(response.data)

            const userUpdate = {
                ...response.data,
                firstName: _.startCase(values.namePartner),
                lastName: _.startCase(values.lastNamePartner)
            }

            setAttribute('user', userUpdate)
            navigation.navigate('RegisterStep2Screen')

        } catch (e) {
            console.log(e)
            if (e.status === 404) {
                setModalErrorVisible(true)
            } else if (e.status === 400) {
                setModalUserExists(true)

            } else {
                alert(e.status)
            }
        }
    }


    return (
        <Layout overlay={true}>
            <View flex={1}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                    </View>
                    <View flex={1}>
                        <View mx={20} mt={10}>
                            <Text fontSize={'5xl'} textAlign={'center'} fontFamily={'titleLight'} mb={4}>Registrar</Text>
                            <View alignSelf={'center'} width={'100%'} borderWidth={1} borderColor={'#FFB718'} mb={8}/>
                            <FormControl isInvalid={errors.numberAction} mb={4}>
                                <Text textAlign={'center'} mb={2}>Número de acción</Text>
                                <Input
                                    maxLength={3}
                                    returnKeyType={'done'}
                                    keyboardType={'number-pad'}
                                    onChangeText={(v) => setFieldValue('numberAction', v)}/>

                                <FormControl.ErrorMessage>
                                    {errors.numberAction}
                                </FormControl.ErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.namePartner} mb={4}>
                                <Text textAlign={'center'} mb={2}>Nombre(s) de socio</Text>
                                <Input onChangeText={(v) => setFieldValue('namePartner', v)}/>
                                <FormControl.ErrorMessage>
                                    {errors.namePartner}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.lastNamePartner} mb={4}>
                                <Text textAlign={'center'} mb={2}>Apellido(s) de socio</Text>
                                <Input onChangeText={(v) => setFieldValue('lastNamePartner', v)}/>
                                <FormControl.ErrorMessage>
                                    {errors.lastNamePartner}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.relationship} mb={4}>
                                <Text textAlign={'center'} mb={2}>Parentesco</Text>
                                <Select
                                    onValueChange={(v) => {
                                        setFieldValue('relationship', v)
                                    }}
                                    placeholder="Seleccionar">
                                    <Select.Item label={'Titular'} value={'0'}/>
                                    <Select.Item label={'Hijo(a) titular'} value={'1'}/>
                                    <Select.Item label={'Hijo(a) membresista'} value={'2'}/>
                                    <Select.Item label={'Esposo(a) titular'} value={'3'}/>
                                    <Select.Item label={'Esposo(a) membresista'} value={'4'}/>
                                    <Select.Item label={'Cotitular'} value={'5'}/>
                                </Select>
                                <FormControl.ErrorMessage>
                                    {errors.relationship}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Button onPress={() => handleSubmit()} mb={2}>Continuar</Button>
                            <Button onPress={() => navigation.goBack()}>Regresar</Button>

                        </View>
                    </View>
                </ScrollView>
            </View>
            <ModalInfo text={'Número de acción o nombre del socio no encontrado o no coinciden, intentalo nuevamente.'} iconType={'exclamation'} textButton={'Entendido'} visible={modalErrorVisible} setVisible={setModalErrorVisible}/>
            <ModalInfo text={'El usuario ya se encuentra registrado.'} iconType={'exclamation'} textButton={'Entendido'} visible={modalUserExists} setVisible={setModalUserExists}/>

        </Layout>
    )
}

const mapState = () => {
    return {}
}

export default connect(mapState, {setAttribute})(RegisterScreen)