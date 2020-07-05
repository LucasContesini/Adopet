/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconInfo from 'react-native-vector-icons/Entypo';
import NavIcon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Body,
  Title,
  Description,
  TitleWithoutAnimal,
  AnimalImage,
  AdoptButton,
  AddButton,
  EditButton,
  DeleteButton,
  InfoCard,
} from './styles';
import { getAllOwnedAnimal, getAnimalInfoById, setAdoptAnimal, deleteAnimal } from '../../store/modules/animal/action';
const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 
const noAnimal = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2FMobile_border.webp?alt=media&token=0329e9a3-3d71-4b3d-98af-bd72f50021db';
export default function AnimalOwnerList({ navigation }) {
    const dispatch = useDispatch();
    const render = useSelector(state => state.commons.render);
    const animals = useSelector(state => state.animal.ownedAnimals);
    useEffect(() => {
      dispatch(getAllOwnedAnimal());
    }, [render]);

    const getAnimalInfo = (id, isEdit) => {
      dispatch(getAnimalInfoById(id, isEdit));
    }

    const adopt = id => {
      dispatch(setAdoptAnimal(id));
    }

    const del = id => {
      dispatch(deleteAnimal(id));
    }

    const adoptAlert = (animalId) => 
      Alert.alert('Seu animal foi adotado?', 
      'Se seu animal foi adotado, ele sairá desta lista e irá para a lista de seus animais doados',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: () => adopt(animalId), 
        }        
      ],
      { cancelable: false }
    );

    const delAlert = (animalId) => 
      Alert.alert('Deseja deletar seu animal?', 
      'Se seu animal for deletado, ele será excluído permanentemente',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: () => del(animalId), 
        }        
      ],
      { cancelable: false }
    );

  return (
    <View>
      <ScrollView>
        <Container>
          {animals.length != 0 ? 
            <Body>
              {animals.map(animal => (
                <View
                  style={{
                    marginBottom: 30,
                  }}>
                  <View>
                    <AnimalImage
                      source={{ uri: animal.image ? animal.image : noPhoto }}
                    />
                  </View>

                  <InfoCard>
                    <View>
                      <Description>{animal.name}</Description>

                      <Description>
                        {animal.type}
                      </Description>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent:'space-between',
                      }}>

                      <TouchableOpacity onPress={() => getAnimalInfo(animal.id, false)}>
                        <IconInfo name="info" size={40} style={{padding: 10}}/>
                      </TouchableOpacity>
                      
                    </View>
                  </InfoCard>
                  <View style={{flexDirection: 'row'}}>
                    <EditButton title="Editar" onPress={() => getAnimalInfo(animal.id, true)}/>
                    <AdoptButton title="Foi adotado" onPress={() => adoptAlert(animal.id)}/>
                    <DeleteButton title="Excluir" onPress={() => delAlert(animal.id)}/>
                  </View>
                </View>
              ))}
            </Body>
          :
            <Body>
              <AnimalImage source={{uri: noAnimal}}/>
              <Title>Que tal adicionar um animal para doação?</Title>
            </Body>
          }
          
        </Container>
      </ScrollView>
      <AddButton title="+" onPress={() => navigation.navigate('AnimalSignUp')}/>
    </View>
  );
}