window.addEventListener('load', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {}
    xhttp.open('GET', './php/calendar.php', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('request=dataRequest');

    const nextMonth = document.querySelector('#nextMonth');
    const previousMonth = document.querySelector('#previousMonth');

    let calendar;

    const response = [];

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            for (const respond of JSON.parse(this.responseText)) {                
                let parts = respond[1].split(' ');
                let startdate = parts[0];
                let starttime = parts[1];
                
                parts = respond[2].split(' ');
                let enddate = parts[0];
                let endtime = parts[1];

                response.push({subject: respond[0], startDate: new Date(startdate), startTime: starttime, endDate: enddate, endTime: endtime, allDay: getBoolean(respond[3])});
            }

            
            calendar = new Calendar(response);
            calendar.init();
            calendar.printCurrentMonth();
            calendar.printCurrentOverview();

            previousMonth.addEventListener('click', () => {
                calendar.previousMonth();
            });

            nextMonth.addEventListener('click', () => {
                calendar.nextMonth();
            });
        }
    };
});

function getBoolean(string) {
    if (string.includes('false')) {
        return false;
    } else if (string.includes('true')) {
        return true;
    }

    return -1;
}