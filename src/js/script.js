var page
var txtSearch
var request = new XMLHttpRequest()


window.onload = getValues()

function getValues(){
  var url = window.location.href
  var res = url.split('?')
  var param = res[1].split('=')
  
  if(param[0] === "page") {
    var param = res[1].split('&')
    var getPage = param[0].split('=')
    page = getPage[1]
  }
  
  if(param[0] === "txtSearch"){
    
    var param = res[1].split('&')
    var getTxt = param[0].split('=')
    txtSearch = getTxt[1]
    
    var param = res[2].split('&')
    var getPage = param[0].split('=')
    page = getPage[1]
  }
}

function init(){
  if( !txtSearch && page ){
    document.location.href = '/?page=1'
  } else {
    document.location.href = `/?txtSearch=${txtSearch}?page=1`    
  }

}
var pageData = page * 10 - 10

function onSearch(){
  document.getElementById('txt__search').addEventListener('keyup', function(e){
    var key = e.which || e.keyCode
    
    if(key == 13){
      document.location.replace(`?txtSearch=${ txtSearch }?page=0`)
    }
  })
}
onSearch()

if( !txtSearch ){
  //console.log('data')
  var apiUrl = `https://kitsu.io/api/edge/characters?page[limit]=10&page[offset]=${ pageData }`
} else {
  //console.log('data_paginado')
  var apiUrl = `https://kitsu.io/api/edge/characters?filter[name]=${ txtSearch }?page[limit]=10&page[offset]=${ pageData }`
}

request.open('GET', apiUrl );

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    const results = JSON.parse(this.responseText)

    const characters = results.data
    
    characters.forEach( character => {
      const itemslista = document.querySelector('.items__lista')

      const item = document.createElement('div')
      item.setAttribute('class', 'item')

      const itemImg = document.createElement('div')
      itemImg.setAttribute('class', 'item__img')

      const img = document.createElement('img')
      img.setAttribute('src', `${character.attributes.image.original}`)

      const nome = document.createElement('div')
      nome.setAttribute('class', 'item__nome')
      nome.textContent = character.attributes.name

      const detalhes = document.createElement('div')
      detalhes.setAttribute('class', 'item__detalhe')

      const series = document.createElement('div')
      series.setAttribute('class', 'item__detalhe-series')
      series.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rerum, magnam natus vel eaque labore nam.'

      const eventos = document.createElement('div')
      eventos.setAttribute('class', 'item__detalhe-eventos')
      
      itemslista.appendChild(item)
      item.appendChild(itemImg)
      itemImg.appendChild(img)
      item.appendChild(nome)
      item.appendChild(detalhes)
      detalhes.appendChild(series)
      detalhes.appendChild(eventos)
    })  
  }
}

request.send()

if( page <= 1 ){
  document.querySelector('.btn__prev').style.display = 'none';
}

if(page > 0){
  for (let index = 1; index < 4; index++) {
    const pages = document.querySelector('.pages')
    const linkPage = document.createElement('a')
   
    linkPage.setAttribute('class', 'pag__num')
    if(!txtSearch){
      linkPage.setAttribute('href', `?page=${index}`)
    }else {
      linkPage.setAttribute('href', `?txtSearch=${ txtSearch }?page=${ index }`)  
    }
    linkPage.textContent =`${index}`

    if( page === `${index}`){
      linkPage.setAttribute('class', 'pag__num active')
    }
    pages.appendChild(linkPage)
  }


}


