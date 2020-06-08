/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React from 'react';
import { Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import {
  Container,
  Body,
  Title,
  FormInput,
  TextHolderInput,
  SubmitButton,
  Footer,
  TextFooter,
  LinkFooter,
  TextAlert,
} from './styles';

import { signIn } from '../../store/modules/auth/action';

export default function SignIn({ navigation }) {

  const dispatch = useDispatch();

  return (
      <ScrollView>
        <Container>
          <Body>
            <Title>Faça login para ter acesso as demais funcionalidades</Title>
            <Formik
              onSubmit={values => {
                dispatch(
                  signIn(values.email, values.password),
                )
              }}
              initialValues={{ email: 'teste@teste.com', password: '123' }}
              validationSchema={yup.object().shape({
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
                  <TextHolderInput>E-mail</TextHolderInput>
                  <FormInput
                    maxLength={250}
                    icon="mail"
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
                    icon="lock"
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

                  <SubmitButton
                    title="Entrar"
                    onPress={handleSubmit}>
                    <Text />
                  </SubmitButton>
                  <Footer>
                    <TextFooter>Não possui conta?</TextFooter>
                    <LinkFooter
                      onPress={() => navigation.navigate('SignUp')}>
                      Cadastre-se
                    </LinkFooter>
                  </Footer>
                </>
              )}
            </Formik>
          </Body>
        </Container>
      </ScrollView>
  );
}
