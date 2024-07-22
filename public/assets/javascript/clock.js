setInterval(() => {
	d = new Date(); 
	hr = d.getHours();
	min = d.getMinutes();
	sec = d.getSeconds();

	document.getElementById("hour").innerHTML=hr+" : ";
    document.getElementById("minute").innerHTML=(min < 10 ? "0"+min+" : " : min+" : ");
    document.getElementById("second").innerHTML=(sec < 10 ? "0"+sec : sec);
}, 1000);
