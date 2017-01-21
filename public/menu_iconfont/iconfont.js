;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-deji" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M853.150332 473.130737 369.683179 473.130737c-22.230304 0-40.289612 18.049075-40.289612 40.288588 0 22.239514 18.059308 40.289612 40.289612 40.289612l483.467153 0c22.229281 0 40.288588-18.050098 40.288588-40.289612C893.43892 491.179812 875.378589 473.130737 853.150332 473.130737M369.683179 311.974337l483.467153 0c22.229281 0 40.288588-18.049075 40.288588-40.288588 0-22.239514-18.059308-40.289612-40.288588-40.289612L369.683179 231.396137c-22.230304 0-40.289612 18.049075-40.289612 40.289612C329.393567 293.925263 347.452875 311.974337 369.683179 311.974337M853.150332 714.863291 369.683179 714.863291c-22.230304 0-40.289612 18.050098-40.289612 40.289612 0 22.23849 18.059308 40.288588 40.289612 40.288588l483.467153 0c22.229281 0 40.288588-18.050098 40.288588-40.288588C893.43892 732.913389 875.378589 714.863291 853.150332 714.863291M208.526779 231.396137l-40.288588 0c-22.230304 0-40.289612 18.049075-40.289612 40.289612 0 22.239514 18.059308 40.288588 40.289612 40.288588l40.288588 0c22.230304 0 40.289612-18.049075 40.289612-40.288588C248.81639 249.445212 230.757083 231.396137 208.526779 231.396137M208.526779 473.130737l-40.288588 0c-22.230304 0-40.289612 18.049075-40.289612 40.288588 0 22.239514 18.059308 40.289612 40.289612 40.289612l40.288588 0c22.230304 0 40.289612-18.050098 40.289612-40.289612C248.81639 491.179812 230.757083 473.130737 208.526779 473.130737M208.526779 714.863291l-40.288588 0c-22.230304 0-40.289612 18.050098-40.289612 40.289612 0 22.23849 18.059308 40.288588 40.289612 40.288588l40.288588 0c22.230304 0 40.289612-18.050098 40.289612-40.288588C248.81639 732.913389 230.757083 714.863291 208.526779 714.863291"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
