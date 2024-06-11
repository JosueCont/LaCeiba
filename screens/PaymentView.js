import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useSelector } from 'react-redux';
import { request } from '../api/Methods';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada la biblioteca de íconos

const PaymentView = () => {
  const user = useSelector(state => state.appDuck.user);
  const partnerId = user?.partner?.id;

  const [selectedTab, setSelectedTab] = useState('Pagos');
  const [pagos, setPagos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const fetchPaymentOrders = async () => {
      if (!partnerId) {
        setLoading(false);
        return;
      }

      try {
        const response = await request(
          'v1/collection/payment-orders',
          `?page=1&limit=2000&sort=desc&partnerId=${partnerId}`,
          'get'
        );
        const items = response.data.items;
        setPaymentOrders(items);

        if (items.length > 0) {
          setSelectedOrder(items[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentOrders();
  }, [partnerId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!partnerId || !selectedOrder) {
        setLoading(false);
        return;
      }

      try {
        const response = await request(
          'v1/collection/movements/account-statement/app/',
          `?page=1&limit=10000&sort=desc&partnerId=${partnerId}&paymentOrderId=${selectedOrder.id}`,
          'get'
        );
        const items = response.data.items;

        const pagosData = items.filter(item => item.module === 'FEE' || item.module === 'MEMBERSHIP');
        setPagos(pagosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [partnerId, selectedOrder]);

  useEffect(() => {
    const fetchCargos = async () => {
      if (!partnerId || !selectedOrder) {
        setLoading(false);
        return;
      }

      const startDate = `${selectedOrder.year}-${String(selectedOrder.month).padStart(2, '0')}-01`;
      const endDate = `${selectedOrder.year}-${String(selectedOrder.month).padStart(2, '0')}-31`;

      try {
        const response = await request(
          'v1/collection/movements/app',
          `?page=1&limit=20&sort=desc&created_gte=${startDate}&created_lte=${endDate}&partnerId=${partnerId}`,
          'get'
        );
        const items = response.data.items;
        setCargos(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, [partnerId, selectedOrder]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }} // Reemplaza con la URL de la imagen que desees
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>ID de movimiento: {item.id}</Text>
        <Text style={styles.subtitle}>Concepto: {item.concept}</Text>
        <Text style={styles.subtitle}>Autorizado por: {item.partner ? item.partner.nombreSocio : 'N/A'}</Text>
        <Text style={styles.subtitle}>Fecha: {item.date}</Text>
        <Text style={styles.subtitle}>Monto: ${parseFloat(item.amount).toFixed(2)}</Text>
        <Text style={styles.subtitle}>Monto pagado: ${parseFloat(item.paidAmount).toFixed(2)}</Text>
        <Text style={styles.status}>{item.isPaid ? 'Pagado' : 'Pendiente'}</Text>
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

  const paymentOrderOptions = paymentOrders.map(order => ({
    key: order.id,
    label: `${monthNames[order.month - 1]} de ${order.year}`,
    value: order
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis movimientos</Text>
      <ModalSelector
        data={paymentOrderOptions}
        initValue={selectedOrder ? `${monthNames[selectedOrder.month - 1]} de ${selectedOrder.year}` : 'Seleccione un mes'}
        onChange={(option) => setSelectedOrder(option.value)}
        style={styles.selector}
      >
        <View style={styles.selectorContent}>
          <Text style={styles.selectorText}>
            {selectedOrder ? `${monthNames[selectedOrder.month - 1]} de ${selectedOrder.year}` : 'Seleccione un mes'}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </View>
      </ModalSelector>
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
  selector: {
    marginBottom: 5, // Reducir el espacio debajo del selector
    backgroundColor: '#f0f0f0', // Cambiar el color de fondo del selector
    borderRadius: 5, // Añadir bordes redondeados
    padding: 10, // Añadir padding
    borderWidth: 1, // Añadir borde
    borderColor: '#ccc' // Color del borde
  },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectorText: {
    color: '#000', // Cambiar el color del texto del selector
    fontSize: 16 // Cambiar el tamaño del texto del selector
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
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
    color: 'green', // Cambia el color según el estatus
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PaymentView;
