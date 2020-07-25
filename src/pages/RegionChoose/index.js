/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {
  Container,
  Header,
  Body,
  Title,
  FormInput,
  TextHolderInput,
  SubmitButton,
  LocationButton,
  TextAlert,
  FormInputMask
} from './styles';
import { setRegion } from '../../store/modules/commons/action';
import GeolocationHelper from '../../helpers/geolocationHelper';

export default function RegionChoose({ navigation }) {

  const dispatch = useDispatch();


  async function verifyLocationPermission() {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(response => {
          if(response) {
              Geolocation.getCurrentPosition(
                async position => {
                    var city = await GeolocationHelper.getCityByLatAndLong(position.coords.latitude, position.coords.longitude);
                    if(city) {
                      dispatch(setRegion(city));
                      navigation.navigate('TabNavigator');
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
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    dispatch(setRegion(response.data.localidade));
    navigation.navigate('TabNavigator');
  };

  return (
      <ScrollView>
        <Title>Informe qual a região que você mora</Title>  
        <Container>
          <Body>
            <Formik
              onSubmit={values => {
                  searchCep(values.cep);
                }}
              initialValues={{ cep: '13207410' }}
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
                <TextHolderInput>Cep</TextHolderInput>
                  <FormInputMask
                    error={true}
                    type={'zip-code'}
                    returnKeyType="next"
                    value={values.cep}
                    onChangeText={handleChange('cep')}
                  />
                  {touched.cep && errors.cep && (
                    <TextAlert>{errors.cep}</TextAlert>
                  )}
                  <LocationButton
                    title="Usar localização atual"
                    onPress={() => verifyLocationPermission()} />

                  <SubmitButton
                    title="Concluir"
                    onPress={handleSubmit}>
                  </SubmitButton>
                </>
              )}
            </Formik>
          </Body>
        </Container>
      </ScrollView>
  );
}
