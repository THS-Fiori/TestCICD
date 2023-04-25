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

        return Controller.extend("ze919mrfmaterialcreate.ze919mrfmaterialcreate.controller.PKGLCreationView", {
            onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("RoutePKGLCreate").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent){
                this.onCancel();
                let oLocal = this.getView().getModel("local");
                //Set Request Date
                var requestDate = formatter.getDate();
                oLocal.setProperty("/MatCretion/Erdat", requestDate);                
            },
            onSubmit: function(oEvent)
            {
                this.vFlog = '';
                //Call to the method to assign selected values to the Model
                this.assginSelect();
                // this.checkRequird();
                if (this.vFlog == 'X') {
                    MessageBox.error("Please Enter all Nesessary information");
                    return;
                } else {
                    debugger;
                    let oLocal = this.getView().getModel("local");
                    var that = this;
                    var payLoad = oLocal.getProperty("/MatCretion");
                    var matnr = oLocal.getProperty("/MatCretion/Material");
                    //Get OData Model
                    var oModel = this.getView().getModel();
                    oModel.update("/WipmaterialSet('" + matnr + "')" , payLoad,{
                        success: function(odata){
                            MessageBox.success("YES Plesase");
                            that.onCancel();
                        },
                        error: function(error){
                            debugger;
                            MessageBox.error(JSON.parse(error.responseText).error.message.value);
                        }
                  });
                }  
            },            
            onGetData: function(oEvent){
                //Get Data from Screen
                var that = this;
                var oLocal = this.getView().getModel("local");
                var matnr = oLocal.getProperty("/MatCretion/Material");
                var oModel = this.getView().getModel();
                //Get the Data from Backend based on Material Number
                oModel.read("/MatCretion('" + matnr + "')",{
                    success: function(odata){
                        oLocal.setProperty("/MRFFINISHEDGOODSSet",odata);
                    },
                    error: function(error){
                        MessageBox.error(JSON.parse(error.responseText).error.message.value);
                    }
                });
   
               },
            onCancel: function(oEvent){
                //Get Data from Screen
                var oLocal = this.getView().getModel("local");
                //Set Default state
                oLocal.setProperty("/MatCretion",{
                    "Requestor":"",
                    "Erdat":"",
                    "Erzet":"",
                    "Replacingmaterial":"",
                    "Replacingvendor":"",
                    "Werks":"",
                    "Mtart":"",
                    "Material":"",
                    "Maktx":"",
                    "Custskumaterial":"",
                    "Uom":"",
                    "Matkl":"",
                    "Materialreplaced":"",
                    "Materialreplacedname":"",
                    "Pdmpkgmaterial":"",
                    "Pkgcomponentweight":"",
                    "Pkgcomponentslef":"",
                    "Iseriesitemclass":"",
                    "Loadinggroup":"",
                    "Prctr":"",   
                    "Relatedmaterial":"",
                    "Annaulvolume":"",
                    "Lifnr":"",
                    "Vendorname":"", 
                    "Vendorpartno":"", 
                    "Manufacturersname":"",
                    "Invoicecost":"",
                    "Coldstoragecost":"",
                    "Frieghtcost":"",
                    "Stdcostcad":"",
                    "Stdcostusd":"",
                    "Qainspectionrequired":""                   
                });
            },
            assginSelect: function(oEvent){
             debugger;
             var oLocal = this.getView().getModel("local");
             let rMat = this.getView().byId("IdSRMat").getSelectedKey();
             let rVen = this.getView().byId("IdSRVendor").getSelectedKey();
             let Qir = this.getView().byId("IdSQIR").getSelectedKey();
             oLocal.setProperty("/MatCretion/Replacingmaterial",rMat);
             oLocal.setProperty("/MatCretion/Replacingvendor",rVen);
             oLocal.setProperty("/MatCretion/Replacingvendor",Qir);    
            },
            oManLocDialog:null, 
            selectedManLocf4Id:null,
            oMatTypDialog:null, 
            selectedMatTypf4Id:null,
            oUomDialog:null,
            selectedUomf4Id:null,
            oMatGrpDialog:null,   
            selectedMatGrpf4Id:null,  
            oPrctrDialog:null,
            selectedPrctrf4Id:null,
            oSapLoadDialog:null,
            selectedSapLoadf4Id:null,

                       // Manufacturing  Location
                       onHelpPl: function(oEvent){
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
                        var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Plantname
                        var ifield = sap.ui.getCore().byId(this.selectedManLocf4Id);
                        ifield.setValue(sItem);
                        this.onManLocClose();
                    },
                    onSearchManLoc: function(oEvent){
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
                    // Material Type
                    onHelpMatType: function(oEvent){
                        var that = this;
                        this.selectedMatTypf4Id = oEvent.getSource().getId();
                        if (!this.oMatTypDialog) {
                          Fragment.load({
                              id: this.getView().createId("IdFMatTyp"),
                              name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectMatTyp",
                              controller: this
                          }).then(function(oMatTypDialog){
                              //Connect Fragment to root View
                              that.getView().addDependent(oMatTypDialog);
                              oMatTypDialog.open();
                              that.oMatTypDialog = oMatTypDialog;
                          });
                        }else{
                          that.oMatTypDialog.open();
                        }
                    },
                    onSelectMatTyp: function(oEvent){
                        var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Materialtypetext;
                        var ifield = sap.ui.getCore().byId(this.selectedMatTypf4Id);
                        ifield.setValue(sItem);
                        this.onMatTypClose();
                    },
                    onSearchMatTyp: function(oEvent){
                        let sValue = oEvent.getParameter("newValue");
                        let ofilter = new Filter({
                            filters:[new Filter({path: "Mtart", operator:FilterOperator.Contains, value1: sValue}),
                            new Filter({path: "Mtbez", operator:FilterOperator.Contains, value1: sValue})],and:false
                        });   
                        let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFMatTyp"), "IdMatTypTable");
                        table.getBinding("items").filter([ofilter]);
                    },
                    onMatTypClose: function(oEvent){
                        this.oMatTypDialog.close();
                    },
                    //Unit of Messure
                    onHelpUom: function(oEvent){
                        debugger;
                        var that = this;
                        this.selectedUomf4Id = oEvent.getSource().getId();
                        if (!this.oUomDialog) {
                          Fragment.load({
                              id: this.getView().createId("IdFUom"),
                              name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectUom",
                              controller: this
                          }).then(function(oUomDialog){
                              //Connect Fragment to root View
                              that.getView().addDependent(oUomDialog);
                              oUomDialog.open();
                              that.oUomDialog = oUomDialog;
                          });
                        }else{
                          that.oUomDialog.open();
                        }
                    },
                    onSelectUom: function(oEvent){
                        var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Uomtext
                        var ifield = sap.ui.getCore().byId(this.selectedUomf4Id);
                        ifield.setValue(sItem);
                        this.onUomClose();
        
                    },
                    onSearchUom: function(oEvent){
                        debugger;
                        let sValue = oEvent.getParameter("newValue");
                        let ofilter = new Filter({
                            filters:[new Filter({path: "Msehi", operator:FilterOperator.Contains, value1: sValue}),
                            new Filter({path: "Msehl", operator:FilterOperator.Contains, value1: sValue})],and:false
                        });
                        let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFUom"), "IdUomTable");
                        // let table = sap.ui.getCore().byId("IdUomTable");
                        table.getBinding("items").filter([ofilter]);
                    },
                    onUomClose: function(oEvent){
                        this.oUomDialog.close();
                    },
                    // Material Group
                    onHelpMatGrp: function(oEvent){
                        debugger;
                        var that = this;
                        this.selectedMatGrpf4Id = oEvent.getSource().getId();
                        if (!this.oMatGrpDialog) {
                          Fragment.load({
                              id: this.getView().createId("IdFMatGrp"),
                              name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectMatGrp",
                              controller: this
                          }).then(function(oMatGrpDialog){
                              //Connect Fragment to root View
                              that.getView().addDependent(oMatGrpDialog);
                              oMatGrpDialog.open();
                              that.oMatGrpDialog = oMatGrpDialog;
                          });
                        }else{
                          that.oMatGrpDialog.open();
                        }
                    },
                    onSelectMatGrp: function(oEvent){
                        var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Materialgrptext
                        var ifield = sap.ui.getCore().byId(this.selectedMatGrpf4Id);
                        ifield.setValue(sItem);
                        this.onMatGrpClose();            
                    },
                    onSearchMatGrp: function(oEvent){
                        let sValue = oEvent.getParameter("newValue");
                        let ofilter = new Filter({
                            filters:[new Filter({path: "Matkl", operator:FilterOperator.Contains, value1: sValue}),
                            new Filter({path: "Wgbez", operator:FilterOperator.Contains, value1: sValue})],and:false
                        });
                        let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFMatGrp"), "IdMatGrpTable");
                        table.getBinding("items").filter([ofilter]);   
                    },
                    onMatGrpClose: function(oEvent){
                        this.oMatGrpDialog.close();
                    },
                    // Loading Group
                    onHelpSapLoad:function(oEvent){
                        var that = this;
                        this.selectedSapLoadf4Id = oEvent.getSource().getId();
                        if (!this.oSapLoadDialog) {
                          Fragment.load({
                              id: this.getView().createId("IdFLGroup"),
                              name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectSapLoad",
                              controller: this
                          }).then(function(oSapLoadDialog){
                              //Connect Fragment to root View
                              that.getView().addDependent(oSapLoadDialog);
                              oSapLoadDialog.open();
                              that.oSapLoadDialog = oSapLoadDialog;
                          });
                        }else{
                          that.oSapLoadDialog.open();
                        }
                    },
                    onSelectSapLoad: function(oEvent){           
                        var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Ladgrtext
                        var ifield = sap.ui.getCore().byId(this.selectedSapLoadf4Id);
                        ifield.setValue(sItem);
                        this.onSapLoadClose();
                    },            
                    onSearchSapLoad: function(oEvent){
                        let sValue = oEvent.getParameter("newValue");
                        let ofilter = new Filter({
                            filters:[new Filter({path: "Ladgr", operator:FilterOperator.Contains, value1: sValue}),
                            new Filter({path: "Vtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                        });
                        let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFLGroup"), "IdSapLoadTable");
                        table.getBinding("items").filter([ofilter]); 
                    },     
                    onSapLoadClose: function(oEvent){
                        this.oSapLoadDialog.close();
                    },
                    // Profit Center
                    onHelpPrctr:function(oEvent){
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
                        table.getBinding("items").filter([ofilter]); 
                    },
                    onPrctrClose: function(oEvent){
                        this.oPrctrDialog.close();
                    }          
        
        });
    });
