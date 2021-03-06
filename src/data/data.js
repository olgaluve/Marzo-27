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
    { id: '13', label: 'ð¦ð· Argentina' },
    { id: '25', label: 'ð§ð¿ Belice' },
    { id: '29', label: 'ð§ð´ Bolivia' },
    { id: '33', label: 'ð§ð· Brasil' },
    { id: '42', label: 'ð¨ð¦ CanadÃ¡' },
    { id: '46', label: 'ð¨ð± Chile' },
    { id: '52', label: 'ð¨ð´ Colombia' },
    { id: '60', label: 'ð¨ð· Costa Rica' },
    { id: '62', label: 'ð¨ðº Cuba' },
    { id: '66', label: 'ðªð¨ Ecuador' },
    { id: '73', label: 'ðªð¸ EspaÃ±a' },
    { id: '68', label: 'ð¸ð» El Salvador' },
    { id: '75', label: 'ðºð¸ Estados Unidos' },
    { id: '94', label: 'ð¬ð¹ Guatemala' },
    { id: '102', label: 'ð­ð³ Honduras' },
    { id: '146', label: 'ð²ð½ MÃ©xico' },
    { id: '157', label: 'ð³ð® Nicaragua' },
    { id: '233', label: 'ð³ Otro' },
    { id: '170', label: 'ðµð¦ PanamÃ¡' },
    { id: '172', label: 'ðµð¾ Paraguay' },
    { id: '173', label: 'ðµðª PerÃº' },
    { id: '178', label: 'ðµð· Puerto Rico' },
    { id: '65', label: 'ð©ð² RepÃºblica Dominicana' },
    { id: '209', label: 'ð¸ð· Surinam' },
    { id: '229', label: 'ðºð¾ Uruguay' },
    { id: '232', label: 'ð»ðª Venezuela' },
];
//----------------------------------Data >> Lenguajes de seleccion-------------------------------
export const languajeSelect = [
    { id: 'en', label: 'English  ', code: '1' },
    { id: 'es', label: 'EspaÃ±ol  ', code: '3' },
    { id: 'pt', label: 'PortuguÃ©s', code: '4' },
];
//----------------------------------Data >> Sector de trabajo------------------------------------
export const dataWorkSector = [
    { id: '1', label: 'Academia/Docente' },
    { id: '2', label: 'Agricultor/Productor AgrÃ­cola' },
    { id: '3', label: 'AsociaciÃ³n/Gremio AgrÃ­cola' },
    { id: '4', label: 'ConsultorÃ­a' },
    { id: '5', label: 'Estudiante' },
    { id: '6', label: 'Gobierno o sector pÃºblico' },
    { id: '8', label: 'Industria de agroquÃ­micos' },
    { id: '9', label: 'ONGs' },
    { id: '10', label: 'Organismo Internacional' },
    { id: '11', label: 'Prensa' },
    { id: '12', label: 'Otro' },
];
//-----------------------------------------------------------------------------------------------
//--------------------------------Informacion >> Terminos y Condiciones--------------------------
//-----------------------------------------------------------------------------------------------
export const dataTermsAndConditions = {
    'body': 'La informaciÃ³n contenida en la plataforma de cursos de CropLife Latin America tiene '
        + 'como objetivo actualizar y mejorar los conocimientos de los usuarios sobre distintas '
        + 'temÃ¡ticas de protecciÃ³n de cultivos, biotecnologÃ­a, manejo responsable de los plaguicidas '
        + 'y sostenibilidad agrÃ­cola. Esta informaciÃ³n no tiene como fin ser, y no constituye asesorÃ­a '
        + 'tÃ©cnica al lector o cualquier persona, fÃ­sica o jurÃ­dica. El usuario de este sitio web lo '
        + 'hace bajo su responsabilidad y debe acudir a su asesor tÃ©cnico para su debida asesorÃ­a '
        + 'independiente e individualizada. '
        + '\n\nCropLife Latin America y sus agremiadas, tanto empresas como asociaciones, no se hacen '
        + 'responsables por pÃ©rdidas o daÃ±os que puedan surgir por el uso o interpretaciÃ³n de la '
        + 'informaciÃ³n contenida en esta plataforma. '
        + '\n\nCropLife Latin America no es responsable del contenido de vÃ­nculos de internet que se '
        + 'citen este sitio web. '
        + '\n\nSobre los cursos virtuales disponibles en este sitio web, CropLife Latin America se reserva '
        + 'el derecho de actualizar y modificar sus contenidos. '
        + '\n\nToda la informaciÃ³n contenida en este sitio web, incluidos los cursos virtuales, las '
        + 'infografÃ­as, los logos, imÃ¡genes y videos, no puede ser utilizada o difundida sin previa '
        + 'autorizaciÃ³n de CropLife Latin America. '
        + '\n\nLos usuarios de este sitio web pueden solicitar informaciÃ³n sobre los contenidos y el '
        + 'tratamiento de sus datos a info@croplifela.org y consultar la PolÃ­tica de Privacidad y la '
        + 'PolÃ­tica de Cookies. Junio 18 de 2018. '
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
        title: 'Â¿ Los cursos tienen algÃºn costo ?',
        body: 'La plataforma de cursos virtuales de CropLife Latin America ofrece cursos completamente '
            + 'gratuitos. Cualquier persona con interÃ©s en la agricultura sostenible puede acceder a ellos una '
            + 'vez se haya registrado en la plataforma.'
    },
    {
        id: '1',
        title: 'Â¿ Hay horarios y fechas para acceder a los cursos ?',
        body: 'Los cursos se ajustan a la disponibilidad de tiempo de cada estudiante. Se pueden '
            + 'realizar en cualquier horario y fecha, ya que siempre estÃ¡n disponibles '
            + 'dentro de la plataforma.'
    },
    {
        id: '2',
        title: 'Â¿ Puedo hacer el curso y/o guÃ­a en una sola sesiÃ³n o en varias sesiones ?',
        body: 'Recuerda que puedes tomar los cursos CÃ³digo Internacional para el Manejo de Plaguicidas '
            + 'de la FAO, Manejo Responsable de Envases VacÃ­os de Productos para la ProtecciÃ³n de '
            + 'Cultivos CampoLimpio, Buenas PrÃ¡cticas AgrÃ­colas y ApÃ­colas para la Salud de los '
            + 'Polinizadores e IntroducciÃ³n a la BiotecnologÃ­a en varias etapas pues su contenido se '
            + 'divide en mÃ³dulos diferentes.'
            + '\nLa guÃ­a sobre el Ciclo de Vida de los Productos para la ProtecciÃ³n de Cultivos es muy '
            + 'corta por lo que no es necesario tomarla en varias sesiones a no ser que desees repasar '
            + 'el contenido. El Curso Virtual sobre Camas BiolÃ³gicas BIODEP, a pesar de no constar '
            + 'de varios mÃ³dulos, tiene bastante informaciÃ³n y herramientas de repaso, razÃ³n por la '
            + 'cual puedes acceder al curso en diferentes sesiones si asÃ­ lo deseas. Puedes ingresar '
            + 'nuevamente a la plataforma cada vez que lo desees con tu correo electrÃ³nico y contraseÃ±a.'
    },
    {
        id: '3',
        title: 'Â¿ Por quÃ© no aprobÃ© el modulo ?',
        body: 'Para aprobar los mÃ³dulos de los cursos: CÃ³digo Internacional para el Manejo de Plaguicidas '
            + 'de la FAO, Manejo Responsable de Envases VacÃ­os de Productos para la ProtecciÃ³n de Cultivos '
            + 'CampoLimpio, Buenas PrÃ¡cticas AgrÃ­colas y ApÃ­colas para la Salud de los Polinizadores e '
            + '\nIntroducciÃ³n a la BiotecnologÃ­a, es necesario tener un porcentaje determinado de respuestas '
            + 'correctas, de lo contrario deberÃ¡s revisar los contenidos y volver a presentar el examen.'
            + 'La guÃ­a sobre el Ciclo de Vida de los Productos para la ProtecciÃ³n de Cultivos y el '
            + 'curso virtual sobre Camas BiolÃ³gicas BIODEP constan de un solo mÃ³dulo, con diferentes '
            + 'herramientas de repaso. Al ser una herramienta corta e informativa, se puede finalizar '
            + 'rÃ¡pidamente.'
    },
    {
        id: '4',
        title: 'Â¿ QuÃ© pasa si no apruebo un mÃ³dulo despuÃ©s de varios intentos ?',
        body: 'La recomendaciÃ³n es repasar los contenidos del mÃ³dulo y apoyarse en las herramientas '
            + 'de repaso para volver a presentar el examen. No hay un lÃ­mite de intentos, por lo que '
            + 'podrÃ¡s presentar la evaluaciÃ³n una vez estÃ©s seguro de tus conocimientos. Si presentas '
            + 'mÃºltiples errores, puedes comunicarte con nosotros.'
    },
    {
        id: '5',
        title: 'Â¿ QuÃ© son las autorevisiones ?',
        body: 'A lo largo de los mÃ³dulos encontrarÃ¡s un pequeÃ±o cuestionario que se denomina '
            + 'autorevisiÃ³n. El objetivo de Ã©stas es consolidar conceptos clave del curso y/o guÃ­a. '
            + '\nLas autorevisiones no tienen una calificaciÃ³n y no son obligatorias. Si decides no '
            + 'responderlas, el sistema automÃ¡ticamente te mostrarÃ¡ en azul las respuestas correctas.'
    },
    {
        id: '6',
        title: 'Â¿ QuÃ© material de apoyo hay disponible para repasar los contenidos del curso y/o guÃ­a ?',
        body: 'Al desarrollar el contenido de los cursos encontrarÃ¡s diferentes herramientas que te '
            + 'permitirÃ¡n repasar los contenidos del curso. Estos incluyen autorevisiones, recursos '
            + 'externos, documentos PDF y resÃºmenes del contenido. Si quieres acceder a recursos '
            + 'adicionales, puedes acceder a nuestra pÃ¡gina: www.croplifela.org'
    },
    {
        id: '7',
        title: 'Â¿ Pueden emitir un certificado con el nÃºmero de horas ?',
        body: 'Nuestros cursos estÃ¡n diseÃ±ados para que se puedan realizar ajustandose al horario '
            + 'y disponibilidad de tiempo de cada usuario. Es por esta razÃ³n que no emitimos un '
            + 'certificado con la cantidad de horas, ya que este tiempo es diferente para cada '
            + 'estudiante.'
    },
    {
        id: '8',
        title: 'Â¿ Por quiÃ©n es avalado el certificado ?',
        body: 'Los cursos virtuales son avalados por CropLife Latin America y promovidos por '
            + 'asociaciones en cada paÃ­s. CropLife Latin America como organizaciÃ³n gremial '
            + 'internacional promueve estrictos parÃ¡metros de Ã©tica y responsabilidad social '
            + 'dirigidos a respetar la salud pÃºblica y al medio ambiente. Por tal motivo, el espacio '
            + 'de cursos virtuales estÃ¡ creado con el objetivo de promover un manejo responsable de '
            + 'las tecnologÃ­as para la protecciÃ³n de cultivos y las buenas prÃ¡cticas agrÃ­colas.'
    },
]





