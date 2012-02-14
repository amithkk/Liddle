function getElm() {
	return document.getElementById('js-console');
}

/* 
 * Get Selected Text (textarea) 
 * @param HTMLElement Textarea
 * @return string
 * */
function get_textarea_selection(textarea) {
	return textarea.value.substring( textarea.selectionStart, textarea.selectionEnd );
}
/* 
 * Get Current Line (textarea) 
 * @param HTMLElement Textarea
 * @return string
 * */
function get_current_line(textarea) {s
	var ln_start, ln_end, nl = '\n';
	for( ln_start = textarea.selectionStart; ln_start >= 0 && textarea.value[ln_start] !== nl; --ln_start );
	for( ln_end = ln_start; ln_end < textarea.value.length && textarea.value[ln_end] !== nl; ++ln_end );
	return textarea.value.substring( ln_start, ln_end );
}


var handlers = {
	/* TAB 
	 * No Selection
	 * 		Insert a "\t" at the caret position, place the caret past the Tab character
	 * Selection
	 * 		Insert a "\t" before each line in the selection, if no line exists insert "\t" at beginning of range
	 * */
	tab: function (e) {
		var jsc = getElm(), selection = get_textarea_selection(jsc), sel_start = jsc.selectionStart, sel_end = jsc.selectionEnd, len = jsc.value.length, TAB = '\t', pos_start = 0, pos_end = 0;
		if( selection ) {
			// cheapy solution, does not work.
			jsc.value = jsc.value.substring(0, sel_start) + selection.replace(/\n/g,'\n\t') + jsc.value.substring(sel_end, len);
		} else {
			jsc.value = jsc.value.substring(0, sel_start) + TAB + jsc.value.substring(sel_start, len);
			pos_start = pos_end = sel_start + 1;
		}
		jsc.setSelectionRange(pos_start, pos_end);
	}
};
	
shortcut.add("Tab", handlers.tab);
