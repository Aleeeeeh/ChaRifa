import React,{ useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
//import { Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { database } from '../config/firebase';

const lista = () => {
    const navigation = useNavigation();
    const [participantes, setParticipantes] = useState([]);

       //onSnapShot atualiza os valores quando insere ou exclui os dados
       useEffect(()=>{
            database.collection('participantes').orderBy('nome').onSnapshot((query) =>{
                const list = []
                query.forEach((doc) =>{
                    list.push({...doc.data(), id: doc.id});
                })
                
                setParticipantes(list);
            })
        },[])
        
    function deletaRegistro(id){
        database.collection('participantes').doc(id).delete();
        alert('Registro deletado com sucesso !')
    }

    function deletar(id){
        Alert.alert("Excluir","Deseja realmente excluir o registro ?",[
            {
                text:"Sim",
                onPress: () => deletaRegistro(id)
            },
            {
                text:"Não"
            }
        ]);
    }

    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.botaoVoltar}>
                    <AntDesign 
                    name="back" 
                    size={40} 
                    color="black" 
                    onPress={()=>navigation.navigate('Cadastro')} />
            </TouchableOpacity>
            <Text style={styles.titulo}>Lista de participantes</Text>
            <View>
            {participantes.map((participante) => {
                return <View>
                            <Text style={styles.lista} key={participante.toString()}>{participante.numero} - {participante.nome} </Text>
                            <TouchableOpacity style={styles.deletar}>
                            <AntDesign 
                                name="closecircle" 
                                size={25} 
                                color="red" 
                                onPress={()=>deletar(participante.id)} />
                            </TouchableOpacity>
                        </View>
            })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor:'white'
    },
    item: {
      padding: 10,
      fontSize: 18,
    },
    titulo:{
        color:'blue',
        textAlign:'center',
        fontSize:20,
        //fontFamily:'Montserrat_700Bold',
        padding:30
    },
    botaoVoltar:{
        margin:15
    },
    lista:{
        marginLeft:20,
        fontSize:20
    },
    deletar:{
        position: 'absolute',
        left: 310,
    }
  });

export default lista;