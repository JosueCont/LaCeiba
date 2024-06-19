import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { request } from '../api/Methods';
import { useIsFocused } from '@react-navigation/native';
import { getFontSize, setFormatNumber } from '../utils';
import { ColorsCeiba } from '../Colors';

const PaymentView = () => {
  const user = useSelector(state => state.appDuck.user);
  const partnerId = user?.partner?.id;

  const [selectedTab, setSelectedTab] = useState('Pagos');
  const [pagos, setPagos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMovements().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMovements();
    }
  }, [isFocused, partnerId]);

    const fetchMovements = async () => {
      if (!partnerId) {
        setLoading(false);
        return;
      }

      try {
        console.log('fetchinf movements for ', partnerId);
        const response = await request(
          'v1/collection/movements/app',
          `?page=1&limit=10000&sort=desc&partnerId=${partnerId}`,
          'get'
        );
        const items = response.data.items;

        const pagosData = items.filter(item => item.isPaid);
        const cargosData = items.filter(item => !item.isPaid);

        console.log('pagos data', pagosData)
        console.log('cargos data', cargosData)

        setPagos(pagosData);
        setCargos(cargosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>ID de movimiento: {item.id}</Text>
        <Text style={styles.subtitle}>Concepto: {item.concept}</Text>
        <Text style={styles.subtitle}>Autorizado por: {item.partner ? item.partner.nombreSocio : 'N/A'}</Text>
        <Text style={styles.subtitle}>Fecha: {item.date}</Text>
        <Text style={styles.subtitle}>Monto: ${parseFloat(item.amount).toFixed(2)}</Text>
        <Text style={styles.subtitle}>Monto pagado: ${parseFloat(item.paidAmount).toFixed(2)}</Text>
        <Text style={[styles.status, item.isPaid ? styles.paid : styles.pending]}>
          {item.isPaid ? 'Pagado' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );

  const filteredPayments = selectedTab === 'Pagos' ? pagos : cargos;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const getTotalBalance = () => {
    if(selectedTab === 'Pagos'){
      return pagos.reduce((total, item) => {
        return total + parseFloat(item?.amount)
      }, 0);
    }else{
      return cargos.reduce((total, item) => {
        return total + parseFloat(item?.amount)
      }, 0);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis movimientos</Text>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab('Pagos')} style={[styles.tab, selectedTab === 'Pagos' && styles.activeTab]}>
          <Text style={styles.tabText}>Pagos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Cargos')} style={[styles.tab, selectedTab === 'Cargos' && styles.activeTab]}>
          <Text style={styles.tabText}>Cargos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPayments}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={{marginLeft:20, height:80, flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontSize: getFontSize(20), fontWeight:'700', color: ColorsCeiba.darkGray}}>Total: </Text>
        <Text style={{fontSize: getFontSize(15), fontWeight:'400', color: ColorsCeiba.darkGray}}>${setFormatNumber(getTotalBalance())}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5 // Reducir el espacio debajo del título
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc'
  },
  activeTab: {
    borderBottomColor: '#000'
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  subtitle: {
    color: '#555'
  },
  status: {
    fontWeight: 'bold'
  },
  paid: {
    color: 'green' // Color para pagos realizados
  },
  pending: {
    color: 'red' // Color para pagos pendientes
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PaymentView;
