const linksTypes = {
  lodash: func => `http://devdocs.io/lodash~4/index#${func}`,
  ramda: func => `http://devdocs.io/ramda/index#${func}`,
  Object: func => `http://devdocs.io/javascript/global_objects/object/${func.toLowerCase()}`,
  Array: func => `http://devdocs.io/javascript/global_objects/array/${func.toLowerCase()}`,
  arr: func => `http://devdocs.io/javascript/global_objects/array/${func.toLowerCase()}`
}

const linkFor = (object, func) => {
  return linksTypes[object] && linksTypes[object](func)
}

export default code => (
  code.replace(
    /(\w+)(<span class="token punctuation" >\.<\/span><span class="token function" >)(\w+)/,
    (pattern, object, separator, func) => {
      const link = linkFor(object, func)
      return link ?
          [ object, separator, `<a href="${link}" target="_blank">${func}</a>` ].join('') :
          [ object, separator, func ].join('')
    })
)
