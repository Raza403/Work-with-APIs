//Array of colors added to select random color from here for "p" and body element.
var colors = ['#0000', '#5333FF', '#FF3351', '#FF33C5', '#A033FF', '#FF8333', '#FF3333', '#2C3E50', '#145A32'];
$("#get").on('click', getData);
//Gets data from API.
function getData() {
  $.ajaxSetup({
    cache: false
  });
  $.getJSON(
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=2&callback=",
    function (data) {
      var content = data[0].content;
      //Length of content is controlled because it is to be tweeted hence below 140 chars.
      if (content.length > 120) {
        getData();
      } else {
        $("#content").html(content + "____" + data[0].title)
        //Function for selecting random colors and applying.
        $(document).ready(function () {
          var rand = colors[Math.floor(Math.random() * colors.length)];
          $("p").css("color", rand);
          $(".container-fluid").css("background-color", rand);
          $("#get").css("color", rand);
          $(".icon-twitter").css("color", rand);
        });
      }
    });
}
$("#tweet").on('click', tweeter);

function tweeter() {
  var text = $("#content").text();
  var tweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
  window.open(tweet, '_blank');
}