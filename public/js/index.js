
ymaps = window.ymaps
let myMap
ymaps.ready(init)
function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 3,
  }, {
    searchControlProvider: 'yandex#search',
  })

  const $getcityform = document.forms.getcityform
  $getcityform?.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    const city = ev.target.city.value
    document.querySelector('.lenin').style.left = '-25px'
    document.querySelector('.lenin').style.top = '-25px'
    document.querySelector('.lenin').style.transition = '0.3s ease'
    setTimeout(() => {
      document.querySelector('.lenin').style.left = '-140px'
      document.querySelector('.lenin').style.top = '-140px'
      document.querySelector('.lenin').style.transition = '0.3s ease'
    }, 1000)
    try {
      myMap.geoObjects.removeAll()
      const firstresponse = await fetch(`https://api.opentripmap.com/0.1/ru/places/geoname?name=${city}&apikey=5ae2e3f221c38a28845f05b63b07998811e14a440ffc34e2ed2e6ba1`)
      const { lat, lon } = await firstresponse.json()
      const secondresponse = await fetch(`https://api.opentripmap.com/0.1/ru/places/radius?radius=10000&lon=${lon}&lat=${lat}&kinds=monuments&apikey=5ae2e3f221c38a28845f05b63b07998811e14a440ffc34e2ed2e6ba1`)
      const result = await secondresponse.json()
      const array = result.features
      const newarr = []
      const newreg = /([Лл]енин)|([Ll]enin)/gi
  

      for (let i = 0; i < array.length; i++) {
        if (array[i].properties.name.search(newreg) != -1) {
          newarr.push(array[i].geometry.coordinates)
        }
      }

      for (let j = 0; j < newarr.length; j++) {
        const reverse = newarr[j].reverse()

        myPoint = new ymaps.Placemark(reverse, {
          balloonContent: 'тут есть Ленин',
        }, {
          preset: 'islands#blackDotIcon',
          iconColor: '#0095b6',
        })
        document.getElementById('destroyButton').onclick = function () {
          // Для уничтожения используется метод destroy.
          myMap.destroy()
        }
        myMap.geoObjects
          .add(myPoint)
      }
      $getcityform.reset()
      // $getcityform.remove()

      // const $maindiv = document.querySelector('.maindiv').innerHTML = `
      //       <button id="refreshbutton" action='/'>Попробовать еще раз</button>
      //       `
      // const $button = document.querySelector('#refreshbutton')
      // $button.addEventListener('click', () => {
      //   window.location = '/'
      // })
    } catch (err) {
      console.log(err)
    }
  })
}
