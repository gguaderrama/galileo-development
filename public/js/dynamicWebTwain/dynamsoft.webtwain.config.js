//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2014, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 10.2.0.324
//
/// <reference path="dynamsoft.webtwain.initiate.js" />

var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = false;
///
Dynamsoft.WebTwainEnv.Containers = [{ContainerId:'dwtcontrolContainer', Width:'400'/*wf*/, Height:'384'/*hf*/},
                                    {ContainerId:'dwtcontrolContainerMiniatures', Width:'150'/*wm*/, Height:'384'/*hf*/}];
///
Dynamsoft.WebTwainEnv.ProductKey = '5D97D438291D4BF53B644CA21912DB05EBFB3766DDFA168C22CAE23D1A1A7F4410000000',
///
Dynamsoft.WebTwainEnv.Trial = true;
///
Dynamsoft.WebTwainEnv.Debug = false; // only for debugger output
///
Dynamsoft.WebTwainEnv.ResourcesPath = '../../../Resources';

/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.

// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
//	 console.log("Scanner load ...." + hf + " " + wf);
// });

