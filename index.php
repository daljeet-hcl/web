<?php
require('inc/php/dispatch.php');

route('GET', '/', function () {
	if ($_GET["shabadid"] && $_GET["id"]) {
		$shabadid = $_GET["shabadid"];
		$id = $_GET["id"];
		return response("", 302, ['Location' => 'https://gurbaninow.com/shabad/'.$shabadid.'/'.$id]);
	} elseif ($_GET["shabadid"]) {
		$shabadid = $_GET["shabadid"];
		return response("", 302, ['Location' => 'https://gurbaninow.com/shabad/'.$shabadid]);
	} else {
		return response(file_get_contents('inc/main.html'), 200, ['content-type' => 'text/html; charset=utf-8']);
	}
});

route('GET', '/assets/js/:file/:version/js.js', function ($args) {
	$name = realpath('assets/js/'.$args['file']);
	if (substr($name, 0, strlen(dirname(__FILE__))) === dirname(__FILE__)) {
		$file = file_get_contents($name);
	}
	require('inc/php/packer.php');
	$packer = new Tholu\Packer\Packer($file, 'Normal', true, false, true);
	$packedjs = $packer->pack();
	return response($packedjs, 200, ['content-type' => 'application/javascript; charset=utf-8', 'cache-control' => 'public, max-age=31536000', 'Etag' => 'W/"'.md5($packedjs).'"']);
});

route('GET', '/assets/css/:file/:version/css.css', function ($args) {
	$name = realpath('assets/css/'.$args['file']);
	if (substr($name, 0, strlen(dirname(__FILE__))) === dirname(__FILE__)) {
		$file = file_get_contents($name);
	}
	return response($file, 200, ['content-type' => 'text/css; charset=utf-8', 'cache-control' => 'public, max-age=31536000', 'Etag' => 'W/"'.md5($file).'"']);
});

route('GET', '/shabad/random', function () {
	$html = file_get_contents('inc/shabad.html');
	$html .= "\n<div id=\"shabadid\" data-shabadid=\"".rand(1, 5540)."\"></div>\n";
	$html .= "<div id=\"lineid\" data-lineid=\"\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8']);
});

