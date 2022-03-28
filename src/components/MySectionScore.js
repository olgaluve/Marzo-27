//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MySectionScore----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      score           >>  Puntaje de usuario.
//      level           >>  Nivel de usuario.
//      pointsMissing   >>  Puntos faltantes de usurio.
//      nextLevel       >>  Proximo nivel de usuario.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import { useTranslation } from 'react-i18next';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//---------------------------------------Recursos Graficos---------------------------------------
import medallaOro from '../assets/medallaOro.png';
import medallaPlata from '../assets/medallaPlata.png';
import medallaBronce from '../assets/medallaBronce.png';
import medallaNada from '../assets/medallaNada.png';
import iconSection from '../assets/logros-punto.png';
//------------------------------------------Constantes-------------------------------------------
const { width, height } = Dimensions.get('window');
const URL_MEDALLAS = {
    'oro': medallaOro,
    'plata': medallaPlata,
    'bronce': medallaBronce,
    'sinPuntos': medallaNada
};//Tabla >> Level user
const ICONS_COMPANY = [
    { id: '0', url: iconSection },
    { id: '1', url: iconSection },
    { id: '2', url: iconSection },
    { id: '3', url: iconSection },
    { id: '4', url: iconSection },
    { id: '5', url: iconSection },
];//Objeto de iconos de footer
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MySectionScore = ({ score, level, pointsMissing, nextLevel }) => {
    //---------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion------------------------------
    //---------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------Componente >> Text de puntaje-------------------------------------
    //Descripcion : Renderiza la informacion correspondiente al puntaje del usuario.
    const TextScore = ({ score }) => {
        return (
            <View style={[styles.ctnTextScore]}>
                <Text style={[styles.textScore]}>
                    {t('logros:points')}
                    <Text style={[styles.textScore, { fontFamily: letter.Title }]}>
                        {'    '}{score}
                    </Text>
                </Text>
            </View>
        );
    }
    //---------------------------Componente >> Text de puntaje-------------------------------------
    //Descripcion : Renderiza el icono o medalla de merito de usuario de acuerdo a su puntaje actual.
    const MedalScore = ({ level }) => {
        return (
            <View style={[styles.ctnMedal]}>
                <Image
                    resizeMode="contain"
                    style={styles.medal}
                    source={URL_MEDALLAS[level]} />
            </View>
        );
    }
    //---------------------------Componente >> Text de Motivacional--------------------------------
    //Descripcion : Renderiza el texto de incentivo de obtencion de puntos para el usuario.
    const TextMotivation = () => {
        return (
            <View style={[styles.ctnTextMotivation]}>
                <Text style={[styles.textScore]}>
                    {t('logros:msm_0')}
                </Text>
            </View>
        );
    }
    //---------------------------Componente >> Seccion Proxima Categoria---------------------------
    //Descripcion : Renderiza la informacion correspondiente al puntaje faltante y proxima categoria.
    const SectionNextCategory = ({ pointsMissing, nextLevel }) => {
        let numPoints, nextCategory;
        numPoints = pointsMissing;
        nextCategory = nextLevel;
        return (
            <View style={[styles.ctnNextCategory]}>
                <Text style={[styles.textNextCategory]}>
                    {t('logros:nextLevel', { numPoints, nextCategory })}
                </Text>
            </View>
        );
    }
    //---------------------------Componente >> Seccion Iconos--------------------------------------
    //Descropcion: Renderiza el footer de la seccion de logros.
    const SectionIcons = () => {
        return (
            <View style={[styles.ctnSectionIcons]}>
                {
                    ICONS_COMPANY.map(data =>
                        <Image
                            key={data.id}
                            resizeMode="contain"
                            style={styles.iconsSection}
                            source={data.url} />
                    )
                }
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnSectionScore]}>
            <TextScore score={score} />
            <MedalScore level={level} />
            <TextMotivation />
            <SectionNextCategory
                pointsMissing={pointsMissing}
                nextLevel={nextLevel} />
            <SectionIcons />
        </View>
    );
}
export default MySectionScore;
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de seccion de puntos
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
    //Estilo de contenedor de texto de puntaje
    ctnTextScore: {
        flex: 0.15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de texto de puntaje
    textScore: {
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        textAlign: 'center',
    },
    //Estilo de contenedor de medalla
    ctnMedal: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de medalla
    medal: {
        width: width * 0.35,
        height: width * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de texto motivacional
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
    //Estilo de texto de proxima categoria
    textNextCategory: {
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.Blue,
        textAlign: 'center',
    },
    //Estilo de contenedr de seccion de iconos
    ctnSectionIcons: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de iconos de seccion
    iconsSection: {
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.04,
    }
})
