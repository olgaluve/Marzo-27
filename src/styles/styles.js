//---------------------------------------------------------------------------------------------
//-----------------------------------Hoja de estilos-------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale } from './scale';
import { colors } from './colors';
import { letter } from './letter';
//----------------------------------------Constantes-------------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-------------------------------Estilos Generales de pantalla---------------------------------
//---------------------------------------------------------------------------------------------
const screenStyles = StyleSheet.create({
    //Estilo de contenedor de pantalla
    ctnScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.White,
    },
});
//-----------------------------------------------------------------------------------
//-------------------------------Estilos >> Navegador de Home------------------------
//-----------------------------------------------------------------------------------
const HomeNavigator = StyleSheet.create({
    //Estilo >> Fondo de menu de cajon
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    //Estilo >> Vista de menu de cajon
    bgView: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.DarkBlue
    },
    //Estilo >> Transparencia de fondo de Menu
    transparentView: {
        ...StyleSheet.absoluteFill,
        //backgroundColor: 'rgba(0,0,0,0.75)'
    },
    //Estilo >> Contenedor de Screen de navegador
    sceneContainerStyle: {
        backgroundColor: 'transparent'
    },
    //Estilo >> Menu de cajon
    drawerStyle: {
        backgroundColor: 'transparent',
        width: width < 350 ? '70%' : '60%',
    },
    //Estilo >> Contenedor boton de prueba de animacion
    ctnButton: {
        position: 'absolute',
        width: width * 0.9,
        height: height * 0.05,
        bottom: height * 0.05,
        left: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.Blue,
        borderRadius: 10,
        zIndex: 100,
    },
    //Estilo >> Texto de prueba de animacion
    textButton: {
        color: colors.White,
        fontSize: FONTSIZE_TEXT_LABEL,
        fontFamily: letter.Title
    },
});

