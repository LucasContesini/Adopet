/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Text, Image, ToastAndroid, PermissionsAndroid } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Body,
  Title,
  FormInput,
  TextHolderInput,
  SubmitButton,
  TextAlert,
  CheckBoxRow,
  FormInputMask,
  LocationButton,
  Information
} from './styles';

import GeolocationHelper from '../../helpers/geolocationHelper';
import { getAnimalType } from '../../store/modules/animal/action';
import { setSearchInfo, setRegion } from '../../store/modules/commons/action';

export default function SearchAnimal({ navigation }) {

  const dispatch = useDispatch();
  const typeSearch = useSelector(state => state.commons.type);
  const vaccinatedSearch = useSelector(state => state.commons.vaccinated);
  const castratedSearch = useSelector(state => state.commons.castrated);
  const [inicialValue, setInicialValue] = useState('');
  const [type, setType] = useState('');
  const [vaccinated, setVaccinated] = useState(vaccinatedSearch);
  const [castrated, setCastrated] = useState(castratedSearch);
  const [animalType, setAnimalType] = useState([]);

  const animalTypes = useSelector(state => state.animal.animalTypes);

  useEffect(() => {
    dispatch(getAnimalType());
  }, []);

  useEffect(() => {
    animalTypes.map(type => {
      const obj = {
        value: type.id,
        label: type.name
      }
      animalType.push(obj);
      if(typeSearch && typeSearch === obj.value) {
        setInicialValue(obj.value);
      }
    });
  }, [animalTypes]);

  async function verifyLocationPermission() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(response => {
        if(response) {
            Geolocation.getCurrentPosition(
              async position => {
                  var city = await GeolocationHelper.getCityByLatAndLong(position.coords.latitude, position.coords.longitude);
                  if(city) {
                    dispatch(setRegion(city));
                    ToastAndroid.show("Região armazenada com sucesso!", ToastAndroid.LONG); 
                  }
              },
              error => {
                console.log(error);
              }
            )
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(result => {
            console.log(result);
          })
        }
      });
    }


  async function searchCep(cep) {
    if(!cep) {
      dispatch(setRegion(''));
      navigation.navigate('TabNavigator');
    } else{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      if(response.data?.localidade != null) {
        dispatch(setRegion(response.data.localidade));
      }
      navigation.navigate('TabNavigator');
    }
    
  };

  return (
      <ScrollView>
        <Container>
          <Body>
            <Title>Qual animal você está procurando?</Title>
            <Formik
              onSubmit={values => {
                dispatch(
                  setSearchInfo(type, vaccinated, castrated),
                );
                searchCep(values.cep);
                navigation.goBack();
              }}
              initialValues={{ }}
              validationSchema={yup.object().shape({
              })}>
              {({
                values,
                handleChange,
                errors,
                touched,
                handleSubmit,
              }) => (
                <>  
                  <TextHolderInput>Tipo de animal</TextHolderInput>
                  <DropDownPicker
                    items={animalType}
                    searchable={true}
                    defaultValue={inicialValue}
                    searchablePlaceholder="Buscar por tipo de animal"
                    searchableError="Nenhum tipo de animal foi encontrado"
                    containerStyle={{height: 40}}
                    placeholder="Tipo de animal"
                    onChangeItem={item => setType(item.value)}
                  />
                  
                  <CheckBoxRow>
                    <CheckBox
                      title='Está vacinado'
                      checked={vaccinated}
                      checkedIcon={<Image source={require('../../assets/icon-check-ok.png')} />}
                      uncheckedIcon={<Image source={require('../../assets/icon-check-nok.png')} />}
                      onPress={() => setVaccinated(!vaccinated)}
                    />

                    <CheckBox
                      title='Está castrado'
                      checked={castrated}
                      checkedIcon={<Image source={require('../../assets/icon-check-ok.png')} />}
                      uncheckedIcon={<Image source={require('../../assets/icon-check-nok.png')} />}
                      onPress={() => setCastrated(!castrated)}  
                    />
                  </CheckBoxRow>

                  <Information>Caso queira trocar a região já informada</Information>
                  <TextHolderInput>Cep</TextHolderInput>
                  <FormInputMask
                    error={true}
                    type={'zip-code'}
                    autoCorrect={false}
                    returnKeyType="next"
                    value={values.cep}
                    onChangeText={handleChange('cep')}
                  />
                  <LocationButton
                    title="Usar localização atual"
                    onPress={() => verifyLocationPermission()} />

                  <SubmitButton
                    title="Pronto"
                    onPress={handleSubmit}>
                    <Text />
                  </SubmitButton>
                </>
              )}
            </Formik>
          </Body>
        </Container>
      </ScrollView>
  );
}