route('GET', '/shabad/:shabadid', function ($args) {
	$html = file_get_contents('inc/shabad.html');
	$html .= "\n<div id=\"shabadid\" data-shabadid=\"".$args['shabadid']."\"></div>\n";
	$html .= "<div id=\"lineid\" data-lineid=\"\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/shabad/:shabadid/:id', function ($args) {
	$html = file_get_contents('inc/shabad.html');
	$html .= "\n<div id=\"shabadid\" data-shabadid=\"".$args['shabadid']."\"></div>\n";
	$html .= "<div id=\"lineid\" data-lineid=\"".$args['id']."\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/present', function () {
	return response(file_get_contents('inc/present.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/present/view', function () {
	return response(file_get_contents('inc/view.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/page/:page', function ($args) {
	$html = file_get_contents('inc/ang.html');
	$html .= "\n<div id=\"page\" data-page=\"".$args['page']."\"></div>\n";
	$html .= "<div id=\"sourceid\" data-sourceid=\"G\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/page/:page/:id', function ($args) {
	$html = file_get_contents('inc/ang.html');
	$html .= "\n<div id=\"page\" data-page=\"".$args['page']."\"></div>\n";
	$html .= "<div id=\"sourceid\" data-sourceid=\"".$args['id']."\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/hukamnama', function () {
	return response(file_get_contents('inc/hukamnama.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/about', function () {
	return response(file_get_contents('inc/about.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/about/opensource', function () {
	return response(file_get_contents('inc/oss.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/about/terms', function () {
	return response(file_get_contents('inc/tos.html'), 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/amritkeertan', function () {
	$html = "Coming Soon!";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8', ]);
});

route('GET', '/share/hukamnama', function () {
	$html = file_get_contents('inc/share.html');
	$shabadnumber = $args['shabadid'];
	$larivaar = $_GET['lari'];
	$noeng = $_GET['noeng'];
	$reddit = $_GET['markdown'];
	$arrContextOptions = stream_context_create(array(
		"ssl"=>array(
			"verify_peer"=>false,
			"verify_peer_name"=>false,
		),
	));  
	$json = file_get_contents("https://10.136.26.244/v2/hukamnama/today", false, $arrContextOptions);
	$jarray = json_decode($json, true);
	$mainrow = $jarray['hukamnama'];
	foreach ($mainrow as $rows) {
		foreach ($rows as $row) {
			if($reddit == "1") {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				$html .= "<span class=\"gurbani\">#### **<b>".$gurbani."</b>**</span><br>";
				if ($row['translation']['english']['default'] != "") {
					$html .= "> ".$row['translation']['english']['default']."<br><br>";
				} else {
					$html .= "<br>";
				}
			} else {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				if(!$noeng){ 
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
					if($row['translation']['english']['default'] != "") {
						$html .= $row['translation']['english']['default']."<br><br>";
					} else {
						$html .= "<br>";
					}
				} else {
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
				}
			}
		}
	}
	if($reddit == "1") {			
		$html .= "------<br>";
		$html .= "### ".$jarray['shabadinfo']['writer']['english']." • ".$jarray['shabadinfo']['raag']['english']." • Page ".$jarray['shabadinfo']['pageno'];
		$html .= "<br>";
		$html .= "[Source - GurbaniNow](https://gurbaninow.com/shabad/$shabadnumber)";
	}
	$html .= "</div>\n";
	$html .= "</body>\n";
	$html .= "<div id=\"shabadid\" data-shabadid=\"hukamnama\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8']);
});

route('GET', '/share/:shabadid', function ($args) {
	$html = file_get_contents('inc/share.html');
	$shabadnumber = $args['shabadid'];
	$larivaar = $_GET['lari'];
	$noeng = $_GET['noeng'];
	$reddit = $_GET['markdown'];
	$arrContextOptions = stream_context_create(array(
		"ssl"=>array(
			"verify_peer"=>false,
			"verify_peer_name"=>false,
		),
	));  
	$json = file_get_contents("https://10.136.26.244/v2/shabad/$shabadnumber", false, $arrContextOptions);
	$jarray = json_decode($json, true);
	$mainrow = $jarray['shabad'];
	foreach ($mainrow as $rows) {
		foreach ($rows as $row) {
			if($reddit == "1") {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				$html .= "<span class=\"gurbani\">#### **<b>".$gurbani."</b>**</span><br>";
				if ($row['translation']['english']['default'] != "") {
					$html .= "> ".$row['translation']['english']['default']."<br><br>";
				} else {
					$html .= "<br>";
				}
			} else {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				if(!$noeng){ 
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
					if($row['translation']['english']['default'] != "") {
						$html .= $row['translation']['english']['default']."<br><br>";
					} else {
						$html .= "<br>";
					}
				} else {
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
				}
			}
		}
	}
	if($reddit == "1") {			
		$html .= "------<br>";
		$html .= "### ".$jarray['shabadinfo']['writer']['english']." • ".$jarray['shabadinfo']['raag']['english']." • Page ".$jarray['shabadinfo']['pageno'];
		$html .= "<br>";
		$html .= "[Source - GurbaniNow](https://gurbaninow.com/shabad/$shabadnumber)";
	}
	$html .= "</div>\n";
	$html .= "</body>\n";
	$html .= "<div id=\"shabadid\" data-shabadid=\"".$args['shabadid']."\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8']);
});

route('GET', '/share/page/:page/:id', function ($args) {
	$html = file_get_contents('inc/pageshare.html');
	$pageno = $args['page'];
	$sourceid = $args['id'];
	$larivaar = $_GET['lari'];
	$noeng = $_GET['noeng'];
	$reddit = $_GET['markdown'];
	$arrContextOptions = stream_context_create(array(
		"ssl"=>array(
			"verify_peer"=>false,
			"verify_peer_name"=>false,
		),
	));  
	$json = file_get_contents("https://10.136.26.244/v2/ang/$pageno/$sourceid", false, $arrContextOptions);
	$jarray = json_decode($json, true);
	$mainrow = $jarray['page'];
	foreach ($mainrow as $rows) {
		foreach ($rows as $row) {
			if($reddit == "1") {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				$html .= "<span class=\"gurbani\">#### **<b>".$gurbani."</b>**</span><br>";
				if ($row['translation']['english']['default'] != "") {
					$html .= "> ".$row['translation']['english']['default']."<br><br>";
				} else {
					$html .= "<br>";
				}
			} else {
				if($larivaar == "1") {
					$gurbani = $row['larivaar']['unicode'];
				} else {
					$gurbani = $row['gurmukhi']['unicode'];
				}
				if(!$noeng){ 
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
					if($row['translation']['english']['default'] != "") {
						$html .= $row['translation']['english']['default']."<br><br>";
					} else {
						$html .= "<br>";
					}
				} else {
					$html .= "<span class=\"gurbani\"><b>".$gurbani."</b></span><br>";
				}
			}
		}
	}
	if($reddit == "1") {			
		$html .= "------<br>";
		$html .= "### ".$jarray['source']['english']." • Page ".$jarray['pageno'];
		$html .= "<br>";
		$html .= "[Source - GurbaniNow](https://gurbaninow.com/page/$pageno/$sourceid)";
	}
	$html .= "</div>\n";
	$html .= "</body>\n";
	$html .= "<div id=\"page\" data-page=\"".$args['page']."\"></div>\n";
	$html .= "<div id=\"sourceid\" data-sourceid=\"".$args['id']."\"></div>\n";
	$html .= "</html>";
	return response($html, 200, ['content-type' => 'text/html; charset=utf-8']);
});

dispatch();
?>