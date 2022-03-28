//------------------------------------------------------------------------------------------
//-----------------------Comandos de Instalacion de React-Native----------------------------
//------------------------------------------------------------------------------------------
npx react-native init AwesomeProject >> Comando para crear un nuevo proyecto
npx react-native init AwesomeProject --version 0.63.0 >> Comando para crear un nuevo proyecto con version X.XX.X
npx react-native link >> Comando para link de archivos >> Ejecutar despues de instalacion de paquetes
npx react-native run-android >> Comando para correr en plataformas Androids
//------------------------------------------------------------------------------------------
//----------------------------------Generacion de Apk---------------------------------------
//------------------------------------------------------------------------------------------
1.Abrir cmd modo administrador
2.Ejecutar comando : cd C:\Program Files\Java\jdk1.8.0_60\bin
3.Ejecutar comando:
	keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
	>>Contraseña : Almacen de claves : campolinea4567
	>>Nombre y Apellido: daniela ramirez
	>>Nombre Unidad de Organizacion : campo linea
	>>Nombre Organizacion : campo linea
	>>Ciudad: sogamoso
	>>Provincia: boyaca
	>>Nombre de pais: co
	>>Contraseña de clave para <my-key-alias>
	>>El anterior comando genera archivo con nombre : my-upload-key.keystore
	>> Copiar en el proyecto en la ruta : \android\app
4.Configuración de variables Gradle
	>>Editar archivo gradle.properties en la ruta relativa : \android
	>>Agregar las siguientes lineas:
	#---------------------------------------------------------------------------------------------
	#-----------------------------------------Generacion de app-----------------------------------
	#---------------------------------------------------------------------------------------------
	MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
	MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
	MYAPP_UPLOAD_STORE_PASSWORD=campolinea4567
	MYAPP_UPLOAD_KEY_PASSWORD=campolinea4567
5.Editar archivo android/app/build.gradle
	>>Tipo de procedimiento:Agregar configuración de firma a la configuración de Gradle de la aplicación
	>>Agregar las siguientes lineas
	signingConfigs {
        ...
        //----------------------------------------------------------------------------------
        //--------------------------Generacion de App---------------------------------------
        //----------------------------------------------------------------------------------
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
        //----------------------------------------------------------------------------------
    }
	buildTypes {
        ...
        release {
            ...
            // Generacion de apk
            signingConfig signingConfigs.release
        }
    }
6.Generar apk
	>>Para generar apk para google correr las siguientes lineas de comandos en cmd
		>>cd  android
		>>gradlew bundleRelease (Windowns)
		>>./gradlew bundleRelease (Macios/Linux)
		>>Ruta de archivo:
			android/app/build/outputs/bundle/release/app.aab
	>>Para generar apk para compartir con dispositivos android
		>>cd  android
		>>gradlew assembleRelease
>>Link Lanzamiento Ios :
	>>https://reactnative.dev/docs/publishing-to-app-store
>>Link Lanzamiento Android :
	>>https://reactnative.dev/docs/signed-apk-android

>>https://www.youtube.com/watch?v=tg6YcD52jNA&ab_channel=MoureDevbyBraisMoure

https://youtu.be/tg6YcD52jNA

7. Comndo de genereacion de app para ios
>> cd ios
>> fastlane release version:patch



>>Codificacion de idiomas para generar enlace. Basados en normativa ISO 639-1
	>> en >> Ingles
	>> es >> Español
	>> pt >> Portugues



>>Comandos a ejecutar en proxima actualizacion
	>>npm uninstall react-native-dropdown-picker --save
	>>npm uninstall react-native-picker-select --save
	>>npm uninstall native-base --save
	>>npm uninstall @react-native-community/picker --save
	>>npm uninstall react-native-keyboard-avoiding-scroll-view --save
	>>npm uninstall eslint-plugin-react-hooks --save
	>>npm uninstall react-native-simple-dialogs --save
	>>npm uninstall react-native-tab-view --save
	>>npm uninstall @react-navigation/bottom-tabs  --save
	>>npm uninstall jetifier  --save
	>>npm uninstall moment  --save

>>Pasos para publicar una App en AppStore
	>>Tener un ID de apple
		>>Totalmente gratuito
		>>Enlace : https://appleid.apple.com/
	>>Ser parte del programa de desarrolladores de Apple
		>>Costo aproximado 100 dolares anuales
		>>Enlace : https://developer.apple.com/programs/


>>Contraseñas croplife

>>Contraseña gmail:  CropL1feLa_2021$ (que da acceso a la cuenta de desarrollador de google)
>>Usuario Cropkife : cr00plif3
>>Contraseña FTP y cpanel croplife: S2/olga1U0+20*pRv-+V
>>Contraseña FTP y Cpanel cursos:
	Server		>> 107.180.88.180
	User 		>> qrs0scr00p
	Password	>> lMSo=I+;K}zuyj*-l$%
>>Contraseña joomla: olgalu user contraseña: dosmil07$%-
>>Credenciales admin API :
	User 		>> admin@gmail.com
	Password	>> admin

>>SHA_1
	30:36:E6:D6:1C:19:4B:AC:49:0A:05:32:57:B6:03:3F:D7:FE:2F:CD

>>Ojo >> Para instalar firebase en ios, importar la bilbioteca antes de la declaracion ' #ifdef FB_SONARKIT_ENABLED '
		de la siguiente manera :

	#import <Firebase.h>
	#ifdef FB_SONARKIT_ENABLED

	700371100 >> id asociado




//Vinculacion Facebook
1.Ejecutar comando
	keytool -exportcert -alias my-key-alias -keystore C:/Users/nicol_000/Desktop/VsCode/React_Native/Repositorios/RN_CroplifeMovil/android/app/my-upload-key.keystore | PATH_TO_OPENSSL_LIBRARY\bin\openssl sha1 -binary | PATH_TO_OPENSSL_LIBRARY\bin\openssl base64
	keytool -exportcert -alias my-key-alias -keystore android/app/my-upload-key.keystore | openssl sha1 -binary | openssl base64
	keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore | openssl sha1 -binary | openssl base64



keytool -exportcert -alias my-key-alias -keystore android/app/my-upload-key.keystore | PATH_TO_OPENSSL_LIBRARY\bin\openssl sha1 -binary | PATH_TO_OPENSSL_LIBRARY\bin\openssl base64



Hashes de clave >> MDbm1hwZS6xJCgUyV7YDP9f+L80=
nombre de paquete >> App Android >> com.cursos_croplifela
nombre de clase >> MainApplication
id Cuenta prublicitaria >> 2265840386981164
id app facebook >> 749669785199481

clave firebase Notifications
>> Nombre >> FirebasePushNotification
>> id >> 82HWF69XC4
nombre perfil de aprovisionamiento >> profileNotifications





>> Comandos SQL
/*
CREATE TABLE user_notification (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
idUser INT(11) NOT NULL,
title VARCHAR(256) NOT NULL DEFAULT '',
body VARCHAR(1024) NOT NULL DEFAULT '',
urlImage VARCHAR(1024) NOT NULL DEFAULT '',
actionUser BOOLEAN DEFAULT 0,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `user_notification`
ADD CONSTRAINT fk_idUserUserNotification
FOREIGN KEY (idUser) REFERENCES cur_users(id);
*/



https://app.cursos.croplifela.org/admin/login/

username : admin@gmail.com
password : admin



























