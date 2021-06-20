import React,{ useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
//import AppLoading from 'expo-app-loading';
//import { Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { database } from '../config/firebase';

const cadastro = () =>{
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [participantes, setParticipantes] = useState([]);
    jaExiste = 0;
    nomeParticipante = "";

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
        if(numero == participante.numero){
            jaExiste = 1
            nomeParticipante = participante.nome
        }
    })}

    const gravar = ()=>{
        if(jaExiste == 1){
            alert("Número já escolhido pelo participante "+nomeParticipante)
        }else{
            if(nome == ""){
                alert("Insira o nome do participante !")
            }else if(numero == ""){
                alert("Insira o número escolhido pelo participante !")
            }else{
                database.collection('participantes').add({
                    nome,
                    numero
                });
                alert('Dados gravados com sucesso !')
                setNome('');
                setNumero('');
            }
        }
    }

        return(
            <ScrollView style={{backgroundColor:'#fff'}}>
                <TouchableOpacity style={styles.botaoVoltar}>
                    <AntDesign 
                    name="home" 
                    size={40} 
                    color="black" 
                    onPress={()=>navigation.navigate('Sorteio')} />
                </TouchableOpacity>
                 <View style={styles.caixa}>
                    <Text style={styles.titulo}>Formulário de cadastro</Text>
                    <TextInput
                        style={styles.input} 
                        placeholder='Nome do participante'
                        onChangeText={setNome}
                        value={nome}
                    />
                    <TextInput
                        style={styles.input} 
                        placeholder='Número'
                        onChangeText={setNumero}
                        keyboardType='numeric'
                        value={numero}
                    />
                </View>
                <View style={styles.botaoGravar}>
                    <Button 
                        title='Gravar'
                        onPress={()=>gravar()}   
                    />
                </View>
                <TouchableOpacity style={styles.lista}>
                    <AntDesign 
                    name="team" 
                    size={40} 
                    color="black"
                    onPress={()=>navigation.navigate('Lista')} />
                </TouchableOpacity>
                <Text style={{textAlign:'center',color:'red'}}>Clique para ver participantes</Text>
            </ScrollView>
        );
    }

const styles = StyleSheet.create({
    botaoVoltar:{
        margin:15
    },
    caixa:{
        flex:1,
        alignItems:'center',
        marginTop:120
    },
    titulo:{
       fontSize:25,
       color:'blue',
       //fontFamily:'Montserrat_700Bold'
    },
    input:{
        marginTop:30,
        height:30,
        width:'70%',
        borderWidth: 1,
        textAlign:'center'
    },
    botaoGravar:{
        marginLeft:90,
        marginTop:40,
        width:'50%',
    },
    lista:{
        flex:1,
        alignItems:'center',
        marginTop:20
    }
})

export default cadastro;

