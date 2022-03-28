//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyPodcastButtons--------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
//--------------------------------------Librerias Adicionales----------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const SIZE_ICON_BUTTONS = width < 350 ? moderateScale(12) : moderateScale(30);
const SIZE_ICON_BUTTONS_PLAY = width < 350 ? moderateScale(12) : moderateScale(25);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyPodcastButtons = props => {
    const { container, onLess, onMore, onPrv, onNext, onPlay } = props;
    const { backgroundColor, color } = props;
    const playbackState = usePlaybackState();
    const BUTTONS = [
        {
            id: 'less',
            icon: 'rewind-10',
            onPress: onLess,
        },
        {
            id: 'prev',
            icon: 'step-backward',
            onPress: onPrv,
        },
        {
            id: 'play',
            icon: 'play',
            onPress: onPlay
        },
        {
            id: 'next',
            icon: 'step-forward',
            onPress: onNext,
        },
        {
            id: 'more',
            icon: 'fast-forward-10',
            onPress: onMore,
        }
    ];
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Componente >> IconButtonPlay------------------------------
    //Descripcion : Renderiza el icono de boton de play, de acuerdo al estado del reprodutor.
    const IconButtonPlay = props => {
        const { color } = props;
        let iconNanme = 'play';
        if (playbackState === 'playing' || playbackState === 3)
            iconNanme = "pause";
        return <Icon color={color} name={iconNanme} size={SIZE_ICON_BUTTONS_PLAY} />;

    };
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={container}>
            {
                BUTTONS.map(data => {
                    if (data.id !== 'play')
                        return (
                            <TouchableOpacity
                                key={data.id}
                                style={[styles.buttons]}
                                onPress={data.onPress}>
                                <Icon
                                    color={backgroundColor}
                                    name={data.icon}
                                    size={SIZE_ICON_BUTTONS} />
                            </TouchableOpacity>
                        );
                    return (
                        <TouchableOpacity
                            key={data.id}
                            style={[styles.buttonPlay, { backgroundColor: backgroundColor }]}
                            onPress={data.onPress}>
                            <IconButtonPlay color={color} />
                        </TouchableOpacity>
                    );

                }
                )
            }
        </View>
    );
}
export default MyPodcastButtons;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Botones
    buttons: {
        flex: 0.18,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Botton PLay
    buttonPlay: {
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DarkBlue,
    }
});
