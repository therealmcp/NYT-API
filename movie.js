
    <script src="https://code.jquery.com/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    
    <div class="container">
        <h2>Movie recomendations</h2>
        <p>Based on your mood we selected a few movies for you</p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Short description</th>
              <th scope="col">Show times</th>
              <th scope="col">Theatres</th>
            </tr>
          </thead>
          <tbody>
    
          </tbody>
        </table>
      </div>

<script>
           // construct the url with parameter values
           var apikey = "wcynn7m8cmtd5c24zfer2f77";
           var baseUrl = "http://data.tmsapi.com/v1.1";
           var showtimesUrl = baseUrl + '/movies/showings';
           var zipCode = {};
           var d = new Date();
           var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();


            $("#find-movie").on("click", function(event) {
            event.preventDefault();
            var zipCode = $("#movie-input").val();

             $.ajax({
              url: showtimesUrl,
                  data: { startDate: today,
                      zip: zipCode,
                      jsonp: "dataHandler",
                      api_key: apikey
                     },           
              dataType: "jsonp",
             })
           });
            var movieArray =  [];

           // callback to handle the results
           function dataHandler(data) {

             data.forEach(function(movie){    
                
                var tBody = $("tbody");
                var tRow = $("<tr>");
                var titleTd = $("<td>").text(movie.title);
                var yearTd = $("<td>").text(movie.shortDescription);

                var movietimes = [] // array to store showtimes from response object
                
                movie.showtimes.forEach(element => {
                    movietimes.push(element.dateTime)
                });

                var showtimeTd = $("<td>").text(movietimes[0]);

                var locations = []
                
                movie.showtimes.forEach(element => {
                    locations.push(element.theatre.name)
                });

                var theatreTd = $("<td>").text(locations[0]);
                
                tRow.append(titleTd, yearTd, showtimeTd, theatreTd);
                tBody.append(tRow);

                            console.log(movie.title);
                            console.log(movie.shortDescription);
                            console.log(movie.showtimes[0].dateTime);
                            console.log(movie.showtimes[0].theatre.name);
                            console.log(movie.name);
                            console.log(movietimes);
                            console.log(locations);
                        })   
                        console.log(data);
                        };

    </script>
