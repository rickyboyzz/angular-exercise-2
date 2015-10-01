var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Post', PostSchema);

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
curl http://localhost:3000/posts

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
curl -X PUT http://localhost:8080/posts/<POST ID>/upvote

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

o.create = function(post) {
  return $http.post('/posts', post).success(function(data){
    o.posts.push(data);
  });
};
o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
};
o.get = function(id) {
  return $http.get('/posts/' + id).then(function(res){
    return res.data;
  });
};

.state('posts', {
  url: '/posts/{id}',
  templateUrl: '/posts.html',
  controller: 'PostsCtrl',
  resolve: {
    post: ['$stateParams', 'posts', function($stateParams, posts) {
      return posts.get($stateParams.id);
    }]
  }
});
app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;

  o.addComment = function(id, comment) {
  return $http.post('/posts/' + id + '/comments', comment);
};
$scope.addComment = function(){
  if($scope.body === '') { return; }
  posts.addComment(post._id, {
    body: $scope.body,
    author: 'user',
  }).success(function(comment) {
    $scope.post.comments.push(comment);
  });
  $scope.body = '';
};
});
o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
    .success(function(data){
      comment.upvotes += 1;
    });
};
$scope.incrementUpvotes = function(comment){
  posts.upvoteComment(post, comment);
};
