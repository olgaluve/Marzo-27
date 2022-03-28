//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> MyTest----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardMyTest from '../components/MyCardMyTest';
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { MyTestStyles as styles } from '../styles/styles';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const MyTestScreen = props => {
    const { navigation, route } = props;
    const { params } = route;
    const { data } = params;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
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
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:misTest')}
                route={'ProfileHome'}
                navigation={navigation} />
            <View style={[styles.ctnList]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.ctnScroll]}>
                    <Label text={t('myTest:title')} />
                    <MySpace ctnSpace={{ width, height: height * 0.025 }} />
                    {
                        data.map(data =>
                            <MyCardMyTest
                                key={data.id + '_test'}
                                data={data} />
                        )
                    }
                </ScrollView>
            </View>
        </Wallpaper>
    );
};
export default MyTestScreen;
