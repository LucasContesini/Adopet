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
import { createChat, setActiveChat } from '../../store/modules/chat/action';
import DateHelper from '../../helpers/dateHelper';

const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalInfo({ navigation }) {
    const dispatch = useDispatch();
    const animal = useSelector(state => state.animal.animalInfo);
    const birthDateValid = DateHelper.formatedDate(animal.birthDate);
    const chats = useSelector(state => state.chat.chats);
    const userId = useSelector(state => state.auth.id);
    const nickname = useSelector(state => state.auth.nickname);
    const uid = useSelector(state => state.auth.uid);
    const token = useSelector(state => state.auth.token);
 

    const like = animal => {
      dispatch(likeAnimal(animal));
    }

    const love = animal => {
      dispatch(loveAnimal(animal));
    }


    function handleMessage() {
      if(!token) {
        navigation.navigate('AuthenticationSwitch');
      } else {
        let found = false;
        let chatOpened = '';
    
        for (const i in chats) {
          if ((chats[i].uid === animal.user.uid || chats[i].uid === uid) && chats[i].animalId === animal.id) { 
            console.tron.log(chats[i], animal)
            chatOpened = chats[i].key;
            found = true;
          }
        }
    
        const data = {
          animalId: animal.id,
          animalName: animal.name,
          animalPhoto: animal.url[0],
          adopterId: userId,
          adopterNickname: nickname,
          adopterUid: uid,
          userId: animal.user.id,
          nickname: animal.user.nickname,
          uid: animal.user.uid,
          key: chatOpened,
        };
    
        if (found === false) {
          dispatch(
            createChat(
              animal.id,
              animal.name,
              animal.url[0],
              userId,
              nickname,
              uid,
              animal.user.id,
              animal.user.nickname,
              animal.user.uid,
            ),
          );
        } else {
          dispatch(setActiveChat(chatOpened, data));
        }
      }
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
              {animal.user.id !== userId &&
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
              }
              <Description>{animal.name}</Description>
              <Description>{birthDateValid}</Description>
              <Description>{animal.city}</Description>
              <Description>{animal.type}</Description>
              <Description>{animal.breed}</Description>
              <Description>{animal.vaccinated ? 'Vacinado' : 'Não foi vacinado'}</Description>
              <Description>{animal.castrated ? 'Castrado' : 'Não foi castrado'}</Description>
              <Description>{animal.description}</Description>
            </InfoCard> 
          </View>
          {animal.user.id !== userId &&
            <AddPhotoButton onPress={() => handleMessage()} title="Adotar" />
          }
      </Container>
    </ScrollView>
  );
}