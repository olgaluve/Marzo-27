//---------------------------------------------------------------------------------------------
//--------------------------Servicios de Consulta y consumo de App-----------------------------
//---------------------------------------------------------------------------------------------
import axios from 'axios';
import { BASE_API } from './constanst';
import { decode as atob, encode as btoa } from 'base-64';
import { FindLanguage } from '../functions/functions';
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> App------------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_UpdateApp = BASE_API + 'versionApp';
//-----------------------------------Funcion >> Logueo de usuario------------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de verificar la version actual
//              de la aplicacion del usuario.
const UpdateApp = ({ version, plataforma }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_UpdateApp,
            method: 'post',
            data: {
                version: version,
                plataforma: plataforma
            },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Profile--------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_UpdateProfile = BASE_API + 'updateProfile';
const updateDataUser = ({ data, selectAvatar = false }) => {
    let dataUserForm = new FormData();//Declaracion >> Formulario Datos
    //Asignacion >> Propiedades de usuario
    dataUserForm.append('id', data.id);
    dataUserForm.append('name', data.name);
    dataUserForm.append('lastname', data.lastname);
    dataUserForm.append('country', data.country);
    dataUserForm.append('city', data.city);
    dataUserForm.append('area', data.area);
    dataUserForm.append('company', data.company);
    dataUserForm.append('position', data.position);
    dataUserForm.append('language', FindLanguage(data.language));
    //dataUserForm.append('avatar', data.url_avatar);
    if (selectAvatar)
        dataUserForm.append('avatar', { uri: data.url_avatar, name: 'avatar.jpg', type: 'image/jpeg' });
    else
        dataUserForm.append('avatar', '');
    //Envio >> Solicitud Post
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_UpdateProfile,
            method: 'post',
            data: dataUserForm,
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': `multipart/form-data; boundary=${dataUserForm.boundary}`,
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Login----------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Login = BASE_API + 'login';
//-----------------------------------Funcion >> Logueo de usuario------------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de verificar los datos de
//             Email/Password del usuario.
const LoginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Login,
            method: 'post',
            data: {
                email: email,
                password: password
            },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> ForgetPassword-------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_SendEmail = BASE_API + 'forgotPassswordConfirmMail';
const URL_ConfirmCode = BASE_API + 'forgotPassswordConfirmCode';
const URL_NewPasswor = BASE_API + 'forgotPassswordNewPassword';
//----------------------------------Funcion >> Envio de Email----------------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de enviar un email al correo
//              ingresado por el usuario con el codigo de recuperacion de cuenta.
const sendMail = (email) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_SendEmail,
            method: 'post',
            data: { email: email, },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//-------------------------------Funcion >> Verificacion de Codigo---------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de verificar el codigo de
//              recuperacion de contraseña ingresado por el usuario.
const sendCode = (code) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_ConfirmCode,
            method: 'post',
            data: { code: code },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//-------------------------------Funcion >> Verificacion de Codigo---------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de actualizar la informacion
//             correspondiente a la contraseña del usuario.
const sendPassword = (password) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_NewPasswor,
            method: 'post',
            data: { password: password },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Register-------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
//const URL_RegisterUser = BASE_API + 'register';
//const URL_RegisterUser = BASE_API + 'registerWithMailChimp';
const URL_RegisterUser = BASE_API + 'registerWithPhoto';
//----------------------------------Funcion >> Registro de Usuario-----------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de registrar los datos del
//             nuevo usuario.
const registerUser = ({ data, selectAvatar = false }) => {
    let dataUserForm = new FormData();//Declaracion >> Formulario Datos
    //Asignacion >> Propiedades de usuario
    dataUserForm.append('name', data.name);
    dataUserForm.append('lastname', data.lastname);
    dataUserForm.append('country', data.country);
    dataUserForm.append('city', data.city);
    dataUserForm.append('area', data.workSector);
    dataUserForm.append('company', data.company);
    dataUserForm.append('position', data.position);
    dataUserForm.append('language', FindLanguage(data.language));
    dataUserForm.append('email', data.email);
    dataUserForm.append('password', data.password);
    dataUserForm.append('boletin', data.boletin ? '1' : '0');
    if (selectAvatar)
        dataUserForm.append('avatar', { uri: data.url_avatar, name: 'avatar.jpg', type: 'image/jpeg' });
    else
        dataUserForm.append('avatar', '');
    //Envio >> Solicitud Post
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_RegisterUser,
            method: 'post',
            data: dataUserForm,
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': `multipart/form-data; boundary=${dataUserForm.boundary}`,
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Points User----------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_ScoreUser = BASE_API + 'getUserScore';
//----------------------------------Funcion >> Registro de Usuario-----------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de registrar los datos del
//             nuevo usuario.
const scoreUser = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_ScoreUser,
            method: 'post',
            data: { idUser: idUser },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Recursos-------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Resource = BASE_API + 'getresources?lang=';
const URL_ResourceType = BASE_API + 'resourcesWithType';
//----------------------------------Funcion >> Obtencion Recursos------------------------------
//Descripcion: Envia una peticion GET mediante axios, con el fin de obtener los recursos
//              educativos ofrecidos por la compania.
const getResource = ({ language = 'es' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Resource + language,
            method: 'get',
            data: undefined,
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//------------------------------Funcion >> Obtencion Recursos por tipo-------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de obtener los recursos
//              educativos ofrecidos por la compania, de acuerdo al tipo seleccionado.
const getResourceType = ({ type = '1', language = 'es' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_ResourceType,
            method: 'post',
            data: {
                type: type,
                language: language
            },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Videos---------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Videos = BASE_API + 'getvideos?lang=';
//----------------------------------Funcion >> Obtencion Recursos------------------------------
//Descripcion: Envia una peticion GET mediante axios, con el fin de obtener los recursos
//              educativos ofrecidos por la compania.
const getVideos = ({ language = 'es' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Videos + language,
            method: 'get',
            data: undefined,
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Eventos--------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Eventos = BASE_API + 'getevents?lang=';
//----------------------------------Funcion >> Obtencion Recursos------------------------------
//Descripcion: Envia una peticion GET mediante axios, con el fin de obtener los recursos
//              educativos ofrecidos por la compania.
const getEvents = ({ language = 'es' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Eventos + language,
            method: 'get',
            data: undefined,
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Notificaciones-------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Notificaciones = BASE_API + 'notificationUser';//Obtener Notificaciones
const URL_AddNotificacion = BASE_API + 'addNotificationUser';//Agregar Notificacion
const URL_UpdateNotificacion = BASE_API + 'updateNotificationUser';//Actualizar Notificacion
const URL_DeleteNotificacion = BASE_API + 'deleteNotificationUser';//Delete Notificacion
//----------------------------------Funcion >> Obtencion Notificaciones------------------------
//Descripcion: Envia una peticion GET mediante axios, con el fin de obtener las notificaciones
//              de usuario.
const getNotificaciones = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Notificaciones,
            method: 'post',
            data: { idUser: idUser },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//----------------------------------Funcion >> Agregar Notificacion----------------------------
//Descripcion:  Envia una peticion POST mediante axios, con el fin de agregar una nueva
//              notificacion de usuario.
const addNotificacion = ({ data }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_AddNotificacion,
            method: 'post',
            data: {
                idUser: data.idUser,
                title: data.title,
                body: data.body,
                url_image: data.url_image
            },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//----------------------------------Funcion >> Actualizar Notificacion-------------------------
//Descripcion:  Envia una peticion POST mediante axios, con el fin de actualizar el estado
//              de vista de una notificacion de usuario.
const updateNotificacion = ({ id }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_UpdateNotificacion,
            method: 'post',
            data: { id: id },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//----------------------------------Funcion >> Delete Notificacion-----------------------------
//Descripcion:  Envia una peticion POST mediante axios, con el fin de eliminar una notificaciones.
const deleteNotificacion = ({ id }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_DeleteNotificacion,
            method: 'post',
            data: { id: id },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Podcast--------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Podcast = BASE_API + 'podcast';//Obtener Podcast
//----------------------------------Funcion >> Obtencion Podcast-------------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de obtener los podcast de la
//             compañia.
const getPodcast = ({ language = 'es' }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Podcast,
            method: 'post',
            data: { language: language },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------------------------------------------------------------------------
//-----------------------------------Servicios >> Progreso de usuario--------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Direccion URL de peticiones de Backend-----------------------------
const URL_Progreso = BASE_API + 'progresoCursos';//Obtener Progreso de cursos
const URL_ProgresoTest = BASE_API + 'progresoTest';//Obtener Progreso de cursos
const URL_DiplomaCode = BASE_API + 'diplomaCode';//Obtener Codigo de certificado
//-------------------------Funcion >> Obtencion Progreso de usuario----------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de obtener el progreso del
//             usuario en los test ofrecidos en la plataforma.
const getProgreso = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_Progreso,
            method: 'post',
            data: { idUser: idUser },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------Funcion >> Obtencion Progreso de test-----------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de obtener el progreso del
//             usuario en la plataforma, respecto a los cursos ofrecidos.
const getProgresoTest = ({ idUser }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_ProgresoTest,
            method: 'post',
            data: { idUser: idUser },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}
//---------------------------Funcion >> Obtencion codigo de certificado------------------------
//Descripcion: Envia una peticion POST mediante axios, con el fin de obtener el codigo de
//              certificado del usuario, del curso correspondiente.
const getDiplomaCode = ({ idUser, idCourse }) => {
    return new Promise((resolve, reject) => {
        const response = axios({
            url: URL_DiplomaCode,
            method: 'post',
            data: {
                idUser: idUser,
                idCourse: idCourse
            },
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ' + btoa('admin123' + ':' + '1234'),
                'Content-Type': 'application/json',
            }
        });
        resolve(response);
    });
}

export {
    UpdateApp,
    updateDataUser,
    LoginUser,
    sendMail, sendCode, sendPassword,
    registerUser,
    scoreUser,
    getResource, getVideos, getEvents, getResourceType,
    getNotificaciones, addNotificacion, updateNotificacion, deleteNotificacion,
    getPodcast,
    getProgreso,
    getProgresoTest,
    getDiplomaCode
}