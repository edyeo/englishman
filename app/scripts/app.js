'use strict';

angular
  .module('englishmanApp', [
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/articles');
    $stateProvider
      .state('articles',{ abstract: true, url: '/articles', templateUrl : 'views/articles.html', controller : 'ArticlesController'})
        .state('articles.home',{ url: '/home', templateUrl : 'views/partial/articles_home.html'})
        .state('articles.new',{ url: '/new', templateUrl : 'views/partial/articles_new.html'})
        .state('articles.practice',{ url: '/practice/:articleId', templateUrl : 'views/partial/articles_practice.html', controller : function($scope, $stateParams){ $scope.$parent.articleId = $stateParams.articleId } });

  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
  });