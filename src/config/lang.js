
let defaultLang = {

  app: {},

  removeFormat: {title: 'Remove format'},

  bold: {title: 'Bold'},
  italic: {title: 'Italic'},
  underline: {title: 'Underline'},
  strikeThrough: {title: 'Strike through'},

  superscript: {title: 'Superscript'},
  subscript: {title: 'Subscript'},
  indent: {title: 'Indent'},
  outdent: {title: 'Outdent'},

  justifyLeft: {title: 'Justify left'},
  justifyCenter: {title: 'Justify center'},
  justifyRight: {title: 'Justify right'},
  justifyFull: {title: 'Justify full'},

  insertOrderedList: {title: 'Insert ordered list'},
  insertUnorderedList: {title: 'Insert unordered list'},

  foreColor: {
    title: 'Text color',
    ok: 'ok',
    colorCode: 'Color code',
    invalidColorCodeMsg: 'Please enter the correct color code'
  },
  backColor: {
    title: 'Background color',
    ok: 'ok',
    colorCode: 'Color code',
    invalidColorCodeMsg: 'Please enter the correct color code'
  },
  fontName: {},
  fontSize: {},
  code: {},
  element: {},
  design: {
    ieMsg: 'You must select a text to use this feature in IE browser'
  },
  link: {
    title: 'Add link',
    ok: 'OK'
  },
  unLink: {
    title: 'unlink'
  },
  markdown: {
    title: 'markdown'
  },
  picture: {
    title: 'Insertar archivo',
    ok: 'OK',
    cancel: 'Cancelar',
    invalidFile: 'Ningún archivo seleccionado',
    maxFileZise:'Archivo muy pesado, tamaño máximo: '
  },
  sourceCode: {
    title: 'Source Code'
  },
  fullscreen: {
    title: 'Fullscreen'
  },
  table: {title: 'Table'},
  undo: {title: 'Undo'},
  redo: {title: 'Redo'}
}

let lang = JSON.parse(JSON.stringify(defaultLang))

export default {
  setLang (data) {
    data && (lang = data)
  },
  getLang (name) {
    return name ? lang[name] : lang
  },
  getDefaultLang () {
    return defaultLang
  }
}
