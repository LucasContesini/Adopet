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

import { getAnimalType } from '../../store/modules/animal/action';
import { setSearchInfo } from '../../store/modules/commons/action';

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
