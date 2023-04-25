export function commentsOfNum(n: number) {
	let text_forms = ['коммментарий', 'коммментария', 'коммментариев'];
	n = Math.abs(n) % 100;
	let n1 = n % 10;
	if (n > 10 && n < 20) { return text_forms[2]; }
	if (n1 > 1 && n1 < 5) { return text_forms[1]; }
	if (n1 === 1) { return text_forms[0]; }
	return text_forms[2];
}

export function oo(n: number): string {
	let oo = n.toString();
	if (oo.length === 1)
		oo = '0' + oo;
	return oo;
}

export function dateStampToDate(dateStamp: number): string {
	const date = new Date(dateStamp * 1000)
	return date.getFullYear() + '.' + oo(1+date.getMonth()) + '.' + oo(date.getDate()) + ' | ' + oo(date.getHours()) + ':' + oo(date.getMinutes())
}