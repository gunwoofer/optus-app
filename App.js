import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
// import { useState } from 'react';
import useState from 'react-usestateref'
import DatePicker from 'react-native-neat-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';



export default function App() {


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('none');
  const [items, setItems] = useState([
    {label: 'Aucune', value: 'none'},
    {label: 'Etudiant', value: 'etudiant'},
    {label: '65 ans et +', value: 'senior'},
    
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('arrivee');
  const [dateArrivee, setDateArrivee] = useState(JSON.stringify(new Date()).split('T')[0].slice(1));
  const [dateDepart, setDateDepart] = useState(JSON.stringify(new Date()).split('T')[0].slice(1));


  const openDatePicker = (mode) => {
    setMode(mode);
    setShowDatePicker(true)
  }

  const onCancel = () => {
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    console.log('TEST DATE' + JSON.stringify(date).split('T')[0].split(':')[1].slice(1));
    setShowDatePicker(false)
    if (mode == 'depart') 
      setDateDepart(JSON.stringify(date).split('T')[0].split(':')[1].slice(1));
    if (mode == 'arrivee')
      setDateArrivee(JSON.stringify(date).split('T')[0].split(':')[1].slice(1));

  }


  const onSend = () => {
    console.log(dateArrivee);
    console.log(dateDepart);
    console.log(value);

    fetch('http://127.0.0.1:5000/optimize', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateArrivee: dateArrivee,
        dateDepart: dateDepart,
        categorieAge: value
      }),
    });
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OPTUS</Text>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.ButtonStyle} activeOpacity = { .5 } onPress={() => openDatePicker('arrivee')}>
 
        <Text style={styles.TextStyle}> Arrivée : {JSON.stringify(dateArrivee)} </Text>
 
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonStyle} activeOpacity = { .5 } onPress={() => openDatePicker('depart')}>
 
        <Text style={styles.TextStyle}> Départ : {JSON.stringify(dateDepart)} </Text>

      </TouchableOpacity>

      <DropDownPicker
        style={{width:200}}
        containerStyle={{width:200}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
     
      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={onCancel}
        onConfirm={(date) => onConfirm(date)}
      />

      <TouchableOpacity style={styles.ButtonStyleConfirmation} activeOpacity = { .5 } onPress={() => onSend()}>
 
        <Text style={styles.TextStyle}> Confirmer </Text>

      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 80
  },
  date: {
    marginBottom: 20
  },
  ButtonStyle: {
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#009688',
    borderRadius:5,
    marginBottom: 20
  },
  ButtonStyleConfirmation: {
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'green',
    borderRadius:5,
    margin:20
  },
  TextStyle:{
      color:'#fff',
      textAlign:'center',
  }
});
