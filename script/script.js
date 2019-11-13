window.addEventListener('load', () => {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {}
    xhttp.open('GET', './php/calendar.php', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('meta=' + 'dataRequest');

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
        }
    };
});