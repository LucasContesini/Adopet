/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import {
  Container,
  Body,
  Title,
  ImageRow,
  AnimalImage,
  AddPhotoButton,
  Footer,
  SubmitButton,
} from './styles';
import { saveAnimal } from '../../store/modules/animal/action';

const noPhoto = 'https://www.tribunadeituverava.com.br/wp-content/uploads/2017/12/sem-foto-sem-imagem-300x186.jpeg'; 
const reference = storage().ref('/images');

export default function AnimalImageSignUp({ navigation }) {

  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  const name = useSelector(state => state.animal.name);
  const type = useSelector(state => state.animal.type);
  const breed = useSelector(state => state.animal.breed);
  const birthDate = useSelector(state => state.animal.birthDate);
  const vaccinated = useSelector(state => state.animal.vaccinated);
  const castrated = useSelector(state => state.animal.castrated);
  const zipCode = useSelector(state => state.animal.zipCode);
  const description = useSelector(state => state.animal.description);


  const addAnimal = () => {
    dispatch(saveAnimal(name, type, breed, birthDate, vaccinated, castrated, zipCode, description, images));
  }

  const addPhoto = () => {
    const options = {
      title: 'Selecione uma imagem',
      takePhotoButtonTitle: 'Tirar uma Foto',
      chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.tron.log('ImagePicker Custom: ', response.error);
      } else {
        const { originalRotation, error } = response;

        let rotation = 0;

        if (response.uri && !error) {
          rotation = 0;

          if (originalRotation === 90) {
            rotation = 90;
          } else if (originalRotation === 270) {
            rotation = -90;
          }
        }

        ImageResizer.createResizedImage(
          response.uri,
          1280,
          720,
          'JPEG',
          100,
          rotation,
        ).then(async ({ uri }) => {
          console.tron.log(uri);
          await reference.putFile(uri);
          // setImages([...images, uri]);
        });
      }
    });
  }

  return (
      <ScrollView>
        <Container>
        <Body>
          <Title>Coloque algumas fotos do seu animal</Title>
          <ImageRow>
            <AnimalImage source={{ uri: images[0] ? images[0] : noPhoto}}/>
            <AnimalImage source={{ uri: images[1] ? images[1] : noPhoto}}/>
            <AnimalImage source={{ uri: images[2] ? images[2] : noPhoto}}/>
          </ImageRow>
          <ImageRow>
            <AnimalImage source={{ uri: images[3] ? images[3] : noPhoto}}/>
            <AnimalImage source={{ uri: images[4] ? images[4] : noPhoto}}/>
            <AnimalImage source={{ uri: images[5] ? images[5] : noPhoto}}/>
          </ImageRow>
          
          <AddPhotoButton title="Adicionar foto" onPress={addPhoto}></AddPhotoButton>
        </Body>
        <Footer>
          <SubmitButton title="Cadastrar animal" onPress={addAnimal}></SubmitButton>
        </Footer>
        </Container>
      </ScrollView>
  );
}
