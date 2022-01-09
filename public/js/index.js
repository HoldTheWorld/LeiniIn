ymaps = window.ymaps
let myMap
ymaps.ready(init)
function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 5,
  }, {
    searchControlProvider: 'yandex#search',
  })

  const $getcityform = document.forms.getcityform
  $getcityform?.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    const city = ev.target.city.value

    ymaps.geocode(city, {
      results: 1,
    }).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      const coords = firstGeoObject.geometry.getCoordinates();
      const bounds = firstGeoObject.properties.get('boundedBy');
      firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
      firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
      myMap.setBounds(bounds, {
        checkZoomRange: true,
      });
    });
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
        myMap.geoObjects
          .add(myPoint)
      }
      $getcityform.reset()
    } catch (err) {
      console.log(err)
    }

  })
}
