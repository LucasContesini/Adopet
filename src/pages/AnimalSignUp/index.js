/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Formik } from 'formik';
import * as yup from 'yup';
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
} from './styles';

import { addAnimalInfo, getAnimalType } from '../../store/modules/animal/action';
import animal from '../../store/modules/animal/reducer';

import NavigationService from '../../services/navigation';

export default function AnimalSignUp({ navigation }) {

  const dispatch = useDispatch();

  const [type, setType] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [castrated, setCastrated] = useState(false);
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
    });
  }, [animalTypes]);

  return (
      <ScrollView>
        <Container>
          <Body>
            <Title>Preencha as informações abaixo</Title>
            <Formik
              onSubmit={values => {
                dispatch(
                  addAnimalInfo(values.name, type, values.breed, values.birthDate, vaccinated, castrated, values.zipCode, values.description),
                );
                navigation.navigate('AnimalImageSignUp');
              }}
              initialValues={{ name: 'teste', breed: '', birthDate: '123', zipCode: '1234', description: '12345' }}
              validationSchema={yup.object().shape({
                name: yup
                  .string()
                  .required('Nome é obrigatório'),
                  zipCode: yup
                  .string()
                  .required('Cep é obrigatório'),
              })}>
              {({
                values,
                handleChange,
                errors,
                touched,
                handleSubmit,
              }) => (
                <>
                <TextHolderInput>Nome</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.name}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  {touched.name && errors.name && (
                    <TextAlert>{errors.name}</TextAlert>
                  )}
                  
                  <TextHolderInput>Tipo de animal</TextHolderInput>
                  <DropDownPicker
                    items={animalType}
                    searchable={true}
                    searchablePlaceholder="Buscar por tipo de animal"
                    searchableError="Nenhum tipo de animal foi encontrado"
                    containerStyle={{height: 40}}
                    placeholder="Tipo de animal"
                    onChangeItem={item => setType(item.value)}
                  />
                  
                  <TextHolderInput>Raça do animal</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.breed}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.breed}
                    onChangeText={handleChange('breed')}
                  />
                  {touched.breed && errors.breed && (
                    <TextAlert>{errors.breed}</TextAlert>
                  )}

                  <TextHolderInput>Data de nascimento</TextHolderInput>
                  <FormInput
                    error={errors.birthDate}
                    type="datetime"
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    returnKeyType="next"
                    value={values.birthDate}
                    onChangeText={handleChange('birthDate')}
                  />

                  {touched.birthDate && errors.birthDate && (
                    <TextAlert>{errors.birthDate}</TextAlert>
                  )}

                  <TextHolderInput>Cep</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.zipCode}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.zipCode}
                    onChangeText={handleChange('zipCode')}
                  />
                  {touched.zipCode && errors.zipCode && (
                    <TextAlert>{errors.zipCode}</TextAlert>
                  )}

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

                  <TextHolderInput>Descrição</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.description}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.description}
                    onChangeText={handleChange('description')}
                  />
                  {touched.description && errors.description && (
                    <TextAlert>{errors.description}</TextAlert>
                  )}

                  <SubmitButton
                    title="Próximo"
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