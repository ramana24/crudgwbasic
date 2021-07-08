sap.ui.define([
	"./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
	"../model/formatter",
    "sap/m/library",
    "sap/m/MessageToast"
], function (BaseController, JSONModel,ODataModel, formatter, mobileLibrary,MessageToast) {
	"use strict";

	// shortcut for sap.m.URLHelper
	var URLHelper = mobileLibrary.URLHelper;

	return BaseController.extend("ux.crudgwbasic.controller.Detail", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0,
				lineItemListTitle : this.getResourceBundle().getText("detailLineItemTableHeading")
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
        },


		onCreateRecord:function(oEvent){
			var oParentContext,
			oModel = this.getView().getModel();
		
		oParentContext = oModel.createEntry("BusinessPartnerSet", {
		   properties : {
			
			
				Address: {
				 
				  City: "Chennai12",
				  PostalCode: "510613",
				  Street: "No. 233 Tien He Road North",
				  Building: "6402-6403a",
				  Country: "CN",
				  AddressType: "02"
				},
				BusinessPartnerID: "0100000004",
				CompanyName: "ChinaChain",
				WebAddress: "t.comy",
				EmailAddress: "customer125@t.com",
				PhoneNumber: "+86 20 86454650",
				FaxNumber: "+86 20 86454004",
				LegalForm: "WFOE",
				CurrencyCode: "USD",
				BusinessPartnerRole: "01",
				CreatedAt: "/Date(1625709646000)/",
				ChangedAt: "/Date(1625709646000)/",
				ToSalesOrders: {
				 
				},
				ToContacts: {
				 
				},
				ToProducts: {
				 
				}
			  
			  
		   },
		   success : function () {
		//	console.log("successfully record entered");
		   }
		});
		
		oModel .setUseBatch(false);
		oModel.submitChanges();

		},
        
        onCreate:function(oEvent){

//var oModelPartner= new ODataModel();

  var oModel = this.getView().getModel();
//var O={};
            var oKey="0100000000";
            var oSaledData = {
   "SalesOrderID": "0500000099",
"Note": "EPM DG: SO ID 0500000015",
"NoteLanguage": "",
"CustomerID": "0100000000",
"CustomerName": "Banglore",
"CurrencyCode": "USD",
"GrossAmount": "11.80",
"NetAmount": "9.92",
"TaxAmount": "1.88",
"LifecycleStatus": "C",
"LifecycleStatusDescription": "Closed",
"BillingStatus": "P",
"BillingStatusDescription": "Paid",
"DeliveryStatus": "D",
"DeliveryStatusDescription": "Delivered",
"CreatedAt": "/Date(1451775600000)/",
"ChangedAt": "/Date(1452380400000)/",
};

//O.push(oData);
// oModelPartner.createEntry("/BusinessPartnerSet('0100000000')/ToSalesOrders", oData, 
// function(oSuccess){
//     console.log("success");
// },
// function(oError){
// console.log("error");
// }

// );
      

//Deep Create

var oParentContext,
 //var   oModel = this.getView().getModel();

oParentContext = oModel.createEntry("/BusinessPartnerSet", {
   properties : {
	
		"__metadata": {
		  "id": "https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet('0100000004')",
		  "uri": "https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet('0100000004')",
		  "type": "GWSAMPLE_BASIC.BusinessPartner",
		  "etag": "W/\"datetime'2021-07-08T02%3A00%3A46.0000000'\""
		},
		"Address": {
		  "__metadata": {
			"type": "GWSAMPLE_BASIC.CT_Address"
		  },
		  "City": "New Delhi",
		  "PostalCode": "510613",
		  "Street": "No. 233 Tien He Road North",
		  "Building": "6402-6403a",
		  "Country": "CN",
		  "AddressType": "02"
		},
		"BusinessPartnerID": "0100000004",
		"CompanyName": "FioriUX",
		"WebAddress": "http://www.chinachain.test.com",
		"EmailAddress": "customer2@sap.com",
		"PhoneNumber": "+86 20 86454650",
		"FaxNumber": "+86 20 86454004",
		"LegalForm": "WFOE",
		"CurrencyCode": "USD",
		"BusinessPartnerRole": "01",
		"CreatedAt": "/Date(1625709646000)/",
		"ChangedAt": "/Date(1625709646000)/",
		"ToSalesOrders": {
		  "__deferred": {
			"uri": "https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet('0100000004')/ToSalesOrders"
		  }
		},
		"ToContacts": {
		  "__deferred": {
			"uri": "https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet('0100000004')/ToContacts"
		  }
		},
		"ToProducts": {
		  "__deferred": {
			"uri": "https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/BusinessPartnerSet('0100000004')/ToProducts"
		  }
		}
	  
   },
   success : function () {
      oChildContext = oModel.createEntry("ToSalesOrders", {
         context : oParentContext,
         properties : 
            // properties for the new item of the new sales order

			oSaledData
         ,
         success : function () {
            // ...
         }
      });
      oModel.submitChanges();
   }
});

oModel.submitChanges();


},




mySuccessHandler:function(oResponse){

    this.getView().byId("lineItemsList").setModel("oModelPartner");
    MessageToast.show("New Entry Created"+ oResponse);
    console.log("recored created.");
},
myErrorHandler:function(oError){
    console.log("request failed");
     MessageToast.show("Request Failed"+ oError);
},


onRead:function(oEvent){

//    var oModelView= new ODataModel();

 var oModelView = this.getView().getModel();
    oModelView.read("/BusinessPartnerSet('0100000001')", {success: myViewSuccessHandler, error: myViewErrorHandler});

},
myViewSuccessHandler:function(oSuccess){
this.getView().byId("lineItemsList").setModel("oModelView");
    MessageToast.show("New Record 0100000001 data is fetched "+ oSuccess);
    console.log("recored created.");

},
myViewErrorHandler:function(err){
 console.log("read request failed");
     MessageToast.show("Read Request Failed"+ err);
},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onSendEmailPress : function () {
			var oViewModel = this.getModel("detailView");

			URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},


		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished : function (oEvent) {
			var sTitle,
				iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("detailView");

			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getModel().metadataLoaded().then( function() {
				var sObjectPath = this.getModel().createKey("BusinessPartnerSet", {
					BusinessPartnerID :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound to the view.
		 * @private
		 */
		_bindView : function (sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path : sObjectPath,
				events: {
					change : this._onBindingChange.bind(this),
					dataRequested : function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange : function () {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}

			var sPath = oElementBinding.getPath(),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.BusinessPartnerID,
				sObjectName = oObject.CompanyName,
				oViewModel = this.getModel("detailView");

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		_onMetadataLoaded : function () {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);

			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},

		/**
		 * Set the full screen mode to false and navigate to master page
		 */
		onCloseDetailPress: function () {
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
			// No item should be selected on master after detail page is closed
			this.getOwnerComponent().oListSelector.clearMasterListSelection();
			this.getRouter().navTo("master");
		},

		/**
		 * Toggle between full and non full screen mode.
		 */
		toggleFullScreen: function () {
			var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
			if (!bFullScreen) {
				// store current layout and go full screen
				this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
				this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
			} else {
				// reset to previous layout
				this.getModel("appView").setProperty("/layout",  this.getModel("appView").getProperty("/previousLayout"));
			}
		}
	});

});