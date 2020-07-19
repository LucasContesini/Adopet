/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
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
import { updateAnimal } from '../../store/modules/animal/action';
import DateHelper from '../../helpers/dateHelper';

const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalImageEdit({ navigation }) {

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  const id = useSelector(state => state.animal.id);
  const name = useSelector(state => state.animal.name);
  const type = useSelector(state => state.animal.type);
  const breed = useSelector(state => state.animal.breed);
  const birthDate = useSelector(state => state.animal.birthDate);
  const vaccinated = useSelector(state => state.animal.vaccinated);
  const castrated = useSelector(state => state.animal.castrated);
  const city = useSelector(state => state.animal.city);
  const description = useSelector(state => state.animal.description);
  const animal = useSelector(state => state.animal.animalInfo);

  const birthDateValid = DateHelper.formatDateToPersist(birthDate);
  useEffect(() => {
    if(animal.url)
      setImages(animal.url);
  },[animal]);

  const updAnimal = () => {
    dispatch(updateAnimal(id, name, type, breed, birthDateValid, vaccinated, castrated, city, description, images));
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
        ).then(({ uri }) => {
          setImages([...images, uri]);
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
          <SubmitButton title="Cadastrar animal" onPress={updAnimal}></SubmitButton>
        </Footer>
        </Container>
      </ScrollView>
  );
}
