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
import { getAllInterested, getAnimalInfoById, likeAnimal, loveAnimal } from '../../store/modules/animal/action';
import { getUserInfo } from '../../store/modules/auth/action';
import { setActiveChat, createChat } from '../../store/modules/chat/action';

const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function InterestedAnimalList({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const render = useSelector(state => state.commons.render);
    const interestedAnimals = useSelector(state => state.animal.interestedAnimals);
    const userId = useSelector(state => state.auth.id);
    const nickname = useSelector(state => state.auth.nickname);
    const uid = useSelector(state => state.auth.uid);
    const chats = useSelector(state => state.chat.chats);

    
    useEffect(() => {
        dispatch(getAllInterested());    
    }, [render]);

    const getAnimalInfo = id => {
      dispatch(getAnimalInfoById(id, false));
    }

    const like = animal => {
      dispatch(likeAnimal(animal));
    }

    const love = animal => {
      dispatch(loveAnimal(animal));
    }

    function handleMessage(animal) {
      if(!token) {
        navigation.navigate('AuthenticationSwitch');
      } else {
        let found = false;
        let chatOpened = '';
        for (const i in chats) {
          if ((chats[i].uid === animal.user.uid || chats[i].uid === uid) && chats[i].animalId === animal.id) { 
            chatOpened = chats[i].key;
            found = true;
          }
        }
    
        const data = {
          animalId: animal.id,
          animalName: animal.name,
          animalPhoto: animal.image,
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
              animal.image,
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
        <Body>
          {interestedAnimals.map(animal => (
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

              <AddPhotoButton onPress={() => handleMessage(animal)} title="Adotar" />
            </View>
          ))}
        </Body>
      </Container>
    </ScrollView>
  );
}