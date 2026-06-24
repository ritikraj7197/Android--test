import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function AttendanceHistoryScreen() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState([]);

  const fetchHistory = async (selectedDate) => {
    try {
      const res = await api.get(`/attendance/${selectedDate}`);
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance for {date}</Text>
      <TouchableOpacity style={styles.fetchBtn} onPress={() => fetchHistory(date)}>
        <Text style={styles.fetchBtnText}>Fetch History</Text>
      </TouchableOpacity>
      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.studentId.name}</Text>
            <Text style={[styles.status, { color: item.status === 'Present' ? '#4CAF50' : '#F44336' }]}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16 },
  status: { fontWeight: 'bold' },
  fetchBtn: { backgroundColor: '#eee', padding: 10, borderRadius: 5, marginBottom: 10, alignItems: 'center' },
  fetchBtnText: { fontWeight: 'bold' }
});
