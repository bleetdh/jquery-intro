$(document).ready(function () {
  // run ajax now
  // 2 methods = GET and POST

  var discover_movie_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=83ebcfbe2592e4358658da3522dad3ff'
  var searched_movie_url = 'https://api.themoviedb.org/3/search/movie?api_key=685e027ee02a48846839708a933931da&language=en-US&page=1&include_adult=false'
  
  var image_url = 'https://image.tmdb.org/t/p/w300/'
  var $ul = $('ul')

  var $body = $("body")

$(document).on({
  ajaxStart: function () { $body.addClass('loading') },
  ajaxStop: function () { $body.removeClass('loading') }
})


  $.get(discover_movie_url)
    .done(function (data) {
      var movie_arr = data.results

      movie_arr.forEach(function (movie) {
        var $createdList = createList(movie)
        $ul.append($createdList)
      })
    })

  // input: obj
  // output: jquery object
  // jquery object => <li> <img src=""> </li>
  function createList (obj) {
    var $newLi = $('<li>')
    var $newImg = $('<img>')

    $newImg.attr({
      src: image_url + obj.poster_path,
      alt: obj.title
    })
    $newLi.append($newImg)
    return $newLi
  }

  $('#search-form').keyup(function (event) {
    event.preventDefault()

    $ul.empty()

    var input = $('#query')
    var userQuery = input.val() || input.attr('placeholder')

    $.get(searched_movie_url, {
      query: userQuery
    }).done(function (response) {
      console.log(response)
      var searched_movie_arr = response.results

      searched_movie_arr.forEach(function (movie) {
        var $createdList = createList(movie)
        $ul.append($createdList)
      })
    })
  })
})

// $.get(discover_movie_url)
//   .done(function (data) {
//     var movie_json = data.results
//     var $movieList = $('.movie-list')
//
//     for (var i = 0; i < movie_json.length; i++) {
//       var $newLi = $('<li>')
//       var $newImage = $('<img>')
//       var posterPath = movie_json[i].poster_path
//
//       $newImage.attr({
//         src: image_url + posterPath
//       })
//       $newLi.append($newImage)
//       $movieList.append($newLi)
//     }
//   })
