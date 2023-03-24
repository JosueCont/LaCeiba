import React, {useEffect, useState} from "react"
import LayoutV4 from "./Layouts/LayoutV4";
import {AddIcon, Button, CloseIcon, ScrollView, Spinner, Text, View} from "native-base";
import {Colors} from "../Colors";
import LayoutV5 from "./Layouts/LayoutV5";
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";
import {TouchableOpacity, StyleSheet} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {
    getRegistryTable,
    registryTableAddRecord,
    registryTableDeleteRecord,
    registryTableUpdateRecord
} from "../api/Requests";
import {connect} from "react-redux";
import RegistryTableHead from "../components/RegistryTable/RegistryTableHead";
import RegistryTableItem from "../components/RegistryTable/RegistryTableItem";
import {dayWeek} from "../utils";
import ModalAsk from "./Modals/ModalAsk";
import RegistryTableItemAdd from "../components/RegistryTable/RegistryTableItemAdd";

const ScoreCardRegistryTableScreen = ({navigation, appDuck})=>{
    const [registryTable, setRegistryTable] = useState([]);
    const [loading, setLoading] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showSectionAdd, setShowSectionAdd] = useState(false);
    const [maxItems, setMaxItems] = useState(30)
    const [errorMessage, setErrorMessage] = useState('');
    const isFocused = useIsFocused();
    const getRegistryTableData = async () => {
        try {
            setLoading(true)
            let result = await getRegistryTable('',[appDuck.user.id])
            if(result.status === 200){
                let data = result.data
                data = data.sort((a,b)=>{
                    const nameA = a.playerName.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.playerName.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                })
                data = data.sort((a,b)=>{
                    return new Date(b.date) - new Date(a.date);
                })
                setRegistryTable(data)
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }

    }
    const confirmDelete = (item) =>{
        setSelectedItem(item)
        setShowModalConfirm(true)
    }

    const deleteItem = async () => {
        setShowModalConfirm(false)
        try {
            setLoading(true)
            let result = await registryTableDeleteRecord('',[appDuck.user.id, selectedItem.uuid])
            if(result.status === 200){
                await getRegistryTableData()
            }
            setLoading(false)
        } catch (e) {
            console.log(e.data?.message);
            setLoading(false)
        }
    }
    
    const onAdd = async (item) =>{
        console.log(item)
        try {
            setLoading(true)
            let result = await registryTableAddRecord(item, [appDuck.user.id])
            console.log(result)
            if(result.status === 201){
                await getRegistryTableData()
            }
            setShowSectionAdd(false)
            setLoading(false)
        } catch (e) {
            console.log(e.data?.message);
            setShowSectionAdd(false)
            setLoading(false)
        }
    }

    const onEdit = async (item) =>{
        setSelectedItem(item)
        setShowSectionAdd(true)
    }

    const onUpdate = async (item) =>{
        try {
            setLoading(true)
            let result = await registryTableUpdateRecord(item, [appDuck.user.id, selectedItem.uuid])
            if(result.status === 200){
                await getRegistryTableData()
            }
            setShowSectionAdd(false)
            setSelectedItem(null)
            setLoading(false)
        } catch (e) {
            console.log(e.data?.message);
            setShowSectionAdd(false)
            setSelectedItem(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isFocused) {
            getRegistryTableData()
            setShowSectionAdd(false)
        }
    }, [isFocused]);

    const element = (data, index) => (
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LayoutV5 white={true}>
            <View flex={1}>
                <View flexDirection={'row'} justifyContent={'center'} mx={4} mt={8} mb={5} >
                    <Text color={Colors.green} fontFamily={'titleComfortaaBold'} fontSize={'2xl'} textTransform={'uppercase'}>Tabla de registro</Text>
                    {!showSectionAdd && <Button onPress={()=>{ setShowSectionAdd(true)}} borderRadius={30} width={30} height={30} ml={4} isDisabled={registryTable.length === maxItems}><AddIcon color='white'/></Button>}
                    {showSectionAdd && <Button onPress={()=>{
                        // Evitar cerrar hasta que se termine de cargar
                        if(loading) return
                        setShowSectionAdd(false)
                        selectedItem && setSelectedItem(null)
                    }} borderRadius={30} width={30} height={30} ml={4} backgroundColor={Colors.yellow}><CloseIcon color='white'/></Button>}
                </View>

                {registryTable.length === maxItems && <Text textAlign={'center'} color={'red.500'} fontSize={'xs'} mb={4}>No se pueden agregar más de {maxItems} registros. Elimine algún elemento para continuar.</Text>}
                {showSectionAdd && <RegistryTableItemAdd
                    loading={loading}
                    item={selectedItem}
                    onAdd={onAdd}
                    onUpdate={onUpdate}
                    onCancel={()=>{
                        setSelectedItem(null)
                        setShowSectionAdd(false)
                    }}
                />}
                <View mx={4}>
                    <RegistryTableHead/>
                </View>
                <ScrollView
                    _contentContainerStyle={{flexGrow: 1}}
                    ScrollEnabled={true}
                    >
                   {/* { loading ?
                            <Spinner color={Colors.green} size={'lg'} />
                        :*/}
                    <View mx={4}>
                        {
                            registryTable.map((item, rowIdx)=> <RegistryTableItem
                                disableActions={showSectionAdd}
                                key={item.uuid}
                                item={item}
                                isSelected={selectedItem?.uuid === item.uuid}
                                onDelete={()=>{ confirmDelete(item) }}
                                onEdit={()=>onEdit(item)}
                            />
                            )
                        }
                    </View>

                </ScrollView>
                <ModalAsk
                    setVisible={()=>{
                        setShowModalConfirm(false)
                        setSelectedItem(null)
                    }}
                    visible={showModalConfirm}
                    text={`¿Está seguro que desea eliminar el registro de "${selectedItem?.playerName}" con fecha "${selectedItem?.date}"?`}
                    title={'Eliminar registro'}
                    textButton={'Sī'}
                    textNoButton={'No'}
                    iconType={'check'}
                    close={true}
                    action={deleteItem}/>
            </View>
        </LayoutV5>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 33, backgroundColor: Colors.greenV2},
    text: { margin: 6, color:'white' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

const mapState = (state) => {
    return {
        appDuck: state.appDuck
    }
}

export default connect(mapState)(ScoreCardRegistryTableScreen)