/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconInfo from 'react-native-vector-icons/Entypo';
import NavIcon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Body,
  Description,
  AnimalImage,
  AdoptButton,
  AddButton,
  EditButton,
  DeleteButton,
  InfoCard,
} from './styles';
import { getAllOwnedAnimal, getAnimalInfoById, setAdoptAnimal, deleteAnimal } from '../../store/modules/animal/action';
const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalOwnerList({ navigation }) {
    const dispatch = useDispatch();
    const animals = useSelector(state => state.animal.ownedAnimals);
    useEffect(() => {
        dispatch(getAllOwnedAnimal());
    }, []);

    const getAnimalInfo = id => {
      dispatch(getAnimalInfoById(id));
    }

    const adopt = id => {
      dispatch(setAdoptAnimal(id));
    }

    const del = id => {
      dispatch(deleteAnimal(id));
    }

  return (
    <ScrollView>
      <Container>
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
                    {animal.adopted ? 'Já foi adotado' : 'Ainda não foi adotado'}
                  </Description>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent:'space-between',
                  }}>

                  <TouchableOpacity onPress={() => getAnimalInfo(animal.id)}>
                    <IconInfo name="info" size={40} style={{padding: 10}}/>
                  </TouchableOpacity>
                  
                </View>
              </InfoCard>
              <View style={{flexDirection: 'row'}}>
                <EditButton title="Editar" />
                <AdoptButton title="Foi adotado" onPress={() => adopt(animal.id)}/>
                <DeleteButton title="Excluir" onPress={() => del(animal.id)}/>
              </View>
              <AddButton title="Adicionar animal" />
            </View>
          ))}
        </Body>
      </Container>
    </ScrollView>
  );
}