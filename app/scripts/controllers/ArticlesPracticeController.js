'use strict';

angular.module('englishmanApp')
	.controller('ArticlesPracticeController',['$scope','$http','stateParams',function($scope,$http,$stateParams,ArticlesService){
		

		$scope.getArticle = function(docId,language){
			var ArticleMeta = Parse.Object.extend('ArticleMeta');
			var articleMetaQuery = new Parse.Query(ArticleMeta);
			articleMetaQuery.equalTo('docId',docId);
			articleMetaQuery.find({
			  success: function(result) {
			    // Do something with the returned Parse.Object values
			    var docIdArr = [];
			    var meta = result[0];

				var Article = Parse.Object.extend('Article');
				var articleQuery = new Parse.Query(Article);
				articleQuery.equalTo('parent',meta);
				articleQuery.equalTo('language',language);				
				articleQuery.find({
				  success: function(result) {
				    // Do something with the returned Parse.Object values
				    console.log("===== result =====");
				    console.log(result);
				    var object = result[0];
				    return object;
				  //  alert(object.get('content'));
				  },
				  error: function(error) {
				  //  alert("Error: " + error.code + " " + error.message);
				  }
				});

			  },
			  error: function(error) {
			  //  alert("Error: " + error.code + " " + error.message);
			  }
			});

		}

		$scope.init = function(){
			$scope.articleId = $stateParams.articleId;
			//$scope.getArticle(1,'kor');
		}

		$scope.init();

	}]);