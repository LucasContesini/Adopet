/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, Icon } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import LinearGradient from 'react-native-linear-gradient';

import { Formik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  checkDoc,
  checkEmail,
  clearEmailError,
  clearDocError,
} from '../../../store/modules/auth/actions';
import DocHelper from '../../../helpers/docValidate';
import DateHelper from '../../../helpers/dateValidate';

import { sendImage } from '../../../store/modules/chat/actions';

// import Icon from 'react-native-vector-icons';

import {
  Container,
  Avatar,
  Title,
  ChooseAvatar,
  ChooseAvatarText,
  Form,
  FormInput,
  SubmitButton,
  TextHolderInput,
  FormInputMask,
  TextAlert,
  Privacity,
} from './styles';

import woman from '../../../assets/woman.png';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

export default function PersonalData({ navigation }) {
  const userID = useSelector(state => state.auth.userId);
  const isValidDocReducer = useSelector(state => state.auth.validDoc);
  const isValidEmailRecucer = useSelector(state => state.auth.validEmail);

  const data = navigation.getParam('routeData');
  const healthCardNumber = navigation.getParam('healthCardNumber');

  const [editable, setEditable] = useState(true);

  const [avatar, setAvatar] = useState('');
  const [doc, setDoc] = useState('');

  const emailError = useSelector(state => state.auth.emailError);
  const docError = useSelector(state => state.auth.docError);

  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidDoc, setIsValidDoc] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  // const [birthDate, setBirthDate] = useState('');
  const [isValidBirthDate, setIsValidBirthDate] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAdress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [emailReason, setEmailReason] = useState('');

  const [disabledSubmit, setDisableSubmit] = useState('');

  // const birthdateValid = DateHelper.formatDateToPersist(birthDate);

  const expression = /(?!.\.{2})^([a-z\d!#$%&'+\-\/=?^`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))(([\t]\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  function disable() {
    setEditable(false);
  }

  function handleOldData(username) {
    setEmail(username);
    disable();
  }

  if (data) {
    if (data.username !== '' && email === '') {
      handleOldData(data.username);
    }
  }

  useEffect(() => {
    if (!isValidDocReducer) {
      setDisableSubmit(true);
      setIsValidDoc(false);
    } else {
      setDisableSubmit(false);
      setIsValidDoc(true);
    }
  }, [isValidDocReducer]);

  useEffect(() => {
    if (!isValidEmailRecucer) {
      setDisableSubmit(true);
      setIsValidEmail(false);
      setEmailReason(
        'E-mail já cadastrado em nossa base de dados, efetue seu login',
      );
    } else {
      setDisableSubmit(false);
      setIsValidEmail(true);
    }
  }, [isValidEmailRecucer]);

  const docRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const birthDateRef = useRef();
  const phoneNumberRef = useRef();
  const cepRef = useRef();
  const numberRef = useRef();
  const complementRef = useRef();

  const dispatch = useDispatch();
  const cepInput = useRef(null);

  const [checkedTerms, setCheckedTerms] = useState(false);

  function handleSubmit() {
    navigation.navigate('Password', {
      avatar,
      healthCardNumber,
      doc,
      name,
      email,
      birthDate,
      phoneNumber,
      address,
      number,
      complement,
      neighborhood,
      state,
      city,
      cep,
    });
  }

  async function validateCpf(document) {
    const validDoc = DocHelper.validateDoc(document);
    if (validDoc) {
      return true;
    }
    return false;
  }

  function validateSizeName() {
    if (name.length < 1) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }

  async function validateSizeEmail() {
    const regexEmail = expression.test(String(email).toLowerCase());

    if (regexEmail) {
      dispatch(checkEmail(email, 'PersonalData'));
    } else {
      setIsValidEmail(false);
      setEmailReason('Formato de e-mail inválido');
      setDisableSubmit(true);
    }
  }

  async function validateDate(date) {
    const dateformat = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
    const teste = dateformat.test(date);
  }

  async function validateCep() {
    const testi = cep.replace('-', '');
    const response = await axios.get(`https://viacep.com.br/ws/${testi}/json`);
    setAdress(response.data.logradouro);
    setNeighborhood(response.data.bairro);
    setState(response.data.uf);
    setCity(response.data.localidade);
  }

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

  function chooseAvatar() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User cancelled image picker');
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
          const uriResize = uri.replace('file://', '');
          RNFetchBlob.fs.readFile(uriResize, 'base64').then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: 'image/jpeg;BASE64',
            }).then(blob => {
              dispatch(
                sendImage(
                  blob,
                  snapshot => {
                    const tamanhoTotal = 0;

                    if (tamanhoTotal < snapshot.totalBytes) {
                      setPctLoading(true);
                    } else {
                      setPctLoading(false);
                    }
                    setPctLoading(snapshot.bytesTransferred);
                  },
                  imgUrl => setAvatar(imgUrl),
                ),
              );
            });
          });
        });
      }
    });
  }

  return (
    <KeyboardAwareScrollView extraHeight={180} extraScrollHeight={0}>
      <Container>
        <Title>Informações pessoais</Title>
        {avatar ? (
          <Avatar source={{ uri: `${avatar}` }} />
        ) : (
          <Avatar source={woman} />
        )}
        <ChooseAvatar onPress={chooseAvatar}>
          <ChooseAvatarText>Escolha uma foto</ChooseAvatarText>
        </ChooseAvatar>
        <Form>
          <Formik
            enableReinitialize={false}
            onSubmit={values =>
              navigation.navigate('Password', {
                avatar,
                healthCardNumber,
                doc: values.doc,
                name: values.nome,
                email: values.email,
                birthDate: values.birthDate,
                phoneNumber: values.phoneNumber,
                address,
                number,
                complement,
                neighborhood,
                state,
                city,
                cep,
              })
            }
            initialValues={{
              doc,
              nome: '',
              email: '',
              birthDate: '',
              phoneNumber: '',
              avatar,
              // healthCardNumber,
              // doc,
              // name,
              // email,
              // birthDate,
              // phoneNumber,
              // address,
              // number,
              // complement,
              // neighborhood,
              // state,
              // city,
              // cep,
            }}
            validationSchema={yup.object().shape({
              doc: yup
                .string()
                .required('Preencha seu CPF')
                .test('doc', 'Esse CPF está inválido', async document => {
                  if (document && document.length === 14) {
                    const existDoc = await validateCpf(document);

                    return existDoc;
                  }
                }),
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
              nome: yup.string().required('Preencha seu nome'),
              email: yup
                .string()
                .email('E-mail inválido')
                .required('Preencha seu E-mail'),
            })}>
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <>
                <TextHolderInput>CPF</TextHolderInput>
                <FormInputMask
                  error={!errors.doc}
                  type={'cpf'}
                  value={values.doc}
                  returnKeyType="next"
                  onChangeText={handleChange('doc')}
                  onBlur={() => (
                    setFieldTouched('doc'), dispatch(clearDocError())
                  )}
                />
                {touched.doc && errors.doc && (
                  <TextAlert>{errors.doc}</TextAlert>
                )}
                {docError && (
                  <TextAlert>
                    Esse CPF já está cadastrado em nossa base de dados.
                  </TextAlert>
                )}
                <TextHolderInput>Nome</TextHolderInput>
                <FormInput
                  maxLength={240}
                  error={errors.nome}
                  autoCorrect={false}
                  returnKeyType="next"
                  value={values.nome}
                  onChangeText={handleChange('nome')}
                  onBlur={() => setFieldTouched('nome')}
                />
                {touched.nome && errors.nome && (
                  <TextAlert>{errors.nome}</TextAlert>
                )}

                <TextHolderInput>E-mail</TextHolderInput>
                <FormInput
                  maxLength={240}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  error={errors.email}
                  autoCorrect={false}
                  returnKeyType="next"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => (
                    setFieldTouched('email'), dispatch(clearEmailError())
                  )}
                />
                {touched.email && errors.email && (
                  <TextAlert>{errors.email}</TextAlert>
                )}
                {emailError && (
                  <TextAlert>
                    Esse e-mail já está cadastrado em nossa base de dados.
                  </TextAlert>
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
                  onBlur={() => setFieldTouched('birthDate')}
                />
                {touched.birthDate && errors.birthDate && (
                  <TextAlert>Data inválida</TextAlert>
                )}
                <TextHolderInput>Celular</TextHolderInput>
                <FormInputMask
                  error={true}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={() => setFieldTouched('phoneNumber')}
                />
                <TextHolderInput>CEP</TextHolderInput>
                <FormInputMask
                  error={true}
                  type={'zip-code'}
                  value={cep}
                  onChangeText={setCep}
                  onEndEditing={() => validateCep()}
                  ref={cepInput}
                />
                {address !== '' && (
                  <>
                    <TextHolderInput>Endereço</TextHolderInput>
                    <FormInput
                      maxLength={240}
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      value={address}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View>
                        <TextHolderInput style={{ textAlign: 'left' }}>
                          Número
                        </TextHolderInput>
                        <FormInput
                          maxLength={10}
                          style={{ width: 150 }}
                          keyboardType="number-pad"
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType="next"
                          value={number}
                          onChangeText={setNumber}
                        />
                      </View>
                      <View>
                        <TextHolderInput
                          style={{ textAlign: 'left', paddingLeft: wp('8%') }}>
                          Complemento
                        </TextHolderInput>
                        <FormInput
                          maxLength={240}
                          style={{ width: wp('32%'), marginLeft: wp('8%') }}
                          keyboardType="email-address"
                          autoCorrect={false}
                          autoCapitalize="none"
                          returnKeyType="next"
                          value={complement}
                          onChangeText={setComplement}
                        />
                      </View>
                    </View>
                    <TextHolderInput>Bairro</TextHolderInput>
                    <FormInput
                      maxLength={240}
                      keyboardType="email-address"
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      value={neighborhood}
                    />
                    <TextHolderInput>Estado</TextHolderInput>
                    <FormInput
                      maxLength={240}
                      keyboardType="email-address"
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      value={state}
                    />
                    <TextHolderInput>Cidade</TextHolderInput>
                    <FormInput
                      maxLength={240}
                      keyboardType="email-address"
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      value={city}
                    />
                  </>
                )}

                <TouchableOpacity
                  style={{}}
                  onPress={() =>
                    Linking.openURL(
                      'https://bellamaterna.s3.amazonaws.com/TERMOS+DE+USO+BELLAMATERNA+2020.pdf',
                    )
                  }>
                  <Privacity>
                    Política de privacidade e termos e condições de uso
                  </Privacity>
                </TouchableOpacity>

                <CheckBox
                  checkedIcon={
                    <Icon
                      name="check-box"
                      type="material"
                      style={{ color: 'red' }}
                      color="#A51C60"
                      size={30}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name="check-box-outline-blank"
                      type="material"
                      style={{ color: 'red' }}
                      color="#A51C60"
                      size={30}
                    />
                  }
                  checkedColor="#ccc"
                  textStyle={{ fontWeight: 'normal' }}
                  containerStyle={{
                    backgroundColor: 'none',
                    borderColor: 'none',
                    borderRadius: 0,
                    borderWidth: 0,
                    opacity: 1.0,
                    width: 300,
                  }}
                  title="Estou de acordo com a POLÍTICA DE PRIVACIDADE e TERMOS E CONDIÇÕES DE USO"
                  checked={checkedTerms}
                  onPress={() => setCheckedTerms(!checkedTerms)}
                />
                <SubmitButton
                  title="Confirmar Informações"
                  disabled={!isValid || !checkedTerms}
                  onPress={handleSubmit}
                  ViewComponent={LinearGradient}
                  linearGradientProps={{
                    colors: ['#A51C60', '#DD6998'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                  }}
                />
              </>
            )}
          </Formik>
        </Form>
      </Container>
    </KeyboardAwareScrollView>
  );
}