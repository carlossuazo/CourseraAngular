'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 0;
        $scope.filtText = 'mains';
        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = false;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        var channels = [{
            value: "tel",
            label: "Tel."
        }, {
            value: "Email",
            label: "Email"
        }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({
                id: parseInt($stateParams.id, 10)
            })
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.submitComment = function() {
            $scope.comment.date = new Date().toISOString();
            console.log($scope.comment);
            $scope.dish.comments.push($scope.comment);

            menuFactory.getDishes().update({
                id: $scope.dish.id
            }, $scope.dish);
            $scope.commentForm.$setPristine();
            $scope.comment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        };
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

        //initialize variables
        $scope.dish = {};
        $scope.showDish = false;
        $scope.showPromotion = false;
        $scope.showLeader = false;

        $scope.message = "Loading ...";
        $scope.messagePromotion = "Loading ...";
        $scope.messageLeader = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({
                id: 0
            })
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        //the leader
        //var leader = corporateFactory.getLeader(0);
        // this is not necesary becuase we are using a controller that comuniate with the service, the service get the information from de back end

        $scope.leader = corporateFactory.getLeaders().get({
                id: 0
            })
            .$promise.then(
                function(response) {
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.messageLeader = "Error: " + response.status + " " + response.statusText;
                }
            ); //leader;

        //the promotion
        //var promotion = menuFactory.getPromotion(0);
        // this is not necesary becuase we are using a controller that comuniate with the service, the service get the information from de back end

        $scope.promotion = menuFactory.getPromotion().get({
                id: 0
            })
            .$promise.then(
                function(response) {
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.messagePromotion = "Error: " + response.status + " " + response.statusText;
                }
            );

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

        $scope.showLeader = false;

        $scope.messageLeader = "Loading ...";

        $scope.leaders = corporateFactory.getLeaders().query()
            .$promise.then(
                function(response) {
                    $scope.leaders = response;
                    console.log($scope.leaders);
                    $scope.showLeader = true;
                },
                function(response) {
                    console.log(response + " " + response.status + " " + response.statusText);
                    $scope.messageLeader = "Error: " + response.status + " " + response.statusText;
                }
            ); //leader;
    }])

;
