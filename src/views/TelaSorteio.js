import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/firebase';

const TelaSorteio = () =>{
    const navigation = useNavigation();
    const [valor, setValor] = useState('');
    const [participantes, setParticipantes] = useState([]);
    var stop,numeroSorteado;
    nomeParticipante="";

    useEffect(()=>{
        database.collection('participantes').onSnapshot((query) =>{
            const list = []
            query.forEach((doc) =>{
                list.push({...doc.data(), id: doc.id});
            })
            
            setParticipantes(list);
        })
    },[])

      {participantes.map((participante) => {
          if(valor == participante.numero){
            nomeParticipante = participante.nome
          }
       })}

    const sortear = () =>{   
        var rodar=setInterval( function() {
        numeroSorteado = Math.floor(Math.random() * 100); 
        setValor(""+numeroSorteado+"");

        if(stop == 1){
          clearInterval(rodar);
          setValor(""+numeroSorteado+"");
          setTimeout( function() {
            if(nomeParticipante == ""){
              alert("Não entregou !")
            }else{
              alert("Parabéns "+nomeParticipante+" o número "+numeroSorteado+" foi sorteado !!!")
            }
          }, 2000 );
        }
        temporizador();
      },10);
    }
  
    const temporizador = () =>{
      setTimeout( function() {
        stop = 1;
     }, 3000 );
    }

    return (
      <ImageBackground source={require('../../assets/planoFundo.jpg')} style={styles.image}>
        <ScrollView>
            <View style={styles.caixaBotao}>
              <TouchableOpacity>
                <AntDesign 
                name="addusergroup" 
                size={40} 
                color="black" 
                onPress={()=>navigation.navigate('Cadastro')} />
              </TouchableOpacity>
            </View>
            <View style={styles.caixaImage}>
              <StatusBar hidden />
              <Image style={styles.logo}
                source={require('../../assets/logo.png')}
              />
            </View>
            <View style={styles.caixaTitulo}>
              <Text style={styles.titulo}>Chá Rifa do</Text>
              <Text style={styles.titulo} style={{fontSize:40}}>Ayron Pietro</Text>
              <Text style={styles.subtitulo}>Prêmios:</Text>
              <Text style={styles.subtitulo}>1°Lugar 120R$</Text>
              <Text style={styles.subtitulo}>2°Lugar Perfume</Text>
            </View>
            <View style={styles.divInput}>
                <TextInput 
                  style={styles.input}
                  placeholder="0"
                  onChangeText={setValor}
                  value={valor}
                />
            </View>
            <View style={styles.botaoSorteia}>
              <TouchableOpacity>
                  <AntDesign 
                  name="play" 
                  size={60} 
                  color="red"
                  onPress={()=>sortear()} />
                </TouchableOpacity>
            </View>
         </ScrollView>
        </ImageBackground>
      );  
}

const styles = StyleSheet.create({
    caixaImage: {
      flex: 1,
      alignItems:'center',
      marginBottom:20
    },
    logo:{
      width:120,
      height:160,
    },
    caixaTitulo:{
      flex:1,
      alignItems:'center',
    },
    titulo:{
      fontSize:25,
      fontWeight:'bold',
    },
    subtitulo:{
      fontSize:18,
      fontStyle:'italic',
      color:'black'
    },
    caixaBotao:{
      flex:1,
      flexDirection:'row',
      margin:15 
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    divInput:{
      flex:1,
      alignItems:'center',
    },
    input:{
      marginTop:30,
      height: 70,
      width: '50%',
      textAlign:'center',
      fontSize:40,
      backgroundColor:'white',
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      elevation: 24,
      borderRadius:30
    },
    botaoSorteia:{
      flex: 1,
      alignItems:'center',
      marginTop:25
    }
  });

  export default TelaSorteio;