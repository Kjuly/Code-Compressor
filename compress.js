/*
* 选择文件类别，js文件有压缩级别选择，显示与否判断
 */
jQuery(document).ready(function($) {
	$('#filetype').change(
		function() { 
			if( document.getElementById('filetype').value == '1' ) { $('#level_exp_for_js').fadeTo("slow", 1.0); }
			else { $('#level_exp_for_js').fadeTo("slow",0.0); }
		}	
	);
});

/*
* 选择压缩级别，分别说明各级别
 */
jQuery(document).ready(function($) {
	$('#level').change(
		function() {
			var l = document.getElementById('level').value;
			if( l == '1' ) { var e = "/** 相比普通压缩，将保留许多单行的换行符 **/"; }
			else if( l == '3' ) { var e = "/** 相比普通压缩，将移除更多换行符 **/"; }
			else { e = "/** 采用普通算法进行压缩 **/"; }
			document.getElementById('level_exp').style.display = 'none';
			document.getElementById('level_exp').innerHTML = e;
			$('#level_exp').fadeTo("slow",1.0);
		}
	);
});

/*
* 进行压缩
 */
jQuery(document).ready(function($) {
	$('#compress').click(
		function() {
			var res1, res2, s, r, ratio, ratio2, f = document.forms[0], t = document.getElementById('filetype').value;
			s = f.src.value.length;
			if( t == '2' ) { f.res.value = YAHOO.compressor.cssmin(f.src.value); }
			else { f.res.value = jsmin(f.src.value,document.getElementById('level').value); }
			d = f.res.value.length;
			ratio = (100*d/s).toFixed(2);
			ratio2 = (100*(1-d/s)).toFixed(2);
			document.getElementById('download_file').style.height = ratio + '%'; // 改变压缩框中压缩条高度比例
			document.getElementById('download_file_empty').style.height = ratio2 + '%';
			res1 = "<p style='display:inline'>&nbsp;&nbsp;&nbsp;&nbsp;IN: " + s + "<br/>OUT: " + d + "</p>";
			res2 = "<p style='font-size:42px;display:inline'>" + ratio + "</p>%";
			if( ratio < 10 ) {
				document.getElementById('stat1').innerHTML = res1 + "<br/>" + res2;
				document.getElementById('stat2').innerHTML = "";
			}
			else if( ratio > 90 ) {
				document.getElementById('stat1').innerHTML = "";
				document.getElementById('stat2').innerHTML = res1 + "<br/>" + res2;
			}
			else {
				var tmp = "<div style='width=auto;height:"+ (455*ratio2/100-45) +"px;display:block;'></div>"; 
				document.getElementById('stat1').innerHTML = tmp + res1;
				document.getElementById('stat2').innerHTML = res2;
			}
			document.getElementById('src').style.display = 'none';
			document.getElementById('srctitle').style.display = 'none';
			document.getElementById('src').style.display = 'none';
			$('#restitle').fadeTo("slow",1.0);
			$('#res').fadeTo("slow",1.0);
			document.getElementById('compress').style.display = 'none';
			$('#compress_clear').fadeTo("slow",1.0);
			$('#download_file_form').fadeTo("slow",1.0);
		}
	);
});

/*
* 清空，重置
 */
jQuery(document).ready(function($) {
	$('#compress_clear').click(
		function() {
			document.getElementById('src').value = document.getElementById('res').value = '';
			document.getElementById('restitle').style.display = 'none';
			document.getElementById('res').style.display = 'none';
			$('#srctitle').fadeTo("slow",1.0);
			$('#src').fadeTo("slow",1.0);
			document.getElementById('compress_clear').style.display = 'none';
			$('#compress').fadeTo("slow",1.0);
			document.getElementById('download_file').style.height = '100%'; // 重置压缩框中压缩条高度比例
			document.getElementById('download_file_empty').style.height = '0%';
			$('#download_file_form').fadeTo("slow",0.0);
		}
	);
});

/* 
* 原始代码框中输入代码后，显示压缩框，满 
 */
jQuery(document).ready(function($) {
	$('#src').change(
		function() { 
			if( document.getElementById('src').value.length > '0' ) { 
				$('#download_file_form').fadeTo("slow", 1.0);
				var res, s = document.getElementById('src').value.length;
				res = "<div id='stat'>&nbsp;&nbsp;&nbsp;&nbsp;IN: " + s + "<br />OUT: ----- " + "<div style='font-size:38px;margin-top:10px;'>100.00%</div><br/>待压缩</div>";
				document.getElementById('stat2').innerHTML = res;
			}
			else { $('#download_file_form').fadeTo("slow",0.0); }
		}	
	);
});
