/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
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
  Number,
} from './styles';
import { getAllAdopted, getAnimalInfoById, likeAnimal, loveAnimal } from '../../store/modules/animal/action';
import { getUserInfo } from '../../store/modules/auth/action';
import { setActiveChat, createChat } from '../../store/modules/chat/action';

const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function DonatedAnimalList({ navigation }) {
    const dispatch = useDispatch();
    const animals = useSelector(state => state.animal.adoptedAnimals);

    
    useEffect(() => {
        dispatch(getAllAdopted());    
    }, []);

    const getAnimalInfo = id => {
      dispatch(getAnimalInfoById(id, false));
    }

  return (
    <ScrollView>
      <Container>
      <View style={{flexDirection: "row"}}>
        <Title>Quantidade de animais doados:</Title>
        <Number>{animals.length}</Number>
      </View>
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
                    {animal.vaccinated ? 'Vacinado' : 'Não foi vacinado'}
                  </Description>

                  <Description>
                    {animal.castrated ? 'Castrado' : 'Não foi castrado'}
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
            </View>
          ))}
        </Body>
      </Container>
    </ScrollView>
  );
}