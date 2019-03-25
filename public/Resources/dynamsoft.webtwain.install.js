
function OnWebTwainNotFoundOnWindowsCallback(ProductName, InstallerUrl) {
	
	// ruta en gooogle docs del documento que contiene el manual de instalaciòn en pdf.
	var RutamanualInstalacion = 'https://drive.google.com/a/independencia.com.mx/file/d/0B-TubnFk73niVEJVaG1JOENDd3M/view?usp=sharing';
	
	
	InstallerUrl = "https://drive.google.com/uc?id=0B-TubnFk73nid2ZvTXlmLVZETlU&authuser=0&export=download";
	
	console.log("InstallerUrl");
	console.log(InstallerUrl);
	
	
    var ObjString = [
		'<div class="dwt-box-title">' + ProductName + ' no esta instalado.</div>',
		'<ul>',
		'<li>Si ya se se instal\u00F3 el esc\u00E1ner , favor de esperar unos segundos en lo que inicia.</li>',
		'<li>Si no se ha instalado. Favor de presionar el siguiente boton para descargarlo e instalarlo.',
		'</ul>',
		'<ul>',
		'<a target="_blank" href="' + RutamanualInstalacion + '" style="font-size: 2em;" > Manual de instalaci\u00F3n </a>',
		'</ul>',
		'<a id="dwt-btn-install" target="_blank" href="' + InstallerUrl + '" onclick="Dynamsoft_OnClickInstallButton()"><div class="dwt-button"></div></a>',
		];

	//Dynamsoft.WebTwainEnv.ShowDialog(392, 310, ObjString.join(''));
    Dynamsoft.WebTwainEnv.ShowDialog('100%', '100%', ObjString.join(''));
}

function OnWebTwainNotFoundOnMacCallback(ProductName, InstallerUrl) {
    var ObjString =
        [
		'<div class="dwt-box-title">',
		ProductName,
		' is not installed</div>',
		'<ul>',
		'<li>Please click the below button to download and install it.</li>',
		'</ul>',
		'<p class="dwt-red">If you still see this dialog after the installation, please REFRESH your browser.</p>',
		'If you are using Safari 5.0, you need to <a href="http://kb.dynamsoft.com/questions/666/How+to+run+Safari+5.0+in+32-bit+mode+on+Mac+OS+X"><span class="link">run the browser in 32-bit Mode</span></a>.',
		'<a id="dwt-btn-install" target="_blank" href="',
		InstallerUrl,
		'" onclick="Dynamsoft_OnClickInstallButton()"><div class="dwt-button"></div></a>',
		];

	Dynamsoft.WebTwainEnv.ShowDialog(392, 277, ObjString.join(''));
}

function OnWebTwainOldPluginNotAllowedCallback(ProductName) {
    var ObjString = [
		'<div class="dwt-box-title">',
		ProductName,
		' plugin is not allowed to run on this site.</div>',
		'<ul>',
		'<li>Please click "<b>Always run on this site</b>" for the prompt "',
		ProductName,
		' Plugin needs your permission to run", then <a href="javascript:void(0);" style="color:blue" class="ClosetblCanNotScan">close</a> this dialog OR refresh/restart the browser and try again.</li>',
		'</ul>'];

	Dynamsoft.WebTwainEnv.ShowDialog(392, 227, ObjString.join(''));
}

function OnWebTwainNeedUpgradeCallback(ProductName, InstallerUrl){
	var ObjString = ['<div class="dwt-box-title"></div>',
		'<div style="font-size: 15px;">',
		'This page is using a newer version of Dynamic Web TWAIN than your local copy. Please download and upgrade now.',
		'</div>',
		'<a id="dwt-btn-install" target="_blank" href="',
		InstallerUrl,
		'" onclick="Dynamsoft_OnClickInstallButton()"><div class="dwt-button"></div></a>',
		'<p class="dwt-red">Please REFRESH your browser after the upgrade.</p>'];

	Dynamsoft.WebTwainEnv.ShowDialog(392, 227, ObjString.join(''));
}
