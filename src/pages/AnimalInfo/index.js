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
  Header,
  Title,
  Description,
  AnimalImage,
  AddPhotoButton,
  InfoCard,
} from './styles';
import { getAllAnimal, getAnimalInfoById } from '../../store/modules/animal/action';
import colors from '../../config/color';
const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalInfo({ navigation }) {
    const dispatch = useDispatch();
    const animal = useSelector(state => state.animal.animalInfo);

  return (
    <ScrollView>
      <Container>
        <View>
          <AnimalImage
            source={{ uri: animal.url ? animal.url : noPhoto }}
          />
          </View>
          <InfoCard style={{}}>
            <Description>{animal.name}</Description>
            <Description>{animal.birthDate}</Description>
            <Description>{animal.type}</Description>
            <Description>{animal.breed}</Description>
            <Description>{animal.vaccinated ? 'Vacinado' : 'Não foi vacinado'}</Description>
            <Description>{animal.castrated ? 'Castrado' : 'Não foi castrado'}</Description>
            <Description>{animal.description}</Description>
          </InfoCard>
          <AddPhotoButton title="Adotar" />
      </Container>
    </ScrollView>
  );
}