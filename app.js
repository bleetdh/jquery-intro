// first thing in jquery
$(document).ready(function () {
  var $form = $('form')
  var $addHome = $('#addHome')
  var $tbody = $('tbody')
  var $removeHome = $('.removeHome')

  // disregard this code for now
  $form.on('submit', function (event) {
    // stop the form submission
    // default event
    event.preventDefault()

    var form_data = $(this).serializeArray()
    addNewRow(form_data)
  })

  function addNewRow (data) {
    // $('<tr>') ==> creating new tr
    // $('tr') ==> finding one/many tr
    var $newTr = $('<tr>')

    for (var i = 0; i < data.length; i++) {
      var $newTd = $('<td>')
      $newTd.text(data[i].value) // where we put the form input value
      $newTr.append($newTd)
    }

    // create new button
    var $newButton = $('<td><button class="btn btn-xs btn-danger removeHome">Remove</button></td>')

    $newTr.append($newButton)

    $tbody.append($newTr)
    // CASE AGAINST INNER HTML
    // $tbody.append('<tr><td><script>alert("hack!")</script></td></tr>')
  }
  $tbody.on('click', '.removeHome', function () {
    var $removeTr = $(this).parents('tr')
    $removeTr.remove()
  })
})
