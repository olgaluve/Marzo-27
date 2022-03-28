//---------------------------------------------------------------------------------------------
//-----------------------Archivo de componente: Terminos y Condiciones-------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
//--------------------------------------------Estilos------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
//---------------------------------------------Data----------------------------------------------
import { dataTermsAndConditions } from '../data/data';
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyTermsAndConditions(props) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnTerms]}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}>
                <Text style={[styles.textTerms]}>{dataTermsAndConditions.body}</Text>
            </ScrollView>
        </View>
    )
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de terminos y condicones
    ctnTerms: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    //Estilo de texto de terminos y condiciones
    textTerms: {
        fontFamily: letter.Text_2,
        fontSize: 16,
        color: colors.Black,
        textAlign: 'left'
    },
})

