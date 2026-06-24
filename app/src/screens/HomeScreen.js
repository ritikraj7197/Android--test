import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    { title: 'Mark Attendance', icon: 'calendar-check', screen: 'MarkAttendance', color: '#4CAF50' },
    { title: 'Students List', icon: 'account-group', screen: 'StudentList', color: '#2196F3' },
    { title: 'Attendance History', icon: 'history', screen: 'AttendanceHistory', color: '#FF9800' },
    { title: 'Profile', icon: 'account', screen: 'Profile', color: '#9C27B0' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, Admin</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { borderTopColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons name={item.icon} size={40} color={item.color} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 30, backgroundColor: '#2196F3', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  welcome: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  date: { color: '#e3f2fd', marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff',
    width: '46%',
    aspectRatio: 1,
    margin: '2%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderTopWidth: 5,
  },
  cardTitle: { marginTop: 10, fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#333' },
});
