import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function MarkAttendanceScreen() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const date = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
      const initial = {};
      res.data.forEach(s => initial[s._id] = 'Present');
      setAttendance(initial);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStatus = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleSubmit = async () => {
    const records = Object.keys(attendance).map(id => ({
      studentId: id,
      date,
      status: attendance[id]
    }));

    try {
      await api.post('/attendance', { records });
      Alert.alert('Success', 'Attendance marked successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to save attendance');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Date: {date}</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.btn, attendance[item._id] === 'Present' ? styles.present : styles.absent]}
              onPress={() => toggleStatus(item._id)}
            >
              <Text style={styles.btnText}>{attendance[item._id]}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Attendance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  dateText: { fontSize: 18, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16 },
  btn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, width: 100, alignItems: 'center' },
  present: { backgroundColor: '#4CAF50' },
  absent: { backgroundColor: '#F44336' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  submitBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
