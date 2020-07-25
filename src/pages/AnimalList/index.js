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
import { getAllAnimal, getAnimalInfoById, likeAnimal, loveAnimal } from '../../store/modules/animal/action';
import { getUserInfo } from '../../store/modules/auth/action';
const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalList({ navigation }) {
    const dispatch = useDispatch();
    const render = useSelector(state => state.commons.render);
    const region = useSelector(state => state.commons.region);
    const type = useSelector(state => state.commons.type);
    const vaccinated = useSelector(state => state.commons.vaccinated);
    const castrated = useSelector(state => state.commons.castrated);
    const animals = useSelector(state => state.animal.animals);
    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(getAllAnimal());    
    }, [render, region, type, vaccinated, castrated]);

    const getAnimalInfo = id => {
      console.tron.log(id);
      dispatch(getAnimalInfoById(id, false));
    }

    const like = animal => {
      dispatch(likeAnimal(animal));
    }

    const love = animal => {
      dispatch(loveAnimal(animal));
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