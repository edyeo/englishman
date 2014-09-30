'use strict';

angular.module('englishmanApp')
	.controller('ArticlesController',['$scope','$http','$stateParams','$q',function($scope,$http,ArticlesService,$stateParams,$q){
		$scope.Article = {};
		$scope.articleId = '';
		$scope.Article.targetTitle = '';
		$scope.Article.Title = '';
		$scope.Article.targetArticle = 'targetArticle';
		$scope.Article.sourceArticle = 'sourceArticle';
		$scope.Article.targetArticleArr = [];
		$scope.Article.sourceArticleArr = [];
		$scope.Article.list = [];
		$scope.mergedArticle = '';



		var makeMergedArticle = function(){
			var mergedArticle = [];
			console.log('watch mergedArticle');
			for(var i=0; i<= $scope.Article.sourceArticle.content.length; i++){
				if (i == $scope.Article.sourceArticle.content.length){
					$scope.mergedArticle = mergedArticle;	
					console.log(mergedArticle);
					$scope.$apply();
					console.log($scope.mergedArticle);
					break;
				}

				mergedArticle.push({'sentence' : $scope.Article.targetArticle.content[i]});
				mergedArticle.push({'sentence' : $scope.Article.sourceArticle.content[i]});				

			}			
		}


		$scope.$watch('articleId',function(){
			console.log($scope.articleId);
			var mergedArticle = [];
			// getArticle($scope.articleId,'eng',$scope.Article.sourceArticle);
			// getArticle($scope.articleId,'kor',$scope.Article.targetArticle);
			

			getArticle($scope.articleId,'eng',function(err,article){
				$scope.Article.sourceArticle = article;
				getArticle($scope.articleId,'kor',function(err, article){
					$scope.Article.targetArticle = article;
					makeMergedArticle();
				})
			});
		});


		// var getArticle = function(objectId,language,target){

		// 	var Article = Parse.Object.extend('Article');
		// 	var articleQuery = new Parse.Query(Article);
		// 	// articleQuery.equalTo('parent',objectId);
		// 	articleQuery.equalTo('language',language);	
		// 	articleQuery.select('id','title','content');
		// 	articleQuery.find({
		// 	  success: function(result) {
		// 	    // Do something with the returned Parse.Object values
		// 	    console.log(result);
		// 	    var object = result[0];
		// 	    var element = {};
		// 	    element.objectId = object.id;
		// 	    element.title = object.get('title');
		// 	    element.content = object.get('content');
		// 	    target = element;
		// 	    console.log(element.title);


		// 	  },
		// 	  error: function(error) {
		// 	    alert("Error: " + error.code + " " + error.message);
		// 	  }
		// 	});
		// }

		var getArticle = function(objectId,language,callback){

				var Article = Parse.Object.extend('Article');
				var articleQuery = new Parse.Query(Article);
				
				console.log(objectId);

				//articleQuery.equalTo('parent',objectId);
				articleQuery.equalTo('language',language);	
				articleQuery.select('id','title','content');
				articleQuery.find({
				  success: function(result) {
				    // Do something with the returned Parse.Object values
				    console.log(result);
				    var object = result[0];
				    var element = {};
				    element.objectId = object.id;
				    element.title = object.get('title');
				    element.content = object.get('content');
				    // $scope.Article.sourceArticle = element;
				    // console.log($scope.Article.sourceArticle);
				    // console.log($scope.Article.targetArticle);
				    
				    console.log('callback will be called!!');


				    if (callback) {
					    callback(null,element);
					}


				  },
				  error: function(error) {
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
		}

		$scope.getArticleList = function(){
			var Article = Parse.Object.extend('Article');
			var articleQuery = new Parse.Query(Article);
			articleQuery.equalTo('language','eng');	
			articleQuery.find({
			  success: function(results) {
			    // Do something with the returned Parse.Object values
			    var articleArr = [];
			    for (var i = 0; i < results.length; i++) { 
			      var object = results[i];
			      var element = {};
			      element.objectId = object.id;
			      element.title = object.get('title');
			      element.content = object.get('content');
			      articleArr.push(element);
			    }
			    $scope.Article.list = articleArr;
			    $scope.$apply();
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		}



		// $scope.getArticleList = function(){
		// 	var ArticleMeta = Parse.Object.extend('ArticleMeta');
		// 	var articleMetaQuery = new Parse.Query(ArticleMeta);
		// 	articleMetaQuery.find({
		// 	  success: function(results) {
		// 	    // Do something with the returned Parse.Object values
		// 	    var docIdArr = [];
		// 	    for (var i = 0; i < results.length; i++) { 
		// 	      var object = results[i];
		// 	      var element = {};
		// 	      element.objectId = object.get('id');
		// 	      element.docId = object.get('docId');
		// 	      element.article = $scope.getArticle(element.docId,'eng');
		// 	      docIdArr.push(element);
		// 	    }
		// 	    $scope.Article.list = docIdArr;
		// 	    console.log(docIdArr);
		// 	    $scope.$apply();
		// 	  },
		// 	  error: function(error) {
		// 	    alert("Error: " + error.code + " " + error.message);
		// 	  }
		// 	});
		// }

		// $scope.getArticle = function(docId,language){
		// 	var ArticleMeta = Parse.Object.extend('ArticleMeta');
		// 	var articleMetaQuery = new Parse.Query(ArticleMeta);
		// 	articleMetaQuery.equalTo('docId',docId);
		// 	articleMetaQuery.find({
		// 	  success: function(result) {
		// 	    // Do something with the returned Parse.Object values
		// 	    var docIdArr = [];
		// 	    var meta = result[0];

		// 		var Article = Parse.Object.extend('Article');
		// 		var articleQuery = new Parse.Query(Article);
		// 		articleQuery.equalTo('parent',meta);
		// 		articleQuery.equalTo('language',language);				
		// 		articleQuery.find({
		// 		  success: function(result) {
		// 		    // Do something with the returned Parse.Object values
		// 		    console.log("===== result =====");
		// 		    console.log(result);
		// 		    var object = result[0];
		// 		    return object;
		// 		  //  alert(object.get('content'));
		// 		  },
		// 		  error: function(error) {
		// 		  //  alert("Error: " + error.code + " " + error.message);
		// 		  }
		// 		});

		// 	  },
		// 	  error: function(error) {
		// 	  //  alert("Error: " + error.code + " " + error.message);
		// 	  }
		// 	});

		// }



		$scope.init = function(){
			Parse.initialize('SjEiWOh1QUyoJ3uJCosH5stdGDlrgtE0ywYbTUDe', 'YuJXLCj1PFbjpJiH1J94pZevADKcgLvXv5CmQ15M');
			$scope.getArticleList();

			//$scope.getArticle(1,'kor');
		}

		$scope.init();



		$scope.prettifySource = function(){
			var article = $scope.Article.sourceArticle;
			var article_p_arr;
			article_p_arr = $scope.prettify(article);
			$scope.Article.sourceArticleArr = article_p_arr;
			$scope.Article.sourceArticle = article_p_arr.join('\n');
		}

		$scope.prettifyTarget = function(){
			var article = $scope.Article.targetArticle;
			var article_p_arr;
			article_p_arr = $scope.prettify(article);
			console.log(article_p_arr);
			$scope.Article.targetArticleArr = article_p_arr;
			$scope.Article.targetArticle = article_p_arr.join('\n');
		}

		$scope.prettify = function(article){
			var regexp = new RegExp("(\\S.+?[.!?])(?=\\s+|$)","gi");
			var article_p_arr = [];
			var sentence;
			console.log(article);
			while((sentence = regexp.exec(article)) != null){
				console.log(sentence[1]);
				article_p_arr.push(sentence[1]);
			}
			console.log(article_p_arr);
			return article_p_arr;
		}

		$scope.submit = function(){
			var ArticleMeta = Parse.Object.extend('ArticleMeta');
			var articleMeta = new ArticleMeta();
			var articleMetaQuery = new Parse.Query(ArticleMeta);

			// article.set("docId",0);

			articleMeta.increment("docId");

			var Article = Parse.Object.extend('Article');
			var articleSource = new Article();
			var articleTarget = new Article();


			articleSource.set('contributorId','user1');
			articleSource.set('language','eng');
			articleSource.set('title',$scope.Article.sourceTitle);
			articleSource.set('content',$scope.Article.sourceArticleArr);	
			articleSource.set('parent',articleMeta);
			articleSource.save(null, {
				success: function(Article) {
				// Execute any logic that should take place after the object is saved.
				    alert('New object created with objectId: ' + articleSource.id);
				},
				error: function(Article, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
					alert('Failed to create new object, with error code: ' + error.message);
				}
			});


			articleTarget.set('contributorId','user1');
			articleTarget.set('language','kor');
			articleTarget.set('title',$scope.Article.targetTitle);
			articleTarget.set('content',$scope.Article.targetArticleArr);	
			articleTarget.set('parent',articleMeta);
			articleTarget.save(null, {
				success: function(Article) {
				// Execute any logic that should take place after the object is saved.
				    alert('New object created with objectId: ' + articleTarget.id);
				},
				error: function(Article, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
					alert('Failed to create new object, with error code: ' + error.message);
				}
			});
		}

	}]);