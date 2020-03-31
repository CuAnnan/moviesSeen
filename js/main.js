(($)=> {
  let moviesSeen = 0;
  let $moviesSeen;
  let $shareLink;
  let binaryString = '';
  let baseURL;
  let URLParams = {};

  $(function () {
    $moviesSeen = $('#movies-seen-count');
    $('#total-movie-count').text(movies.length);
    $shareLink = $('#share-link');

    let $movieList = $('#movie-list');
    let html = '';
    for (let movie of movies)
    {
      html += `<li class="movie-list-item"><span class="movie-name">${movie}</span> <span class="seen-movie">&nbsp;</span></li>`;
      binaryString += '0';
    }
    $movieList.html(html);


    fetchURLParams();

    $('.movie-list-item').click(toggleMovieSeen);
  });

  function fetchURLParams(URL)
  {
    let URLParts = window.location.href.split('?');
    baseURL = URLParts[0];
    let paramsString = URLParts[1];


    if(paramsString)
    {
      let unsortedParams = paramsString.split('&');
      for(let paramPairs of unsortedParams)
      {
        let [key, value] = paramPairs.split('=');
        URLParams[key] = value;
      }
    }

    if(URLParams.binaryString)
    {
      updateList(URLParams.binaryString);
    }
  }

  function updateList(binaryString)
  {
    for(let i = 0; i < binaryString.length; i++)
    {
      let seen = binaryString.charAt(i) === '1';
      let selector = `#movie-list li:nth-child(${i}) .seen-movie`;
      let $elem = $(selector);
      $elem.text(seen?'👍':'')
    }
  }

  function bitSwap(index, newBit)
  {
    binaryString = binaryString.substring(0, index) + newBit + binaryString.substring(index);
  }

  function toggleMovieSeen()
  {
    let $li = $(this);
    let seen = $li.data('seen');
    seen = !seen;
    $li.data('seen', seen);
    bitSwap($li.index(), seen?'1':'0');
    $shareLink.attr('href', `${baseURL}?binaryString=${binaryString}`);

    $('.seen-movie', $li).text(seen?'👍':'');
    moviesSeen += seen?1:-1;
    $moviesSeen.text(moviesSeen);
  }
})(window.jQuery);
