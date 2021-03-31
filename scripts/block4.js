var app = angular.module('wikiApp', []);

/*directive to initialize event on enter*/
app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

/*Main Controller*/
app.controller('mainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  /*animations*/
  $scope.fadeHeader = false;
  $scope.fadeSearchbar = false;
  $scope.fadeResults = false;

  $timeout(function() {
    $scope.fadeHeader = true;
    $scope.fadeSearchbar = true;
  }, 1000);

  $scope.submit = function() {
    //Fade out previous results
    $scope.fadeResults = false;
    // Get search request from input field
    var searchString = $scope.string;
    if (/ /.test(searchString) === true) {
      // modify string for search url
      searchString = searchString.replace(/ /g, '%20');
    }
    // create search url
    var searchUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&inprop=url&callback=JSON_CALLBACK&srsearch=" + searchString + "&titles=Main%20Page";
    $http.jsonp(searchUrl)
      .success(function(data) {
        $scope.links = data.query.search;
        // For Loop to modify data & Create URL and remove tags from snippet
        for (var i = 0; i < 10; i++) {
          // create wikipedia.org url link
          $scope.links[i].urlTitle = $scope.links[i].title.replace(/ /g, "_");
          console.log($scope.links[i].urlTitle);
          $scope.links[i].url = "http://www.wikipedia.org/wiki/" + $scope.links[i].urlTitle;
          console.log($scope.links[i].url);
          // remove tags and add quotes to snippet
          $scope.links[i].snippet = $scope.links[i].snippet.replace(/(<([^>]+)>)/g, '');
          $scope.links[i].snippet = $scope.links[i].snippet.replace(/(&quot;)/g, '"');
          $scope.links[i].snippet = $scope.links[i].snippet.replace(/(&amp;)/g, '&');
          $scope.links[i].snippet = $scope.links[i].snippet.replace(/$/g, '...');
        }
      });
    $timeout(function() {
      $scope.fadeResults = true;
    }, 500);
  };

}]);

Resources1× 0.5× 0.25×Rerun
                        