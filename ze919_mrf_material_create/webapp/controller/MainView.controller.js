sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ze919mrfmaterialcreate.ze919mrfmaterialcreate.controller.MainView", {
            onInit: function () {
                debugger;
                this._oRouter = this.getOwnerComponent().getRouter();
            },
            onFGCreation: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RouteFGCreate");
            },

            onWIPCreation: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RouteWIPCreate");
            },
            onINGCreation: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RouteINGCreate");
            },
            onPKGCGCreation: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RoutePKGCCreate");
            },
            onPKGLCreation: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RoutePKGLCreate");
            },
            onMatExten: function(oEvent)
            {
                debugger;
                this._oRouter.navTo("RouteMatExten");
            }

        });
    });
