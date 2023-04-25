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

        return Controller.extend("ze919mrfmaterialcreate.ze919mrfmaterialcreate.controller.FGCreationView", {
            onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("RouteFGCreate").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent){
                // this.onCancel();
                let oLocal = this.getView().getModel("local");
                let oModel = this.getView().getModel();
                //Set Request Date
                
                var requestDate = formatter.getDate();
                this.getView().byId("IdIDat").setValue(requestDate);
                //Get the user Name
                oModel.callFunction("/Getuser", {    // function import name
                    method: "GET",  // http method 
                    sucess: function(oData, response) { 
                        debugger;
                    },      
                    error: function(oError){ 
                        debugger;
                    }                  
                });
            },
            //Please Declare globel variable
            vFlog: null,
            onSubmit: function(oEvent)
            {
                debugger;
                this.vFlog = '';
                
                var oLocal = this.getView().getModel("local");
                if (oEvent.getSource().getText() === 'Submit') {
                    oLocal.setProperty("/MRFFGCreate/Submitflag", 'X');
                }
               //Check required  fields
                // this.checkRequird();
                if (this.vFlog == 'X') {
                    MessageBox.error("Please Enter all Nesessary information");
                    return;
                } else {  
                    var that = this;
                    var payLoad = oLocal.getProperty("/MRFFGCreate");
                    //Get OData Model
                    var oModel = this.getView().getModel();
                    oModel.create("/FinishedgoodsSet", payLoad,{
                        success: function(odata){
                            if (that.getView().getModel("local").getProperty("/MRFFGCreate/Submitflag")=='X') 
                            {
                                MessageBox.success("Finished Good created sucessfully");
                            } else {
                                MessageBox.success("Finished Good saved sucessfully");
                            }      
                            that.onCancel();
                        },
                        error: function(error){
                            debugger;
                            MessageBox.error(JSON.parse(error.responseText).error.message.value);
                        }
                  });
                }  
            },
            onCancel: function(oEvent){
                debugger;
                //Get Data from Screen
                var oLocal = this.getView().getModel("local");
                //Set Default state
                oLocal.setProperty("/MRFFGCreate",{
                    "ReqNum": "",
                    "MrfType":"",
                    "Submitflag":"",
                    "Projectcontact":"",
                    "Thsmaterial" : "",
                    "Legacymaterial" : "",
                    "Maktx" : "",
                    "Containercode" : "",
                    "Custmaterial" : "",
                    "Uom" : "",
                    "Packsize" : "",
                    "Sizeuom" : "",
                    "Finishedesc" : "",
                    "Mfgloc" : "",
                    "Shiploc" : "",
                    "Matkl" : "",
                    "Wipcode" : "",
                    "Bvf" : "",
                    "Wipdescription" : "",
                    "Proprietaryformula" : "",
                    "Wipshelflife" : "0",
                    "Wipremshelflife" : "0",
                    "Prctr" : "",
                    "Prodh" : "",
                    "Spart" : "",
                    "Gtin" : "",
                    "Upc" : "",
                    "Brgew" : "0",
                    "Ntgew" : "0",
                    "Ladgr" : "",
                    "Casedimensions" : "",
                    "Casespallet": "",
                    "Pallettihi" : "",
                    "Zzorganic" : "",
                    "Fgtotalselflife" : "0",
                    "Fgremshelflife" : "0",
                    "Incubationdays" : "0",
                    "Customtariffcode" : "",
                    "Itemnotes" : "",
                    "Land1" : "",
                    "Dpcategory" : "",
                    "Existmaterial" : "",
                    "Requestor" : ""                
                });
            },
            onGetData: function(oEvent){
                //Get Data from Screen
                var that = this;
                var oLocal = this.getView().getModel("local");
                var matnr = oLocal.getProperty("/MRFFGCreate/Thsmaterial");
                var oModel = this.getView().getModel();
                //Get the Data from Backend based on Material Number
                oModel.read("/MRFFGCreate('" + matnr + "')",{
                    success: function(odata){
                        // that.getView().byId("_IDIBatch").setVisible(true);
                        // that.getView().byId("_IDIMatdisc").setVisible(true);
                        // that.getView().byId("_IDIMattype").setVisible(true);                                    
                        // that.getView().byId("_IDIMatgroup").setVisible(true);
                        // that.getView().byId("_IDIMatclas").setVisible(true);
                        // that.getView().byId("_IDSubmit").setVisible(true);
                        oLocal.setProperty("/MRFFGCreate",odata);
                    },
                    error: function(error){
                        MessageBox.error(JSON.parse(error.responseText).error.message.value);
                    }
                });
   
               },
            
            checkRequird: function(oEvent){
              debugger;
              let oModel = this.getView().getModel();
              let oLocal = this.getView().getModel("local");
              var uom = oLocal.getProperty("/MRFFGCreate/Uom");
              let Mfgloc = oLocal.getProperty("/MRFFGCreate/Mfgloc");
              let pck_size = oLocal.getProperty("/MRFFGCreate/Packsize");
              let size_uom = oLocal.getProperty("/MRFFGCreate/Sizeuom");
              let fg_desc = oLocal.getProperty("/MRFFGCreate/Finishedesc");
              let mat_group = oLocal.getProperty("/MRFFGCreate/Sapmaterilgroup");
              let pro_For = oLocal.getProperty("/MRFFGCreate/Proprietaryformula");
              let prctr = oLocal.getProperty("/MRFFGCreate/Prctr");
              let prdha = oLocal.getProperty("/MRFFGCreate/Prdha");
              let sDivison = oLocal.getProperty("/MRFFGCreate/Division");
              let sLoadGroup = oLocal.getProperty("/MRFFGCreate/Loadgroup");
              let sOrgMog = oLocal.getProperty("/MRFFGCreate/Orgnicgmomatind");
              let shipLoc = oLocal.getProperty("/MRFFGCreate/Sloc");
              let CoutSal = oLocal.getProperty("/MRFFGCreate/Land1");
              
              
            
              //Unit of Messare
             
               debugger;  
               this.UomCheck();            
            //   if (uom == "") {
            //     this.getView().byId("IdIUom").setValueState("Error");
            //     this.vFlog = 'X'; 
            //   }else{
                
            //     let oFilter = new Filter({path:"Msehi",operator:FilterOperator.EQ,value1:uom});
            //     // oModel.read("/UomSet",{
            //     //     filters: [oFilter],
            //     //     success: function(ores){
            //     //         debugger;
            //     //         this.getView().byId("IdIUom").setValueState("None");
            //     //     },
            //     //     error: function(oError){
            //     //         debugger;
            //     //         this.getView().byId("IdIUom").setValueState("Error");
            //     //          this.vFlog = 'X'
            //     //     }
            //     // });
            //     oModel.read("/UomSet",{
            //         filters: [oFilter],
            //         success: function(odata){
            //             debugger;
            //         },
            //         error: function(error){
            //             debugger;
            //         }
            //     });
            //   }
              //Manufacturing Location
              if (Mfgloc == "") {
                this.getView().byId("IdIManLoc").setValueState("Error");
                this.vFlog = 'X' 
               }else{
                let amanloc = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    
                    amanloc [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (amanloc.includes(Mfgloc)) {
                    this.getView().byId("IdIManLoc").setValueState("None");
                  } else {
                    this.getView().byId("IdIManLoc").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Pakage Size
              if (pck_size == "") {
                this.getView().byId("IdIPack").setValueState("Error");
                this.vFlog = 'X' 
              }else{
                let aPkSize = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    
                    aPkSize [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aPkSize.includes(pck_size)) {
                    this.getView().byId("IdIPack").setValueState("None");
                  } else {
                    this.getView().byId("IdIPack").setValueState("Error");
                    this.vFlog = 'X'  
                  }
                
              }
             //Size Uom
             debugger;
             if (size_uom == "") {
                this.getView().byId("IdISUom").setValueState("Error");
                this.vFlog = 'X' 
              }else{
                let aSizeUom = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    
                    aSizeUom [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aSizeUom.includes(size_uom)) {
                    this.getView().byId("IdISUom").setValueState("None");
                  } else {
                    this.getView().byId("IdISUom").setValueState("Error");
                    this.vFlog = 'X'  
                  }
                
              }
              //Material Discription
             if (fg_desc == "") {
                this.getView().byId("IdIFGMatDes").setValueState("Error");
                this.vFlog = 'X' 
              }else{
                let aMatDes = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    
                    aMatDes [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aMatDes.includes(fg_desc)) {
                    this.getView().byId("IdIFGMatDes").setValueState("None");
                  } else {
                    this.getView().byId("IdIFGMatDes").setValueState("Error");
                    this.vFlog = 'X'  
                  }            
              }
               //SAP Material Group
               if (mat_group == "") {
                this.getView().byId("IdIMatGrp").setValueState("None"); 
              }else{
                  debugger;
                let aMatgroup = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aMatgroup [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aMatgroup.includes(mat_group)) {
                    this.getView().byId("IdIMatGrp").setValueState("None");
                  } else {
                    this.getView().byId("IdIMatGrp").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Proprietary Formula
              if (pro_For == "") {
                this.getView().byId("IdIProFor").setValueState("None"); 
              }else{
                let aPro_For = [];
                for (let i = 0; i < oLocal.getProperty("/test").length ; i++) {
                    aPro_For [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aPro_For.includes(pro_For)) {
                    this.getView().byId("IdIProFor").setValueState("None");
                  } else {
                    this.getView().byId("IdIProFor").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Profit Center
              if (prctr == "") {
                this.getView().byId("IdIPro").setValueState("None"); 
              }else{
                  debugger;
                let aPrctr = [];
                for (let i = 0; i < oLocal.getProperty("/test").length ; i++) {
                    aPrctr [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aPrctr.includes(prctr)) {
                    this.getView().byId("IdIPro").setValueState("None");
                  } else {
                    this.getView().byId("IdIPro").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Product Hierarchy
              if (prdha == "") {
                this.getView().byId("IdIPrdHir").setValueState("None"); 
              }else{
                let aPrdha = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aPrdha [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aPrdha.includes(prdha)) {
                    this.getView().byId("IdIPrdHir").setValueState("None");
                  } else {
                    this.getView().byId("IdIPrdHir").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }

              //SAP Division
              if (sDivison == "") {
                this.getView().byId("IdISAPDiv").setValueState("None"); 
              }else{
                let aDivison = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aDivison [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aDivison.includes(sDivison)) {
                    this.getView().byId("IdISAPDiv").setValueState("None");
                  } else {
                    this.getView().byId("IdISAPDiv").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //SAP Loading Group
              if (sLoadGroup == "") {
                this.getView().byId("IdISapLoad").setValueState("None"); 
              }else{
                let aLoadGroup = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aLoadGroup [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aLoadGroup.includes(sLoadGroup)) {
                    this.getView().byId("IdISapLoad").setValueState("None");
                  } else {
                    this.getView().byId("IdISapLoad").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Organic/GMO Mtl Ind
              if (sOrgMog == "") {
                this.getView().byId("IdIOrg").setValueState("None"); 
              }else{
                let aOrgMog = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aOrgMog [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aOrgMog.includes(sOrgMog)) {
                    this.getView().byId("IdIOrg").setValueState("None");
                  } else {
                    this.getView().byId("IdIOrg").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              //Shipping Location
              if (shipLoc == "") {
                this.getView().byId("IdIShLoc").setValueState("None"); 
              }else{
                let aShipLoc = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aShipLoc [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aShipLoc.includes(shipLoc)) {
                    this.getView().byId("IdIShLoc").setValueState("None");
                  } else {
                    this.getView().byId("IdIShLoc").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
               //Country of Sale
               if (CoutSal == "") {
                 this.getView().byId("IdICoutSal").setValueState("None"); 
                }else{
                let aCoutSal = [];
                for (let i = 0; i < oLocal.getProperty("/test").length; i++) {
                    aCoutSal [i] = oLocal.getProperty("/test")[i].unit;
                  }
                  //Checking Enterd value baded on help request
                  if (aCoutSal.includes(CoutSal)) {
                    this.getView().byId("IdICoutSal").setValueState("None");
                  } else {
                    this.getView().byId("IdICoutSal").setValueState("Error");
                    this.vFlog = 'X'  
                  }
              }
              
            },
            UomCheck: function(oEvent){
                let oModel = this.getView().getModel();
              let oLocal = this.getView().getModel("local");
              var uom = oLocal.getProperty("/MRFFGCreate/Uom");
                debugger;
                if (uom == "") {
                    this.getView().byId("IdIUom").setValueState("Error");
                    this.vFlog = 'X'; 
                  }else{
                    
                    let oFilter = new Filter({path:"Msehi",operator:FilterOperator.EQ,value1:uom});
                    // oModel.read("/UomSet",{
                    //     filters: [oFilter],
                    //     success: function(ores){
                    //         debugger;
                    //         this.getView().byId("IdIUom").setValueState("None");
                    //     },
                    //     error: function(oError){
                    //         debugger;
                    //         this.getView().byId("IdIUom").setValueState("Error");
                    //          this.vFlog = 'X'
                    //     }
                    // });
                    oModel.read("/UomSet",{
                        filters: [oFilter],
                        success: function(odata){
                            debugger;
                        },
                        error: function(error){
                            debugger;
                        }
                    });
                  }
            },
            oUomDialog:null,
            oManLocDialog:null, 
            oShLocDialog:null,
            oMatGrpDialog:null,     
            oPrctrDialog:null,      
            oPrdhaDialog:null,  
            oSdivDialog:null,
            oSapLoadDialog:null,
            oOGMIDialog:null, 
            oProForDialog:null,
            oCoutSalDialog:null,  
            oDpcatDialog:null,         
            selectedUomf4Id:null,
            selectedManLocf4Id:null,
            selectedShLocf4Id:null,
            selectedMatGrpf4Id:null,
            selectedPrctrf4Id:null,
            selectedPrdhaf4Id:null,
            selectedSdivf4Id:null,
            selectedSapLoadf4Id:null,
            selectedOGMIf4Id:null,
            selectedProForf4Id:null,
            selectedCoutSalf4Id:null,
            selectedDpcatf4Id:null,
            //Unit of Messere 
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
                      debugger;
                      that.getView().addDependent(oUomDialog);
                      oUomDialog.open();
                      that.oUomDialog = oUomDialog;
                  });
                }else{
                  that.oUomDialog.open();
                }
            },
            // Manufacturing  Location
            onHelpManLoc: function(oEvent){
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
            // Shipping Location
            onHelpShLoc: function(oEvent){
                var that = this;
                this.selectedShLocf4Id = oEvent.getSource().getId();
                if (!this.oShLocDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFShloc"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectShLoc",
                      controller: this
                  }).then(function(oShLocDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oShLocDialog);
                      oShLocDialog.open();
                      that.oShLocDialog = oShLocDialog;
                  });
                }else{
                  that.oShLocDialog.open();
                }
            },
            // SAP Material Group
            onHelpMatGrp: function(oEvent){
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
            // Product Hierarchy
            onHelpPrdha:function(oEvent){
                var that = this;
                this.selectedPrdhaf4Id = oEvent.getSource().getId();
                if (!this.oPrdhaDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFPrdha"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectPrdha",
                      controller: this
                  }).then(function(oPrdhaDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oPrdhaDialog);
                      oPrdhaDialog.open();
                      that.oPrdhaDialog = oPrdhaDialog;
                  });
                }else{
                  that.oPrdhaDialog.open();
                }
            },
            // SAP Division
            onHelpSdiv:function(oEvent){
                var that = this;
                this.selectedSdivf4Id = oEvent.getSource().getId();
                if (!this.oSdivDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFSdiv"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectSdiv",
                      controller: this
                  }).then(function(oSdivDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oSdivDialog);
                      oSdivDialog.open();
                      that.oSdivDialog = oSdivDialog;
                  });
                }else{
                  that.oSdivDialog.open();
                }
            },
              // SAP Loading Group           
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
            // Organic/GMO Mtl Ind
            onHelpOGMI:function(oEvent){
                var that = this;
                this.selectedOGMIf4Id = oEvent.getSource().getId();
                if (!this.oOGMIDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFLOGMI"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectOGMI",
                      controller: this
                  }).then(function(oOGMIDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oOGMIDialog);
                      oOGMIDialog.open();
                      that.oOGMIDialog = oOGMIDialog;
                  });
                }else{
                  that.oOGMIDialog.open();
                }
            },
            // Proprietary Formula
            onHelpProFor:function(oEvent){
                var that = this;
                this.selectedProForf4Id = oEvent.getSource().getId();
                if (!this.oProForDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFProFor"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectProFor",
                      controller: this
                  }).then(function(oProForDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oProForDialog);
                      oProForDialog.open();
                      that.oProForDialog = oProForDialog;
                  });
                }else{
                  that.oProForDialog.open();
                }
            },
            // Country of Sale
            onHelpCoutSal:function(oEvent){
                var that = this;
                this.selectedCoutSalf4Id = oEvent.getSource().getId();
                if (!this.oCoutSalDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFCountry"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.SelectCountry",
                      controller: this
                  }).then(function(oCoutSalDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oCoutSalDialog);
                      oCoutSalDialog.open();
                      that.oCoutSalDialog = oCoutSalDialog;
                  });
                }else{
                  that.oCoutSalDialog.open();
                }
            },
            // DP Category
            onHelpDpcat:function(oEvent){
                var that = this;
                this.selectedDpcatf4Id = oEvent.getSource().getId();
                if (!this.oDpcatDialog) {
                  Fragment.load({
                      id: this.getView().createId("IdFDpcat"),
                      name:"ze919mrfmaterialcreate.ze919mrfmaterialcreate.fragments.Dpcat",
                      controller: this
                  }).then(function(oDpcatDialog){
                      //Connect Fragment to root View
                      that.getView().addDependent(oDpcatDialog);
                      oDpcatDialog.open();
                      that.oDpcatDialog = oDpcatDialog;
                  });
                }else{
                  that.oDpcatDialog.open();
                }
            },
           
             //Unit of Messere 
            onSelectUom: function(oEvent){
                debugger;
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Msehi 
                            // +'-'+ oEvent.getSource().getSelectedItem().getBindingContext().getObject().Msehl
                var ifield = sap.ui.getCore().byId(this.selectedUomf4Id);
                ifield.setValue(sItem);
                this.onUomClose();

            },
            // Manufacturing  Location
            onSelectManLoc: function(oEvent){
                
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Werks 
                        //    +'-'+ oEvent.getSource().getSelectedItem().getBindingContext().getObject().Name1
                var ifield = sap.ui.getCore().byId(this.selectedManLocf4Id);
                ifield.setValue(sItem);
                this.onManLocClose();
            },
            // Shipping Location
            onSelectShLoc: function(oEvent){
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Werks
                var ifield = sap.ui.getCore().byId(this.selectedShLocf4Id);
                ifield.setValue(sItem);
                this.onShLocClose();
            },    
            // SAP Material Group            
            onSelectMatGrp: function(oEvent){
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Matkl
                var ifield = sap.ui.getCore().byId(this.selectedMatGrpf4Id);
                ifield.setValue(sItem);
                this.onMatGrpClose();            
            },   
            // Profit Center
            onSelectPrctr: function(oEvent){
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Prctr
                var ifield = sap.ui.getCore().byId(this.selectedPrctrf4Id);
                ifield.setValue(sItem);
                this.onPrctrClose();
            },   
            // Product Hierarchy
            onSelectPrdha: function(oEvent){               
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Prodh
                var ifield = sap.ui.getCore().byId(this.selectedPrdhaf4Id);
                ifield.setValue(sItem);
                this.onPrdhaClose();
            },  
            // SAP Division            
            onSelectSdiv: function(oEvent){           
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Spart
                var ifield = sap.ui.getCore().byId(this.selectedSdivf4Id);
                ifield.setValue(sItem);
                this.onSdivClose();
            },  
            // SAP Loading Group
            onSelectSapLoad: function(oEvent){           
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Ladgr
                var ifield = sap.ui.getCore().byId(this.selectedSapLoadf4Id);
                ifield.setValue(sItem);
                this.onSapLoadClose();
            },
            // Organic/GMO Mtl Ind
            onSelectOGMI: function(oEvent){    
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Zzorganic
                var ifield = sap.ui.getCore().byId(this.selectedOGMIf4Id);
                ifield.setValue(sItem);
                this.onOGMIClose();
            },
            // Proprietary Formula
            onSelectProFor: function(oEvent){    
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Zzrecipeind;
                var ifield = sap.ui.getCore().byId(this.selectedProForf4Id);
                ifield.setValue(sItem);
                this.onProForClose();
            },
            // Country of Sale
            onSelectCoutSal: function(oEvent){    
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Land1
                var ifield = sap.ui.getCore().byId(this.selectedCoutSalf4Id);
                ifield.setValue(sItem);
                this.onCoutSalClose();
            },
            // DP Category 
            onSelectDpcat: function(oEvent){    
                var sItem = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Zzdpcategory
                var ifield = sap.ui.getCore().byId(this.selectedDpcatf4Id);
                ifield.setValue(sItem);
                this.onDpcatClose();
            },            
            
            // Unit of Messere
            onSearchUom: function(oEvent){
                debugger;
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Msehi", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Msehl", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFUom"), "IdUomTable");
                table.getBinding("items").filter([ofilter]);
            },
            // Manufacturing  Location
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
            // Shipping Location
            onSearchShLoc: function(oEvent){
                debugger;
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Werks", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Name1", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFShloc"), "IdShLocTable");
                // let table = sap.ui.getCore().byId("IdShLocTable");
                table.getBinding("items").filter([ofilter]);           
             },
            // SAP Material Group
            onSearchMatGrp: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Matkl", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Wgbez", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFMatGrp"), "IdMatGrpTable");
                // let table = sap.ui.getCore().byId("IdMatGrpTable");
                table.getBinding("items").filter([ofilter]);   
            },
            // Profit Center
            onSearchPrctr: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Prctr", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Ktext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });          
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFPrctr"), "IdPrctrTable");
                // let table = sap.ui.getCore().byId("IdPrctrTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // Product Hierarchy
            onSearchPrdha: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Prodh", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Vtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFPrdha"), "IdPrdhaTable");
                // let table = sap.ui.getCore().byId("IdPrdhaTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // SAP Division
            onSearchSdiv: function(oEvent){
                debugger;
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Spart", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Vtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFSdiv"), "IdSdivTable");
                // let table = sap.ui.getCore().byId("IdSdivTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // SAP Loading Group
            onSearchSapLoad: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Ladgr", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Vtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFLGroup"), "IdSapLoadTable");
                // let table = sap.ui.getCore().byId("IdSapLoadTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // Organic/GMO Mtl Ind
            onSearchOGMI: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Zzorganic", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Ddtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFLOGMI"), "IdOGMITable");
                table.getBinding("items").filter([ofilter]); 
            },
            // Country of Sale
            onSearchCoutSal: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Land1", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Landx50", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFCountry"), "IdCoutSalTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // Proprietary Formula
            onSearchProFor: function(oEvent){
                debugger;
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Zzrecipeind", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Ddtext", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFProFor"), "IdProForTable");
                // let table = sap.ui.getCore().byId("IdProForTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // DP Category
            onSearchDpcat: function(oEvent){
                let sValue = oEvent.getParameter("newValue");
                let ofilter = new Filter({
                    filters:[new Filter({path: "Zzdpcategory", operator:FilterOperator.Contains, value1: sValue}),
                    new Filter({path: "Zzdpcatdesc", operator:FilterOperator.Contains, value1: sValue})],and:false
                });
                let table = sap.ui.core.Fragment.byId(this.getView().createId("IdFDpcat"), "IdDpcatTable");
                table.getBinding("items").filter([ofilter]); 
            },
            // Base UOM
            onUomClose: function(oEvent){
                debugger;
                this.oUomDialog.close();
            },
            // Shipping Location
            onShLocClose: function(oEvent){
                this.oShLocDialog.close();
            },
            // Manufacturing Location
            onManLocClose: function(oEvent){
                this.oManLocDialog.close();
            },
            // SAP Material Group
            onMatGrpClose: function(oEvent){
                this.oMatGrpDialog.close();
            },
            // Profit Center
            onPrctrClose: function(oEvent){
                this.oPrctrDialog.close();
            },
            // Product Hierarchy
            onPrdhaClose: function(oEvent){
                this.oPrdhaDialog.close();
            },
            // SAP Division
            onSdivClose: function(oEvent){
                this.oSdivDialog.close();
            },
            // SAP Loading Group
            onSapLoadClose: function(oEvent){
                this.oSapLoadDialog.close();
            },
            // Country of Sale
            onCoutSalClose: function(oEvent){
                this.oCoutSalDialog.close();
            },
            // Country of Sale
            onOGMIClose: function(oEvent){
                this.oOGMIDialog.close();
            },
            // Proprietary Formula
            onProForClose: function(oEvent){
                this.oProForDialog.close();
            },
            // DP Category
            onDpcatClose: function(oEvent){
                this.oDpcatDialog.close();
            }
        });
    });
