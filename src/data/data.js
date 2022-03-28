//-----------------------------------------------------------------------------------------------
//-----------------------------------------Datos de App------------------------------------------
//-----------------------------------------------------------------------------------------------

//----------------------------------------Data >> Keys de almacenamiento-------------------------
export const keyAsync = {
    user: 'USER',
    languaje: 'LANGUAJE',
    review: 'REVIEW'
};
//----------------------------------------Data >> Paises-----------------------------------------
export const dataCountry = [
    { id: '13', label: '🇦🇷 Argentina' },
    { id: '25', label: '🇧🇿 Belice' },
    { id: '29', label: '🇧🇴 Bolivia' },
    { id: '33', label: '🇧🇷 Brasil' },
    { id: '42', label: '🇨🇦 Canadá' },
    { id: '46', label: '🇨🇱 Chile' },
    { id: '52', label: '🇨🇴 Colombia' },
    { id: '60', label: '🇨🇷 Costa Rica' },
    { id: '62', label: '🇨🇺 Cuba' },
    { id: '66', label: '🇪🇨 Ecuador' },
    { id: '73', label: '🇪🇸 España' },
    { id: '68', label: '🇸🇻 El Salvador' },
    { id: '75', label: '🇺🇸 Estados Unidos' },
    { id: '94', label: '🇬🇹 Guatemala' },
    { id: '102', label: '🇭🇳 Honduras' },
    { id: '146', label: '🇲🇽 México' },
    { id: '157', label: '🇳🇮 Nicaragua' },
    { id: '233', label: '🏳 Otro' },
    { id: '170', label: '🇵🇦 Panamá' },
    { id: '172', label: '🇵🇾 Paraguay' },
    { id: '173', label: '🇵🇪 Perú' },
    { id: '178', label: '🇵🇷 Puerto Rico' },
    { id: '65', label: '🇩🇲 República Dominicana' },
    { id: '209', label: '🇸🇷 Surinam' },
    { id: '229', label: '🇺🇾 Uruguay' },
    { id: '232', label: '🇻🇪 Venezuela' },
];
//----------------------------------Data >> Lenguajes de seleccion-------------------------------
export const languajeSelect = [
    { id: 'en', label: 'English  ', code: '1' },
    { id: 'es', label: 'Español  ', code: '3' },
    { id: 'pt', label: 'Portugués', code: '4' },
];
//----------------------------------Data >> Sector de trabajo------------------------------------
export const dataWorkSector = [
    { id: '1', label: 'Academia/Docente' },
    { id: '2', label: 'Agricultor/Productor Agrícola' },
    { id: '3', label: 'Asociación/Gremio Agrícola' },
    { id: '4', label: 'Consultoría' },
    { id: '5', label: 'Estudiante' },
    { id: '6', label: 'Gobierno o sector público' },
    { id: '8', label: 'Industria de agroquímicos' },
    { id: '9', label: 'ONGs' },
    { id: '10', label: 'Organismo Internacional' },
    { id: '11', label: 'Prensa' },
    { id: '12', label: 'Otro' },
];
//-----------------------------------------------------------------------------------------------
//--------------------------------Informacion >> Terminos y Condiciones--------------------------
//-----------------------------------------------------------------------------------------------
export const dataTermsAndConditions = {
    'body': 'La información contenida en la plataforma de cursos de CropLife Latin America tiene '
        + 'como objetivo actualizar y mejorar los conocimientos de los usuarios sobre distintas '
        + 'temáticas de protección de cultivos, biotecnología, manejo responsable de los plaguicidas '
        + 'y sostenibilidad agrícola. Esta información no tiene como fin ser, y no constituye asesoría '
        + 'técnica al lector o cualquier persona, física o jurídica. El usuario de este sitio web lo '
        + 'hace bajo su responsabilidad y debe acudir a su asesor técnico para su debida asesoría '
        + 'independiente e individualizada. '
        + '\n\nCropLife Latin America y sus agremiadas, tanto empresas como asociaciones, no se hacen '
        + 'responsables por pérdidas o daños que puedan surgir por el uso o interpretación de la '
        + 'información contenida en esta plataforma. '
        + '\n\nCropLife Latin America no es responsable del contenido de vínculos de internet que se '
        + 'citen este sitio web. '
        + '\n\nSobre los cursos virtuales disponibles en este sitio web, CropLife Latin America se reserva '
        + 'el derecho de actualizar y modificar sus contenidos. '
        + '\n\nToda la información contenida en este sitio web, incluidos los cursos virtuales, las '
        + 'infografías, los logos, imágenes y videos, no puede ser utilizada o difundida sin previa '
        + 'autorización de CropLife Latin America. '
        + '\n\nLos usuarios de este sitio web pueden solicitar información sobre los contenidos y el '
        + 'tratamiento de sus datos a info@croplifela.org y consultar la Política de Privacidad y la '
        + 'Política de Cookies. Junio 18 de 2018. '
}
//-----------------------------------------------------------------------------------------------
//--------------------------------Informacion >> Calendario--------------------------------------
//-----------------------------------------------------------------------------------------------
export const dataCalendar = {
    Months: [],
    MonthsShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dec.',],
    days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    daysShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
}
//-----------------------------------------------------------------------------------------------
//--------------------------------Informacion >> Preguntas Frecuentes----------------------------
//-----------------------------------------------------------------------------------------------
export const dataQuestion = [
    {
        id: '0',
        title: '¿ Los cursos tienen algún costo ?',
        body: 'La plataforma de cursos virtuales de CropLife Latin America ofrece cursos completamente '
            + 'gratuitos. Cualquier persona con interés en la agricultura sostenible puede acceder a ellos una '
            + 'vez se haya registrado en la plataforma.'
    },
    {
        id: '1',
        title: '¿ Hay horarios y fechas para acceder a los cursos ?',
        body: 'Los cursos se ajustan a la disponibilidad de tiempo de cada estudiante. Se pueden '
            + 'realizar en cualquier horario y fecha, ya que siempre están disponibles '
            + 'dentro de la plataforma.'
    },
    {
        id: '2',
        title: '¿ Puedo hacer el curso y/o guía en una sola sesión o en varias sesiones ?',
        body: 'Recuerda que puedes tomar los cursos Código Internacional para el Manejo de Plaguicidas '
            + 'de la FAO, Manejo Responsable de Envases Vacíos de Productos para la Protección de '
            + 'Cultivos CampoLimpio, Buenas Prácticas Agrícolas y Apícolas para la Salud de los '
            + 'Polinizadores e Introducción a la Biotecnología en varias etapas pues su contenido se '
            + 'divide en módulos diferentes.'
            + '\nLa guía sobre el Ciclo de Vida de los Productos para la Protección de Cultivos es muy '
            + 'corta por lo que no es necesario tomarla en varias sesiones a no ser que desees repasar '
            + 'el contenido. El Curso Virtual sobre Camas Biológicas BIODEP, a pesar de no constar '
            + 'de varios módulos, tiene bastante información y herramientas de repaso, razón por la '
            + 'cual puedes acceder al curso en diferentes sesiones si así lo deseas. Puedes ingresar '
            + 'nuevamente a la plataforma cada vez que lo desees con tu correo electrónico y contraseña.'
    },
    {
        id: '3',
        title: '¿ Por qué no aprobé el modulo ?',
        body: 'Para aprobar los módulos de los cursos: Código Internacional para el Manejo de Plaguicidas '
            + 'de la FAO, Manejo Responsable de Envases Vacíos de Productos para la Protección de Cultivos '
            + 'CampoLimpio, Buenas Prácticas Agrícolas y Apícolas para la Salud de los Polinizadores e '
            + '\nIntroducción a la Biotecnología, es necesario tener un porcentaje determinado de respuestas '
            + 'correctas, de lo contrario deberás revisar los contenidos y volver a presentar el examen.'
            + 'La guía sobre el Ciclo de Vida de los Productos para la Protección de Cultivos y el '
            + 'curso virtual sobre Camas Biológicas BIODEP constan de un solo módulo, con diferentes '
            + 'herramientas de repaso. Al ser una herramienta corta e informativa, se puede finalizar '
            + 'rápidamente.'
    },
    {
        id: '4',
        title: '¿ Qué pasa si no apruebo un módulo después de varios intentos ?',
        body: 'La recomendación es repasar los contenidos del módulo y apoyarse en las herramientas '
            + 'de repaso para volver a presentar el examen. No hay un límite de intentos, por lo que '
            + 'podrás presentar la evaluación una vez estés seguro de tus conocimientos. Si presentas '
            + 'múltiples errores, puedes comunicarte con nosotros.'
    },
    {
        id: '5',
        title: '¿ Qué son las autorevisiones ?',
        body: 'A lo largo de los módulos encontrarás un pequeño cuestionario que se denomina '
            + 'autorevisión. El objetivo de éstas es consolidar conceptos clave del curso y/o guía. '
            + '\nLas autorevisiones no tienen una calificación y no son obligatorias. Si decides no '
            + 'responderlas, el sistema automáticamente te mostrará en azul las respuestas correctas.'
    },
    {
        id: '6',
        title: '¿ Qué material de apoyo hay disponible para repasar los contenidos del curso y/o guía ?',
        body: 'Al desarrollar el contenido de los cursos encontrarás diferentes herramientas que te '
            + 'permitirán repasar los contenidos del curso. Estos incluyen autorevisiones, recursos '
            + 'externos, documentos PDF y resúmenes del contenido. Si quieres acceder a recursos '
            + 'adicionales, puedes acceder a nuestra página: www.croplifela.org'
    },
    {
        id: '7',
        title: '¿ Pueden emitir un certificado con el número de horas ?',
        body: 'Nuestros cursos están diseñados para que se puedan realizar ajustandose al horario '
            + 'y disponibilidad de tiempo de cada usuario. Es por esta razón que no emitimos un '
            + 'certificado con la cantidad de horas, ya que este tiempo es diferente para cada '
            + 'estudiante.'
    },
    {
        id: '8',
        title: '¿ Por quién es avalado el certificado ?',
        body: 'Los cursos virtuales son avalados por CropLife Latin America y promovidos por '
            + 'asociaciones en cada país. CropLife Latin America como organización gremial '
            + 'internacional promueve estrictos parámetros de ética y responsabilidad social '
            + 'dirigidos a respetar la salud pública y al medio ambiente. Por tal motivo, el espacio '
            + 'de cursos virtuales está creado con el objetivo de promover un manejo responsable de '
            + 'las tecnologías para la protección de cultivos y las buenas prácticas agrícolas.'
    },
]





