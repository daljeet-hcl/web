<?php
error_reporting(0);
header('Content-Type: text/html; charset=utf-8');
echo "<html>";
echo "<head>";
echo "<title>GurbaniNow: Unicode Share</title>";
echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
echo "<style>
@font-face {
    font-family: Anmol;
    src: url(AnmolUniBaniHeavyTrue.ttf);
}

.gurbani {
    font-family: Anmol;
}
</style>";
echo "</head>";
echo "<body>";
$shabadnumber = $_GET['shabadid'];
$larivaar = $_GET['lari'];
$noeng = $_GET['noeng'];
$reddit = $_GET['markdown'];
$arrContextOptions = stream_context_create(array(
	"ssl"=>array(
		"verify_peer"=>false,
		"verify_peer_name"=>false,
	),
));  
$json = file_get_contents("https://10.136.33.139/shabad/$shabadnumber", false, $arrContextOptions);
$jarray = json_decode($json, true);
echo "<a href=\"?shabadid=$shabadnumber\">Standard</a> - <a href=\"?shabadid=$shabadnumber&lari=1\">Larivaar</a> - <a href=\"?shabadid=$shabadnumber&noeng=1\">No English</a> - <a href=\"?shabadid=$shabadnumber&lari=1&noeng=1\">Larivaar + No English</a> - <a href=\"?shabadid=$shabadnumber&markdown=1\">Reddit (Markdown)</a> - <a href=\"?shabadid=$shabadnumber&markdown=1&lari=1\">Reddit (Markdown) + Larivaar</a>";
echo "<p>Work In Progress, Report any Errors to me@sarabveer.me</p>";
echo "<p>Copy and Paste the Shabad where you want to share it</p>";
echo "<hr>";
foreach ($jarray as $rowsz) {
	foreach ($rowsz as $rows) {
		foreach ($rows as $row) {
			if($reddit == "1") {
				if($larivaar == "1") {
					$gurbani = $row['LarivaarUni'];
				} else {
					$gurbani = $row['GurmukhiUni'];
				}
				echo  "<span class=\"gurbani\">#### **".$gurbani."**</span><br>";
				if ($row['English'] != "") {
					echo "> ".$row['English']."<br><br>";
				} else {
					echo "<br>";
				}
			} else {
				if($larivaar == "1") {
					$gurbani = $row['LarivaarUni'];
				} else {
					$gurbani = $row['GurmukhiUni'];
				}
				if(!$noeng){ 
					echo "<span class=\"gurbani\">".$gurbani."</span><br>";
					if($row['English'] != "") {
						echo $row['English']."<br><br>";
					} else {
						echo "<br>";
					}
				} else {
					echo "<span class=\"gurbani\">".$gurbani."</span><br><br>";
				}
			}
		}
	}
}
if($reddit == "1") {			
	echo "------<br>";
	echo "### ".$jarray['gurbani'][0]['shabad']['WriterEnglish']." • ".$jarray['gurbani'][0]['shabad']['RaagEnglish']." • Ang ".$jarray['gurbani'][0]['shabad']['PageNo'];
	echo "<br>";
	echo "[Source - GurbaniNow](https://web.gurbaninow.com/?shabadid=$shabadnumber)";
}
echo "</body>";
echo "</html>";
?>
