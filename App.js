import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
import useState from 'react-usestateref'
import DatePicker from 'react-native-neat-date-picker'
import { SelectList } from 'react-native-dropdown-select-list'

export default function App() {


  const image = {uri: 'https://www.fodors.com/wp-content/uploads/2022/05/Hero-UltMontreal-shutterstock_1839500569.jpg'};

  const [ageCategory, setAgeCategory] = useState("");
  
  const data = [,
      {key:'none', value:'Aucune'},
      {key:'senior', value:'65 ans et +'},
      {key:'student', value:'Etudiant'},
  ]

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('arrivee');
  const [dateArrivee, setDateArrivee] = useState('');
  const [dateDepart, setDateDepart] = useState('');

  const openDatePicker = (mode) => {
    setMode(mode);
    setShowDatePicker(true)
  }

  const onCancel = () => {
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    setShowDatePicker(false)
    if (mode == 'depart') 
      setDateDepart(date.dateString);
    if (mode == 'arrivee')
      setDateArrivee(date.dateString);
  }

  const onSend = () => {
    console.log(dateArrivee);
    console.log(dateDepart);
    console.log(ageCategory);

    fetch('http://192.168.2.88:5000/optimize', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateArrivee: dateArrivee,
        dateDepart: dateDepart,
        categorieAge: ageCategory
      }),
    }).then(response => response.json())
    .then(json => alert(json.test + "\n" + json.dateArrivee + "\n" + json.dateDepart + "\n" + json.categorieAge))
  }
  

  return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

        <Text style={styles.title}>Welcome to OPTUS</Text>
        <StatusBar style="auto" />

        <View style={{width: '50%', justifyContent:'center', flex: 1}}>

          <TouchableOpacity style={styles.ButtonStyle} activeOpacity = { .5 } onPress={() => openDatePicker('arrivee')}>
            <Text style={styles.TextStyle}> Arrivée : {JSON.stringify(dateArrivee)} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonStyle} activeOpacity = { .5 } onPress={() => openDatePicker('depart')}>
            <Text style={styles.TextStyle}> Départ : {JSON.stringify(dateDepart)} </Text>
          </TouchableOpacity>

          <SelectList 
            setSelected={(val) => setAgeCategory(val)} 
            data={data} 
            save="key"
            boxStyles={{backgroundColor: 'white'}}
            dropdownStyles={{backgroundColor: 'white'}}
          />
        
          

          <TouchableOpacity style={styles.ButtonStyleConfirmation} activeOpacity = { .5 } onPress={() => onSend()}>
            <Text style={styles.TextStyle}> Confirmer </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
            isVisible={showDatePicker}
            mode={'single'}
            onCancel={onCancel}
            onConfirm={(date) => onConfirm(date)}
          />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 100,
    margin: 'auto'
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
  },image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
