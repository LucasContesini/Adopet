/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
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
import { likeAnimal, loveAnimal } from '../../store/modules/animal/action';
import DateHelper from '../../helpers/dateHelper';
const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalInfo({ navigation }) {
    const dispatch = useDispatch();
    const animal = useSelector(state => state.animal.animalInfo);
    const birthDateValid = DateHelper.formatedDate(animal.birthDate);
    const like = animal => {
      dispatch(likeAnimal(animal));
    }

    const love = animal => {
      dispatch(loveAnimal(animal));
    }


  return (
    <ScrollView>
      <Container>
        <View>
          <AnimalImage
            source={{ uri: animal.url ? animal.url[0] : noPhoto }}
          />
          </View>
          <View>
            <InfoCard>
              <View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
                {animal.liked ? 
                    <TouchableOpacity onPress={() => like(animal)}>
                      <Icon name="like1" size={40} style={{padding: 10}}/>
                    </TouchableOpacity>
                   : <TouchableOpacity onPress={() => like(animal)}>
                    <Icon name="like2" size={40} style={{padding: 10}}/>
                   </TouchableOpacity>
                   }
                   
                  {animal.loved ? 
                    <TouchableOpacity onPress={() => love(animal)}>
                      <Icon name="heart" size={40} style={{padding: 10}}/>
                    </TouchableOpacity>
                   : <TouchableOpacity onPress={() => love(animal)}>
                      <Icon name="hearto" size={40} style={{padding: 10}}/>
                    </TouchableOpacity>
                   }
              </View>
              <Description>{animal.name}</Description>
              <Description>{birthDateValid}</Description>
              <Description>{animal.type}</Description>
              <Description>{animal.breed}</Description>
              <Description>{animal.vaccinated ? 'Vacinado' : 'Não foi vacinado'}</Description>
              <Description>{animal.castrated ? 'Castrado' : 'Não foi castrado'}</Description>
              <Description>{animal.description}</Description>
            </InfoCard> 
          </View>
          
          <AddPhotoButton title="Adotar" />
      </Container>
    </ScrollView>
  );
}