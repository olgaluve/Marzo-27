
//---------------------------------------------------------------------------------------------
//-----------------------------------Funciones >> Escalamiento---------------------------------
//---------------------------------------------------------------------------------------------
//Nota >> Tener encuenta que React Native no trabaja en pixeles sino en densidad de pixeles dp.
//          Para efectos de documentacion remitirse al enlace:
//          >> https://medium.com/soluto-engineering/size-matters-5aeeb462900a
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { Dimensions } from 'react-native';
//----------------------------------Declaracion >> Constantes----------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla.
//Tamaños de referencia >> Basados en dispositivo estandar de ~5.
const guidelineBaseWidth = 350;//Linea Guia >> Ancho de base.
const guidelineBaseHeight = 680;//Linea Guia >> Alto de base.
//---------------------------------------------------------------------------------------------
//---------------------------Declaracion >> Funciones de Escalamiento--------------------------
//---------------------------------------------------------------------------------------------
const scale = size => width / guidelineBaseWidth * size;//Factor de escalamiento
const verticalScale = size => height / guidelineBaseHeight * size;//Escalamiento vertical
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;//Escalamiento Moderado

export { scale, verticalScale, moderateScale };