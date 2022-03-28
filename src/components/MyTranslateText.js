//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyTranslateText---------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      key         >> Clave de traduccion para soporte multilenguaje.
//      styleText   >> Estilo de texto.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import { useTranslation } from 'react-i18next';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          useTranslation >> https://react.i18next.com/
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyTranslateText({ styleText, code }) {
    const { t } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (<Text style={[styleText]}>{t(code)}</Text>);
}
//{t('ok')}
