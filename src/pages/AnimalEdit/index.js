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
  FormInputMask,
} from './styles';

import axios from 'axios';
import { addAnimalInfo, getAnimalType } from '../../store/modules/animal/action';
import DateHelper from '../../helpers/dateHelper';

export default function AnimalEdit({ navigation }) {

  const dispatch = useDispatch();

  const [inicialValue, setInicialValue] = useState('');
  const [type, setType] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [castrated, setCastrated] = useState(false);
  const [animalType, setAnimalType] = useState([]);
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');

  const animal = useSelector(state => state.animal.animalInfo);
  const animalTypes = useSelector(state => state.animal.animalTypes);
  const birthDateValid = DateHelper.formatedDate(animal.birthDate);
  

  useEffect(() => {
    dispatch(getAnimalType());
    setVaccinated(animal.vaccinated);
    setCastrated(animal.castrated);
  }, []);

  useEffect(() => {
    if(animalType.length == 0) {
      animalTypes.map(type => {
        const obj = {
          value: type.id,
          label: type.name
        }
        animalType.push(obj);
        if(animal.type === obj.label) {
          setInicialValue(obj.value);
          setType(obj.value);
        }
      });
    }
  }, [animalTypes]);



  async function validateCep() {
    const cepFormatted = cep.replace('-', '');
    const response = await axios.get(`https://viacep.com.br/ws/${cepFormatted}/json`);
    setCity(response.data.localidade);
  }

  return (
      <ScrollView>
        <Container>
          <Body>
            <Title>Preencha as informações abaixo</Title>
            <Formik
              onSubmit={values => {
                dispatch(
                  addAnimalInfo(animal.id, values.name, type, values.breed, values.birthDate, vaccinated, castrated, city, values.description),
                );
                navigation.navigate('AnimalImageEdit');
              }}
              initialValues={{ name: animal.name, breed: animal.breed, birthDate: birthDateValid, zipCode: '', description: animal.description }}
              validationSchema={yup.object().shape({
                name: yup
                  .string()
                  .required('Nome é obrigatório'),
                birthDate: yup
                  .string()
                  .test('date', 'Essa data está inválida', date => {
                    if (date) {
                      if (DateHelper.isDate(date)) {
                        return true;
                      }
                      return false;
                    }
                  }),
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
                    defaultValue={inicialValue}
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

                  <TextHolderInput>Data de Nascimento</TextHolderInput>
                  <FormInputMask
                    error={!errors.birthDate}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    value={values.birthDate}
                    onChangeText={handleChange('birthDate')}
                  />
                  {touched.birthDate && errors.birthDate && (
                    <TextAlert>Data inválida</TextAlert>
                  )}

                  <TextHolderInput>CEP</TextHolderInput>
                  <FormInputMask
                    error={true}
                    type={'zip-code'}
                    returnKeyType="next"
                    value={cep}
                    onChangeText={setCep}
                    onEndEditing={() => validateCep()}
                  />
                  {touched.zipCode && errors.zipCode && (
                    <TextAlert>{errors.zipCode}</TextAlert>
                  )}

                  <CheckBoxRow>
                    <CheckBox
                      title='Está vacinado'
                      initialValues
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
