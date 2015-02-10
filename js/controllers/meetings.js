﻿rahulApp.controller('MeetingsController', 
    function ($scope, $rootScope, $firebase, $firebaseSimpleLogin, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var simpleLogin = $firebaseSimpleLogin(ref);

        simpleLogin.$getCurrentUser().then(function (authUser) {


            var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid + '/meetings');
            var meetingsInfo = $firebase(ref);
            var meetingsObj = $firebase(ref).$asObject();
            var meetingsArray = $firebase(ref).$asArray();

            meetingsObj.$loaded().then(function (data) {
                $scope.meetings = meetingsObj;
            });//Meetings Object Loaded

            meetingsArray.$loaded().then(function (data) {
                $rootScope.howManyMeetings = meetingsArray.length;
            });//Meetings Array Loaded

            meetingsArray.$watch(function (event) {
                $rootScope.howManyMeetings = meetingsArray.length;
            }); //meetings watch

            $scope.addMeeting = function () {
                meetingsInfo.$push({
                    name: $scope.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function () {
                    $scope.meetingname = '';
                });
            }//addMeeting

            $scope.deleteMeeting = function (key) {
                meetingsInfo.$remove(key);
            }//deleteMeeting

        }); //get current user


    }); //MeetingsController