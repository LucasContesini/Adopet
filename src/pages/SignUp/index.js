/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Header,
  Body,
  Title,
  FormInput,
  TextHolderInput,
  SubmitButton,
  TextAlert,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signUp } from '../../store/modules/auth/action';

export default function SignUp({ navigation }) {

  const emailConflict = useSelector(state => state.auth.emailConflict);

  const dispatch = useDispatch();

  return (
      <ScrollView>
        <Header>
          <TouchableOpacity
            hitSlop={{ top: 100, left: 100, right: 200, bottom: 100 }}
            onPress={() => navigation.navigate('SignIn')}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Title>Preencha as informações abaixo</Title>
        </Header>
        
        <Container>
          <Body>
            
            <Formik
              onSubmit={values => {
                dispatch(
                  signUp(values.nickname, values.email, values.password),
                )
              }}
              initialValues={{ nickname: 'teste', email: 'teste@teste.com', password: '123' }}
              validationSchema={yup.object().shape({
                nickname: yup
                  .string()
                  .required('Apelido é obrigatório'),
                email: yup
                  .string()
                  .email('E-mail inválido')
                  .required('E-mail é obrigatório'),

                password: yup
                  .string()
                  .required('Senha é obrigatória'),
              })}>
              {({
                values,
                handleChange,
                errors,
                touched,
                handleSubmit,
              }) => (
                <>
                <TextHolderInput>Apelido</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.nickname}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.nickname}
                    onChangeText={handleChange('nickname')}
                  />
                  {touched.nickname && errors.nickname && (
                    <TextAlert>{errors.nickname}</TextAlert>
                  )}

                  <TextHolderInput>E-mail</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.email}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  {touched.email && errors.email && (
                    <TextAlert>{errors.email}</TextAlert>
                  )}

                  <TextHolderInput>Senha</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    error={errors.password}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  {touched.password && errors.password && (
                    <TextAlert>{errors.password}</TextAlert>
                  )}

                  {emailConflict && (
                    <TextAlert>
                      E-mail já cadastrado na base
                    </TextAlert>
                  )}

                  <SubmitButton
                    title="Criar conta"
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
