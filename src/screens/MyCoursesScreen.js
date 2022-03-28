//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> MyCourses-------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React from 'react';
import { Text, View, ScrollView, Dimensions, Linking, Alert } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//------------------------------------------Redux----------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { AddUrl } from '../redux/actions/actions';
//------------------------------------------Analitics------------------------------------------
import analytics from '@react-native-firebase/analytics';
//------------------------------------------Servicies-------------------------------------------
import { getDiplomaCode } from '../services/services';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardMyCourses from '../components/MyCardMyCourses';
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { MyCoursesStyles as styles } from '../styles/styles';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
const URL_CURSOS = 'https://cursos.croplifela.org/';
const URL_DONWLOAD = 'es/cursos-estudiantes?view=cursofinalizado&layout=certificado&cod=';
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const MyCoursesScreen = props => {
    const { navigation, route } = props;
    const { params } = route;
    const { inProgress, completed } = params;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux-----------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------------------State-----------------------------------------------
    const user = useSelector(state => state.user);
    //--------------------------------------Actions----------------------------------------------
    const dispatch = useDispatch();
    const add_url = data => dispatch(AddUrl(data));
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Funcion >> Registro de Analiticas------------------------
    //Descripcion : Permite generar un registro del curso al cual accede el usuario.
    const RegisterAnalitic = async ({ label = '', id = '0' }) => {
        await analytics().logSelectContent({ content_type: label, item_id: id, });
    }
    //-----------------------------------Funcion >> goCourse-----------------------------------
    //Descripcion: Redireccion a vista de navegador.
    const goCourse = ({ urlCourse = '', labelCourse = '', idCourse = '' }) => {
        let urlObj = new Object;
        urlObj.url = urlCourse;
        urlObj.route = 'MyCourses';
        urlObj.title = labelCourse;
        RegisterAnalitic({ label: labelCourse, id: idCourse });
        add_url(urlObj);
        navigation.navigate('WebView');
    }
    //-----------------------------------Funcion >> goCourse-----------------------------------
    //Descripcion: Obtiene el codigo de certificado de usuario y lo redirige a la ventana de
    //              generacion del certificado.
    const downloadCertificate = async ({ idUser, idCourse }) => {
        console.log('idUser >> ', idUser, ' idCourse >> ', idCourse);
        try {
            let responseCode = await getDiplomaCode({ idUser: idUser, idCourse: idCourse });
            responseCode = responseCode.data.data;
            if (responseCode) {
                let code = responseCode;
                let newUrl = `${URL_CURSOS}${URL_DONWLOAD}${code}&ptusrid=${idUser}`;
                let supported = await Linking.canOpenURL(newUrl);
                if (supported)
                    await Linking.openURL(newUrl);
                else
                    Alert.alert('Enlace no soportado:', `${newUrl}`);
            }
        } catch (e) {
            console.log('error >> get code certificate >> ', e);
        }
    }
    //----------------------------------Funcion >> Evento de boton-----------------------------
    //Descripcion : Accion de evento de presionar boton.
    const handlerButton = ({ type = 'completed' | 'inProgress', data }) => {
        let verify = type === 'completed';
        if (verify)
            downloadCertificate({ idUser: user.data.id, idCourse: data.idCourse });
        else {
            let newUrl = `${URL_CURSOS}${data.urlCourse}${user.data.id}`;
            goCourse({ urlCourse: newUrl, labelCourse: data.nameCourse, idCourse: data.idCourse });
        }
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Componente >> Texto Video----------------------------------
    //Descripcion : Renderiza el titulo de la seccion.
    const Label = ({ text = '' }) => {
        return (
            <View style={[styles.ctnLabel]}>
                <Text style={[styles.textLabel]}>{text}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:misCursos')}
                route={'ProfileHome'}
                navigation={navigation} />
            <View style={[styles.ctnList]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.ctnScroll]}>
                    <Label text={t('myCourses:completed')} />
                    <MySpace ctnSpace={{ width, height: height * 0.025 }} />
                    {
                        completed.map(data =>
                            <MyCardMyCourses
                                key={data.idCourse + '_completed'}
                                type={'completed'}
                                data={data}
                                onPress={() => handlerButton({ type: 'completed', data: data })} />
                        )
                    }
                    <Label text={t('myCourses:inProgress')} />
                    <MySpace ctnSpace={{ width, height: height * 0.025 }} />
                    {
                        inProgress.map(data =>
                            <MyCardMyCourses
                                key={data.idCourse + '_completed'}
                                type={'inProgress'}
                                data={data}
                                onPress={() => handlerButton({ type: 'inProgress', data: data })} />
                        )
                    }
                </ScrollView>

            </View>
        </Wallpaper>
    );
};
export default MyCoursesScreen;
//INSERT INTO `user_pointsModules`(`idUser`, `idCourse`, `idModule`, `score`) VALUES (67919,17,48,10)