//-----------------------------------------------------------------------------------
//---------------------------------Estilos de Splash---------------------------------
//-----------------------------------------------------------------------------------
const SplashStyles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla
    ctnScreen: {
        flex: 1,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo de logo de empresa
    LogoEmpresa: {
        height: height * 0.15,
        width: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White,
        //borderRadius: 100,
    },
    //Estilo de contenedor de vista de carga
    ctnLoading: {
        width,
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo de Square de vista
    ctnSquare: {
        width: height,
        height: height,
        backgroundColor: colors.White,
        borderRadius: 90,
        position: 'absolute',
    },
    //Estilo de texto de empresa
    txtEmpresa: {
        color: colors.Blue,
        fontFamily: letter.Title,
        fontSize: moderateScale(20)
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos de Login----------------------------------
//-----------------------------------------------------------------------------------
const LoginStyles = StyleSheet.create({
    //Estilo de contenedor de desplazamiento
    ctnKeyboard: {
        height: height * 0.9,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    //Estilo de contenerdor de formulario de logueo
    ctnForm: {
        width: '80%',
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.White,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo de contenedor de textInput
    ctnTextInput: {
        width: '90%',
        flex: 0.35,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
    },
    //Estilo de contenedor de boton1
    ctnButtonLight: {
        width: '80%',
        flex: 0.08,
        backgroundColor: colors.Blue,
        borderRadius: 10,
    },
    //Estilo de contenedor de boton1
    ctnButtonDark: {
        width: '80%',
        flex: 0.07,
        backgroundColor: colors.White,
        borderColor: colors.Blue,
        borderWidth: 2,
        borderRadius: 10,
    },
    //Estilo de texto ForgetPassword
    textForgotPassword: {
        fontFamily: letter.Text_2,
        fontSize: 15,
        color: colors.Blue,
        textAlign: 'right'
    },
    //Estilo de boton ForgetPassword
    buttonForgotPassword: {
        width: '80%',
        flex: 0.08,
        backgroundColor: 'transparent',
    },
    //Estilo de texto de boton
    textButton: {
        fontFamily: letter.Text_2,
        fontSize: width * 0.05,
        color: colors.White,
        textAlign: 'center'
    }
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos de Register-------------------------------
//-----------------------------------------------------------------------------------
const RegisterStyles = StyleSheet.create({
    //Estilo de contenedor de desplazamiento
    ctnKeyboard: {
        height: height * 0.9,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    //Estilo de contenerdor de formulario de logueo
    ctnForm: {
        width: '80%',
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.White,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo de contenedor de textInput
    ctnTextInput: {
        width: '90%',
        flex: 0.18,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
    },
    //Estilo de contenedor de lista seleccionable
    ctnPicker: {
        width: '90%',
        flex: 0.18,
        //flex: 0.33,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
        //borderRadius: 10,
    },
    //Estilo de contenedor de check
    ctnCheck: {
        width: '90%',
        flex: 0.15,
        flexDirection: 'row',
    },
    //Estilo de texto de check
    textCheck: {
        fontFamily: letter.Text_1,
        fontSize: 15,
        color: colors.Blue,
        textAlign: 'left'
    },
    //Estilo de contenedor de boton1
    ctnButtonLight: {
        width: '80%',
        flex: 0.08,
        backgroundColor: colors.Blue,
        borderRadius: 10,
    },
    //Estilo de contenedor de boton1
    ctnButtonDark: {
        width: '80%',
        flex: 0.07,
        backgroundColor: colors.White,
        borderColor: colors.Blue,
        borderWidth: 2,
        borderRadius: 10,
    },
    //Estilo de texto de boton
    textButton: {
        fontFamily: letter.Text_2,
        fontSize: width * 0.05,
        color: colors.White,
        textAlign: 'center'
    },
    //Estilo >> Avatar
    avatar: {
        position: 'relative',
        flex: 0.52,
        width: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo >> Imagen
    imageAvatar: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    //Estilo >> Boton de seleccion de foto
    btnSelectPhote: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%',
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        width: '100%',
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto Seccion Avatar
    textAvatar: {
        fontWeight: 'normal',
        fontSize: FONTSIZE_TEXT_LABEL,//16
        color: colors.Blue,
        textAlign: 'center'
    },
    //Estilo >> Texto Nombre
    textName: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.Blue,
        fontFamily: letter.Title,
    },
});
//-----------------------------------------------------------------------------------
//------------------------------Estilos de Forget Password---------------------------
//-----------------------------------------------------------------------------------
const ForgetPasswordStyles = StyleSheet.create({
    //Estilo de contenedor de desplazamiento
    ctnKeyboard: {
        height: height * 0.9,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    //Estilo de contenerdor de formulario de logueo
    ctnForm: {
        width: '80%',
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.White,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo de contenedor de textInput
    ctnTextInput: {
        width: '90%',
        flex: 0.3,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue
    },
    //Estilo de contenedor de boton1
    ctnButtonLight: {
        width: '80%',
        flex: 0.08,
        backgroundColor: colors.Blue,
        borderRadius: 10,
    },
    //Estilo de contenedor de boton1
    ctnButtonDark: {
        width: '80%',
        flex: 0.07,
        backgroundColor: colors.White,
        borderColor: colors.Blue,
        borderWidth: 2,
        borderRadius: 10,
    },
    //Estilo de texto de boton
    textButton: {
        fontFamily: letter.Text_2,
        fontSize: width * 0.05,
        color: colors.White,
        textAlign: 'center'
    }
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Home-----------------------------------
//-----------------------------------------------------------------------------------
const HomeStyles = StyleSheet.create({
    //Estilo >> Contenedor de botones de Home
    ctnBtnHome: {
        flex: 0.78,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de botones
    ctnButtons: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: colors.LightBlue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.025
    },
    //Estilo >> Texto de botones
    textButtons: {
        marginTop: '10%',
        fontSize: moderateScale(16),
        fontFamily: letter.Text_2,
        color: colors.Blue,
    },
    //Estilo >> Imagen de botones
    btnImagen: {
        width: width * 0.15,
        height: width * 0.15,
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Cursos---------------------------------
//-----------------------------------------------------------------------------------
const CoursesStyles = StyleSheet.create({
    //Estilo >> Contenedor Cursos
    ctnCourses: {
        flex: 0.88,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Scroll Cursos
    scrollCourse: {
        width,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.025,
    },
    //Estilo >> Titulo Footer
    footerTitle: {
        fontSize: moderateScale(18),
        fontFamily: letter.Title,
        color: colors.Blue,
        textAlign: 'center'
    },
    //Estilo >> Boton de detalles de curso
    btnCourse: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    //Estilo >> Texto de boton
    txtButton: {
        color: colors.White,
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_LABEL
    },
    //Contenedor >> View Detalles del curso
    viewDetailsCourse: {
        width: '100%',
        height: height * 0.15,
        overflow: 'hidden',
        backgroundColor: colors.White,
        marginVertical: height * 0.025,
        elevation: 5,
        borderRadius: 10
    },
    //Contenedor >> Detalles del curso
    ctnDetailsCourse: {
        height: height * 0.15,
        paddingHorizontal: width * 0.025 * 2,
        paddingVertical: height * 0.01,
        justifyContent: 'space-between',
    },
    //Estilo >> Titulo modulos
    moduleTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        fontFamily: letter.Title,
    },
    //Estilo >> Texto modulos
    moduleText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
    }
});
//-----------------------------------------------------------------------------------
//-------------------------------Estilos >> Profile----------------------------------
//-----------------------------------------------------------------------------------
const ProfileStyles = StyleSheet.create({
    //Estilo >> Contenedor Avatar
    ctnAvatar: {
        flex: 0.18,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Avatar
    avatar: {
        position: 'relative',
        height: height * 0.15,
        width: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo >> Imagen
    imageAvatar: {
        flex: height * 0.15,
        width: height * 0.15,
        borderRadius: 20,
    },
    //Estilo >> Boton edicion
    ctnBtnEdit: {
        position: 'absolute',
        height: height * 0.04,
        width: height * 0.04,
        borderRadius: 5,
        backgroundColor: colors.White,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        right: 0,
    },
    //Estilo >> Nombre Usuario
    ctnNameUser: {
        flex: 0.1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto Nombre
    textName: {
        fontSize: FONTSIZE_TEXT_TITLE,
        fontFamily: letter.Title,
        color: colors.Black,
        textTransform: 'capitalize'
    },
    //Estilo >> Texto Detalle
    textDetail: {
        fontSize: FONTSIZE_TEXT_LABEL,
        fontFamily: letter.Text_2,
        color: colors.Black
    },
    //Estilo >> Contenedor de botones
    ctnBtnPerfil: {
        flex: 0.15,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    //Estilo >> Boton de perfil
    btnPerfil: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo >> Icono de Boton
    btnIconPerfil: {
        height: height * 0.1,
        width: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.Blue
    },
    //Estilo >> Contenedor de detalles
    ctntitleDetails: {
        flex: 0.05,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Blue
    },
    //Estilo >> Contenedor Detalles
    ctnDetails: {
        flex: 0.35,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Scroll Detalles
    scrollDetails: {
        width: '100%',
    },
    //Estilo >> Contenedor Detalles >> Label
    ctnDetailLabel: {
        flex: 0.035,
        width: width * 0.8,
        marginHorizontal: width * 0.1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomColor: colors.Blue,
        borderBottomWidth: 2,
    },
    //Estilo >> Contenedor Detalles >> Data
    ctnDetailData: {
        flex: 0.035,
        width: width * 0.8,
        marginHorizontal: width * 0.1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.05
    },
});
//-----------------------------------------------------------------------------------
//-------------------------------Estilos >> Edit Profile-----------------------------
//-----------------------------------------------------------------------------------
const ProfileEditStyles = StyleSheet.create({
    //Estilo de contenedor de desplazamiento
    ctnKeyboard: {
        flex: 1,
        width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    //Estilo >> Contenedor Avatar
    ctnAvatar: {
        height: height * 0.15,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Avatar
    avatar: {
        position: 'relative',
        height: '100%',
        width: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo >> Imagen
    imageAvatar: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    //Estilo >> Boton de seleccion de foto
    btnSelectPhote: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%',
        width: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo >> Contenedor TextInput
    ctnTextInput: {
        width: '90%',
        height: height * 0.07,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
    },
    //Estilo >> Contenedor Picker
    ctnPicker: {
        width: '90%',
        height: height * 0.07,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Ayuda Usuario--------------------------
//-----------------------------------------------------------------------------------
const HelpStyles = StyleSheet.create({
    //Estilo >> contenedor
    ctnScreen: {
        height,
        width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    //Estilo >> contenedor de boton de menu
    ctnButtonDrawer: {
        flex: 0.08,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> boton de menu
    buttonDrawer: {
        flex: 0.1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> contenedor de logo de compañia
    ctnLogoCompany: {
        flex: 0.1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> contenedor de header
    ctnHeader: {
        height: '100%',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: colors.Blue,
    },
    //Estilo >> texto de header
    title: {
        fontFamily: letter.Title,
        fontSize: width * 0.055,
        color: colors.Blue,
        textAlign: 'center'
    },
    //Estilo >> Contenedor de body
    ctnBody: {
        width,
        flex: 0.14,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.08,
    },
    //Estilo >> Texto de body
    textBody: {
        textAlign: 'center',
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_LABEL - 2,
    },
    //Estilo >> Texto de link
    textLink: {
        textAlign: 'center',
        color: colors.Blue,
        fontWeight: '700',
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_LABEL,
    },
    //Estilo >> Contenedor de preguntas
    ctnQuestion: {
        width,
        flex: 0.74,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Logros---------------------------------
//-----------------------------------------------------------------------------------
const AchievementsStyles = StyleSheet.create({
    //Estilo de contenedor
    ctnScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    /*Estilo de contenedor de logros*/
    ctnAchievements: {
        flex: 0.9,
        width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    /*Estilo de seccion de scroll*/
    scrollSection: {
        flex: 1,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    /*Estilo de contenedor de seccion informativa*/
    ctnSectionLevel: {
        flex: 0.055,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de contenedor de texto informativo*/
    ctnTextLevel: {
        height: '100%',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    /*Estilo de texto de mensaje de nivel*/
    textMsMLevel: {
        fontFamily: letter.Text_2,
        fontSize: moderateScale(15),
        color: colors.Blue,
        textAlign: 'left',
        marginLeft: '10%'
    },
    /*Estilo de texto de nivel*/
    textLevel: {
        fontFamily: letter.Title,
        fontSize: moderateScale(16),
        color: colors.Blue,
        textAlign: 'left',
        marginLeft: '10%'
    },
    /*Estilo de contenedor de seccion de puntos*/
    ctnSectionScore: {
        flex: 0.65,
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    /*Estilo de contenedor de texto de puntaje*/
    ctnTextScore: {
        flex: 0.15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de texto de puntaje*/
    textScore: {
        fontFamily: letter.Text_2,
        fontSize: width * 0.05,
        color: colors.Blue,
        textAlign: 'center',
    },
    /*Estilo de contenedor de medalla*/
    ctnMedal: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de medalla*/
    medal: {
        width: width * 0.35,
        height: width * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de contenedor de texto motivacional*/
    ctnTextMotivation: {
        flex: 0.2,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de nueva categoria
    ctnNextCategory: {
        flex: 0.1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de texto de proxima categoria*/
    textNextCategory: {
        fontFamily: letter.Text_2,
        fontSize: width * 0.04,
        color: colors.Blue,
        textAlign: 'center',
    },
    /*Estilo de contenedr de seccion de iconos*/
    ctnSectionIcons: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*Estilo de iconos de seccion*/
    iconsSection: {
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.04,
    }

});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Test-----------------------------------
//-----------------------------------------------------------------------------------
const TestStyles = StyleSheet.create({
    //Estilo >> Contenedor Test
    ctnTest: {
        flex: 0.88,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Scroll Test
    scrollTest: {
        width,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.025,
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> WebView--------------------------------
//-----------------------------------------------------------------------------------
const WebViewStyles = StyleSheet.create({
    //Estilo >> Contenedor WebView
    ctn: {
        flex: 0.88,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Recursos-------------------------------
//-----------------------------------------------------------------------------------
const ResourcesStyles = StyleSheet.create({
    //Estilo >> Contenedor Botones Recursos
    ctnButtonsResources: {
        position: 'relative',
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor Recursos
    ctnCardResources: {
        flex: 0.58,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Scroll Buttons Recursos
    scrollButtonsResources: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Vista Indicador
    viewIndicator: {
        width,
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor Indicador
    ctnIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Scroll Recursos
    scrollResources: {
        paddingHorizontal: width * 0.06,
        width,
        // paddingVertical: height * 0.025,
    },
    //Estilo >> Vista de carga
    ctnLoading: {
        flex: 1,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    }
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Videos---------------------------------
//-----------------------------------------------------------------------------------
const VideosStyles = StyleSheet.create({
    //Estilo >> Contenedor Videos
    ctnVideos: {
        flex: 0.4,//0.88
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Contenedor Videos Vistos
    ctnVideosLike: {
        flex: 0.32,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        flex: 0.08,//0.88
        width,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.05,
        //backgroundColor: 'rgba(0,0,0,0.5)'
    },
    //Estilo >> texto de label
    textLabel: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title
    },
    //Estilo >> Scroll Videos
    scrollVideos: {
        width,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.025,
    },
    //Estilo >> Vista de carga
    ctnLoading: {
        flex: 0.1,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de reproductor de video
    ctnPlayVideo: {
        flex: 0.35,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0,0,0,0.5)'
    },
    //Estilo >> Contenedor detalles de video
    ctnDetails: {
        flex: 0.53,
        width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingRight: width * 0.05,
        paddingLeft: width * 0.05,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.02,
        backgroundColor: colors.White,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10
    },
    //Estilo >> Texto de titulo
    textTitle: {
        color: colors.Black,
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_LABEL
    },
    //Estilo >> Texto de detalles
    textDetail: {
        color: colors.Black,
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_LABEL
    },
    //Estilo >> Contenedor de propiedades de video
    ctnVideoProperty: {
        width: '100%',
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    //Estilo >> Contenedor de valor de propiedad
    ctnValueProperty: {
        flex: 0.2,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    //Estilo >> Divisor de seccion
    sectionDivider: {
        width: '100%',
        height: height * 0.002,
        backgroundColor: colors.Black + '2F'
    },
})
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Eventos--------------------------------
//-----------------------------------------------------------------------------------
const EventsStyles = StyleSheet.create({
    //Estilo >> Contenedor Recursos
    ctnEvents: {
        flex: 0.88,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Scroll Recursos
    scrollEvents: {
        width,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.025,
    },
    //Estilo >> Vista de carga
    ctnLoading: {
        flex: 0.1,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    },
    //Estilo >> Calendario
    calendar: {
        backgroundColor: '#357BBC',
        borderRadius: 10,
        paddingVertical: 10
    },
    //Estilo >> lista de eventos
    list: {
        width,
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: colors.White
    }
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Notificaciones-------------------------
//-----------------------------------------------------------------------------------
const NotificationsStyles = StyleSheet.create({
    //Estilo >> Contenedor Notificaciones
    ctnNotification: {
        flex: 0.88,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de msm
    ctnMsm: {
        width: '90%',
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo >> texto de msm
    textMsm: {
        fontSize: FONTSIZE_TEXT_TITLE,
        fontFamily: letter.Title,
        color: colors.DarkBlue
    }
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Podcast--------------------------------
//-----------------------------------------------------------------------------------
const PodcastStyles = StyleSheet.create({
    //Estilo >> Contenedor Podcast
    ctnPodcast: {
        flex: 0.42,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor Videos Vistos
    ctnPodcastLike: {
        flex: 0.30,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        flex: 0.08,//0.88
        width,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.05,
    },
    //Estilo >> texto de label
    textLabel: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title
    },
    //Estilo >> Vista de carga
    ctnLoading: {
        flex: 1,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de lista
    ctnList: {
        width,
        flex: 0.68,
    },
    //Estilo >> Contenedor de Slider
    ctnSlider: {
        flex: 0.08,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de botones
    ctnButtonsPlay: {
        flex: 0.1,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Mis Cursos-----------------------------
//-----------------------------------------------------------------------------------
const MyCoursesStyles = StyleSheet.create({
    //Container >> List
    ctnList: {
        flex: 0.88,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        flex: 0.08,//0.88
        width,
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
    },
    //Estilo >> texto de label
    textLabel: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        fontFamily: letter.Title,
        textAlign: 'center'
    },
    //container >> Scroll
    ctnScroll: {
        width,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
    },

});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Mis Test-------------------------------
//-----------------------------------------------------------------------------------
const MyTestStyles = StyleSheet.create({
    //Container >> List
    ctnList: {
        flex: 0.88,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto de carga
    loadingText: {
        fontFamily: letter.Title,
        fontSize: moderateScale(20),
        color: colors.Blue,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de label
    ctnLabel: {
        flex: 0.08,//0.88
        width,
        justifyContent: 'center',
        //paddingHorizontal: width * 0.05,
    },
    //Estilo >> texto de label
    textLabel: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        fontFamily: letter.Title,
        textAlign: 'center'
    },
    //container >> Scroll
    ctnScroll: {
        width,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
    },

});
//-----------------------------------------------------------------------------------
//---------------------------------Estilos >> Cierre de sesion-----------------------
//-----------------------------------------------------------------------------------
const LogOutStyles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla
    ctnScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.Blue
    },
    //Estilo >> Contenedor de texto
    ctnText: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto
    text: {
        fontSize: moderateScale(18),
        fontFamily: letter.Title,
        textAlign: 'center',
        color: colors.White,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de Imagen
    ctnImagen: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White
    },
    //Estilo >> Imaegen
    imagen: {
        width: '70%',
        height: '70%',
    }
});
//-----------------------------------------------------------------------------------
//----------------------------Estilos >> Actualizacion de App------------------------
//-----------------------------------------------------------------------------------
const UpdateAppStyles = StyleSheet.create({
    //Estilo >> Contenedor
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        width: '80%',
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        width: '100%',
        height: '100%'
    },
    //Estilo >> Contenedor de mensaje
    ctnMessage: {
        flex: 0.2,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Titulo
    title: {
        fontSize: moderateScale(25),
        color: colors.Blue,
        fontFamily: letter.Title,
        textAlign: 'center'
    },
    //Estilo >> Texto de mensaje
    label: {
        fontSize: moderateScale(16),
        color: colors.Blue,
        //fontFamily: letter.Text_2,
        fontWeight: '600',
        textAlign: 'center'
    },
    //Estilo >> Contenedor de boton de actualizacion
    btnUpdate: {
        flex: 0.06,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.Blue,
        elevation: 8
    },
    //Estilo >> Texto de boton
    btnText: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.White,
        fontFamily: letter.Text_2,
        textAlign: 'center'
    },
});
export {
    screenStyles, SplashStyles, LoginStyles, ForgetPasswordStyles, RegisterStyles,
    HomeStyles, CoursesStyles, ProfileStyles, ProfileEditStyles, LogOutStyles,
    HelpStyles, AchievementsStyles, TestStyles, HomeNavigator,
    WebViewStyles, ResourcesStyles, VideosStyles, EventsStyles, NotificationsStyles,
    PodcastStyles, UpdateAppStyles, MyCoursesStyles, MyTestStyles

}
