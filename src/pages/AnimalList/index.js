/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Body,
  Header,
  Title,
  Description,
  AnimalImage,
  AddPhotoButton,
  Footer,
} from './styles';
import { getAllAnimal } from '../../store/modules/animal/action';

const noPhoto = 'https://www.tribunadeituverava.com.br/wp-content/uploads/2017/12/sem-foto-sem-imagem-300x186.jpeg'; 

export default function AnimalList({ navigation }) {
    const dispatch = useDispatch();
    const animals = useSelector(state => state.animal.animals);
    useEffect(() => {
        dispatch(getAllAnimal());    
    }, []);
  

  return (
    <ScrollView>
        <Container>
        <Header>
            <Title></Title>
        </Header>
        <Body>
          {animals.map((animal) => (
            <View>
                <AnimalImage source={{ uri: animal.image ? animal.image : noPhoto }}/>
                <Description>{animal.name}</Description>
                <Description>{animal.vaccinated ? 'Vacinado' : 'Não foi vacinado'}</Description>
                <Description>{animal.castrated ? 'Castrado' : 'Não foi castrado'}</Description>
                <AddPhotoButton title='Adotar'/>
                <Footer></Footer>
            </View>
            
          ))}
        </Body>
        </Container>
      </ScrollView>
  );
}