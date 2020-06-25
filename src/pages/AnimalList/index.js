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

export default function AnimalList({ navigation }) {
    const dispatch = useDispatch();
    const animals = useSelector(state => state.animal.animals);
    useEffect(() => {
        dispatch(getAllAnimal());    
    }, []);

    const getAnimalInfo = id => {
      console.tron.log(id);
      dispatch(getAnimalInfoById(id));
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
                  <Icon name="like2" size={40} style={{padding: 10}}/>
                  <Icon name="hearto" size={40} style={{padding: 10}}/>
                  <TouchableOpacity onPress={() => getAnimalInfo(animal.id)}>
                    <IconInfo name="info" size={40} style={{padding: 10}}/>
                  </TouchableOpacity>
                  
                </View>
              </InfoCard>

              <AddPhotoButton title="Adotar" />
            </View>
          ))}
        </Body>
      </Container>
    </ScrollView>
  );
}