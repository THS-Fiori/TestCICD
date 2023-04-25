sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ze919mrfmaterialcreate/ze919mrfmaterialcreate/utils/formatter",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,formatter,MessageBox,Fragment,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("ze919mrfmaterialcreate.ze919mrfmaterialcreate.controller.MatExtenView", {
            onInit: function () {
                debugger;
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("RouteMatExten").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent){
                debugger;
                this.onCancel();
                let oLocal = this.getView().getModel("local");
                //Set Request Date
                var requestDate = formatter.getDate();
                oLocal.setProperty("/matExtenstion/Erdat", requestDate);                
            },
            onGetData: function(oEvent)
            {
                debugger;
            },
            onSubmit: function(oEvent){
                debugger;
            },
            onCMonth: function(oEvent){
                debugger;
                let oLocal = this.getView().getModel("local");
                // oLocal.setProperty("/matExtenstion/Cjan", this.getView().byId(this.getView().byId("IdTab1").getItems()[0].getId()).getValue());
                switch (oEvent.getSource().getId()) {
                    case this.getView().byId("IdTab1").getItems()[0].getId():
                        debugger;
                        break;
                
                    default:
                        debugger;
                        break;
                }
                
                
            },
            onCancel: function(oEvent){
                //Get Data from Screen
                var oLocal = this.getView().getModel("local");
                //Set Default state
                oLocal.setProperty("/matExtenstion",{
                    "Finishedmaterial" : "",
                    "Maktx" : "",
                    "Werks" : "",
                    "Prctr" : "",
                    "Fgprodplant" : "",
                    "Fglblplant" : "",
                    "Lifnr" : "",
                    "Beskz" : "",
                    "Ladgr" : "",
                    "Approvedprice" : "",
                    "Cjan" : "",
                    "Cfeb" : "",
                    "Cmar" : "",
                    "Capr" : "",
                    "Cmay" : "",
                    "Cjun" : "",
                    "Cjul" : "",
                    "Caug" : "",
                    "Csep" : "",
                    "Coct" : "",
                    "Cnov" : "",
                    "Cdec" : "",
                    "Ctotal" : "",
                    "Njan" : "",
                    "Nfeb" : "",
                    "Nmar" : "",
                    "Napr" : "",
                    "Nmay" : "",
                    "Njun" : "",
                    "Njul" : "",
                    "Naug" : "",
                    "Nsep" : "",
                    "Noct" : "",
                    "Nnov" : "",
                    "Ndec" : "",
                    "Ntotal" : "",
                    "Requestor" : "",
                    "Custsoldto" : "",
                    "Custshipto" : "",
                    "Proposedshipdate" : "",
                    "Erzet": ""

                });
            },
            // Plant
            onHelpFGLPlant: function(oEvent){
                var that = this;
                this.selectedManLocf4Id = oEvent.getSource().getId();
                if (!this.oManLocDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFManLoc"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectManLoc",
                      controller: this
                  }).then(function(oManLocDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oManLocDialog);
                      oManLocDialog.open();
                      that.oManLocDialog = oManLocDialog;
                  });
                }else{
                  that.oManLocDialog.open();
                }
            },
            onSelectManLoc: function(oEvent){
                debugger;
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Plantname
                var ifield = sap.ui.getCore().byId(this.selectedManLocf4Id);
                ifield.setValue(sItem);
                this.onManLocClose();
            },
            onSearchManLoc: function(oEvent){
                debugger;
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Werks", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Name1", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFManLoc"), "IdManLocTable");
                table.getBinding("items").filter([ofilter]);
            },
            onManLocClose: function(oEvent){
                this.oManLocDialog.close();
            },
            // Profit Centre
            onHelpPrctr: function(oEvent){
                var that = this;
                this.selectedPrctrf4Id = oEvent.getSource().getId();
                if (!this.oPrctrDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFPrctr"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectPrctr",
                      controller: this
                  }).then(function(oPrctrDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oPrctrDialog);
                      oPrctrDialog.open();
                      that.oPrctrDialog = oPrctrDialog;
                  });
                }else{
                  that.oPrctrDialog.open();
                }
            },
            onSelectPrctr: function(oEvent){
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Prctrtext
                var ifield = sap.ui.getCore().byId(this.selectedPrctrf4Id);
                ifield.setValue(sItem);
                this.onPrctrClose();
            },
            onSearchPrctr: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Prctr", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Ltext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });          
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFPrctr"), "IdPrctrTable");
                // let table = sap.ui.getCore().byId("IdPrctrTable");
                table.getBinding("items").filter([ofilter]); 
            },
            onPrctrClose: function(oEvent){
                this.oPrctrDialog.close();
            }
        });
    });
