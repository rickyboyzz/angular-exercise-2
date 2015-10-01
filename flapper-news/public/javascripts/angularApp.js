var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  $scope.test = 'Hello world!';

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({title: $scope.title, upvotes: 0}
  );
  $scope.posts.push({
  title: $scope.title,
  link: $scope.link,
  upvotes: 0,
  comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
});
  $scope.title = '';};
  posts.posts = [
  {title: 'post 1', upvotes: 5},
  {title: 'post 2', upvotes: 2},
  {title: 'post 3', upvotes: 15},
  {title: 'post 4', upvotes: 9},
  {title: 'post 5', upvotes: 4}
];

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title,
    link: $scope.link,
  });
  $scope.title = '';
  $scope.link = '';
};
app.config([ state('posts', {
  url: '/posts/{id}',
  templateUrl: '/posts.html',
  controller: 'PostsCtrl'
})]);
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

}]);

$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};
}])

o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  
  app.factory('posts', ['$http', function($http){
   .state('home', {
  url: '/home',
  templateUrl: '/home.html',
  controller: 'MainCtrl',
  resolve: {
    postPromise: ['posts', function(posts){
      return posts.getAll();
    }]
  }
})
});
$scope.incrementUpvotes = function(post) {
  posts.upvote(post);
};
<a href="#/posts/{{post._id}}">Comments</a>