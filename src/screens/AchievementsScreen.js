//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla de Logueo----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useLayoutEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
//-----------------------------------Librerias >> Adicionales----------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MySpace from '../components/MySpace';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MySectionScore from '../components/MySectionScore';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
//------------------------------------------Estilos--------------------------------------------
import { AchievementsStyles } from '../styles/styles';
const AchievementsScreen = (props) => {
  const { navigation } = props;
  //---------------------------------------------------------------------------------------------
  //----------------------------Declaracion >> Objeto de traduccion------------------------------
  //---------------------------------------------------------------------------------------------
  const { t, i18n } = useTranslation();//Objeto de traduccion
  //---------------------------------------------------------------------------------------------
  //----------------------------Declaracion >> Estados de App------------------------------------
  //---------------------------------------------------------------------------------------------
  const [score, setScore] = useState(0);//Estado >> Total de puntos
  const [level, setLevel] = useState('');//Estado >> Level User
  const [nextLevel, setNextLevel] = useState('');//Estado >> Next Level User
  const [pointsMissing, setPointsMissing] = useState(0);//Estado >> Puntos Faltantes
  //---------------------------------------------------------------------------------------------
  //----------------------------Declaracion >> Componentes App-----------------------------------
  //---------------------------------------------------------------------------------------------
  //---------------------------Componente >> Seccion Informativa---------------------------------
  //Descripcion : Renderiza la informacion correspondiente a la categoria del usuario, deacuerdo
  //              a su puntaje actual.
  const SectionLevel = ({ title, level }) => {
    return (
      <View style={[AchievementsStyles.ctnSectionLevel]}>
        <View style={[AchievementsStyles.ctnTextLevel]}>
          <Text style={[AchievementsStyles.textMsMLevel]}>
            {t('logros:' + title)}
          </Text>
        </View>
        <View style={[AchievementsStyles.ctnTextLevel, { flex: 0.4, }]}>
          <Text style={[AchievementsStyles.textLevel]}>
            {t('logros:' + level)}
          </Text>
        </View>
      </View>
    );
  }
  //---------------------------------------------------------------------------------------------
  //----------------------------Declaracion >> Effects de App------------------------------------
  //---------------------------------------------------------------------------------------------
  //-------------------------Effect >> Obtencion de Id de usuario--------------------------------
  useLayoutEffect(() => {
    let logros = props.user.data.logros;
    let keys = Object.keys(logros);//Obtencion Array Keys
    let verify = keys.length > 0;//Condicion de existencia
    if (verify) {
      setScore(logros.total);
      setLevel(logros.labelLevel);
      setNextLevel(logros.labelNextLabel);
      setPointsMissing(logros.missingPoints);
    }
  }, [props.user.data.logros]);
  //---------------------------------------------------------------------------------------------
  //----------------------------------Diseño de cuerpo de App------------------------------------
  //---------------------------------------------------------------------------------------------
  return (
    <Wallpaper styleWallpaper={[{ justifyContent: 'flex-start' }]}>
      <MyDrawMenuButton
        title={t('logros:title')}
        navigation={props.navigation}
        type={true}
        route={'ProfileHome'} />
      {/*<MyDrawMenuButton
        title={t('logros:title')}
      navigation={navigation} />*/}
      <View style={[AchievementsStyles.ctnAchievements]}>
        <ScrollView
          contentContainerStyle={[AchievementsStyles.scrollSection]}
          showsHorizontalScrollIndicator={false}>
          <MySpace ctnSpace={{ width: '100%', flex: 0.055 }} />
          <SectionLevel
            title={'categoria'}
            level={level} />
          <SectionLevel
            title={'nextCategoria'}
            level={nextLevel} />
          <MySpace ctnSpace={{ width: '100%', flex: 0.055 }} />
          <MySectionScore
            score={score}
            level={level}
            nextLevel={nextLevel}
            pointsMissing={pointsMissing} />
        </ScrollView>
      </View>
    </Wallpaper>
  );
}
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Instancia de Estados almacenados en Store--------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapStateToProps = state => {
  //Instancia de state
  //IdState : State
  //  >> State : Es el Id dado al reducer en el archivo reducers.js.
  //      Ruta Relativa >> app\reducers\reducers.js
  return {
    user: state.user,
  }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps)(AchievementsScreen);
