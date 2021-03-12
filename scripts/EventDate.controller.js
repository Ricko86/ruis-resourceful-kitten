angular.module("umbraco").controller("MyProject.Blocks.EventDateController", function ($scope, entityResource) {

        var vm = this;

        vm.imageUrl = null;

        function loadImage(propertyVaue) {
            if(propertyVaue != "") {
                entityResource.getById(propertyVaue, "Media").then(function(ent) {
                    vm.imageUrl = ent.metaData.MediaPath;
                });
            } else {
                vm.imageUrl = null;
            }
        }

        loadImage($scope.block.data.image);

        $scope.$watch("block.data.image", function(newValue, oldValue) {
            if(newValue === oldValue) return;
            loadImage(newValue);
        });

});