/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ze919mrfmaterialcreate/ze919_mrf_material_create/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
