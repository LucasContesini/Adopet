/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
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
import { saveAnimal } from '../../store/modules/animal/action';
import DateHelper from '../../helpers/dateHelper';
import storage from '@react-native-firebase/storage';
import colors from '../../config/color';

const noPhoto = 'https://firebasestorage.googleapis.com/v0/b/adopet-17316.appspot.com/o/images%2Fsem-foto-sem-imagem-300x186.jpeg?alt=media&token=c1d83229-5655-4710-9d5a-5257e20bbdb1'; 

export default function AnimalImageSignUp({ navigation }) {

  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const name = useSelector(state => state.animal.name);
  const type = useSelector(state => state.animal.type);
  const breed = useSelector(state => state.animal.breed);
  const birthDate = useSelector(state => state.animal.birthDate);
  const vaccinated = useSelector(state => state.animal.vaccinated);
  const castrated = useSelector(state => state.animal.castrated);
  const city = useSelector(state => state.animal.city);
  const description = useSelector(state => state.animal.description);

  const birthDateValid = DateHelper.formatDateToPersist(birthDate);

  const addAnimal = () => {
    dispatch(saveAnimal(name, type, breed, birthDateValid, vaccinated, castrated, city, description, images));
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
          setDownloading(true);
          const uriResize = uri.replace('file://', '');
          RNFetchBlob.fs.readFile(uriResize, 'base64').then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: 'image/jpeg;BASE64',
            }).then(async blob => {
              const fbImage = storage()
              .ref()
              .child(blob._ref);
              try {
                await fbImage.putFile(blob._ref, { contentType: 'image/jpeg' });
                const url = await fbImage.getDownloadURL();
                setImages([...images, url]);
                setDownloading(false);
              } catch (err) {
                setDownloading(false);
                console.tron.log(err);
              }
            });
          });
        });
        setDownloading(false);
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
          {downloading ? (
            <ActivityIndicator size="large" color= {colors.secondary}/>
          ) : (
            <View></View>
          )}
          
          <AddPhotoButton title="Adicionar foto" onPress={addPhoto}></AddPhotoButton>
        </Body>
        <Footer>
          <SubmitButton title="Salvar alterações" onPress={addAnimal}></SubmitButton>
        </Footer>
        </Container>
      </ScrollView>
  );
}
