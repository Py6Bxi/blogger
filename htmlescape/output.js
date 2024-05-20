<script>
	$(function() {
		$('#saveToDisk').click(event => {
			const blob = new Blob([$('#output').text()], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "escaped.html");
		});
		function escape() {
			$('#escape').val('true');
			$('#form').trigger('submit');
		}
		function unescape() {
			$('#escape').val('false');
			$('#form').trigger('submit');
		}
		$('#escapeBtn').click(escape);
		$('#unescapeBtn').click(unescape);
	});
</script>
