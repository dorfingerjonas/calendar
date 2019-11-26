window.addEventListener('load', () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {}
    xhttp.open('POST', './php/calendar.php', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('req=dataRequest');

    const nextMonth = document.querySelector('#nextMonth');
    const previousMonth = document.querySelector('#previousMonth');
    const showCreateWindow = document.querySelector('#createTerm');
    const submitNewTerm = document.querySelector('#submitNewTerm');
    const createTermContainer = document.querySelector('#createTermContainer');
    const closeCreateTerm = document.querySelector('#close');

    let calendar;

    const response = [];

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (JSON.parse(this.responseText)[0] !== 'success') {
                for (const respond of JSON.parse(this.responseText)) {
                    let parts = respond[1].split(' ');
                    let startdate = parts[0];
                    let starttime = parts[1];
                    
                    parts = respond[2].split(' ');
                    let enddate = parts[0];
                    let endtime = parts[1];
                    
                    response.push({subject: respond[0], startDate: new Date(startdate), startTime: starttime, endDate: new Date(enddate), endTime: endtime, allDay: getBoolean(respond[3]), description: respond[4]});
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

                showCreateWindow.addEventListener('click', () => {
                    calendar.showCreateWindow();
                });

                createTermContainer.addEventListener('click', () => {
                    calendar.hideCreateWindow();
                });

                closeCreateTerm.addEventListener('click', () => {
                    calendar.hideCreateWindow();
                });

                submitNewTerm.addEventListener('click', () => {
                    const submittedString = calendar.getSubmittedString();

                    xhttp.open('POST', './php/calendar.php', true);
                    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhttp.send('req=' + submittedString);
                
                    let parts = submittedString.split(';');
        
                    calendar.printCreatedTerm({subject: parts[0], startDate: new Date(parts[1]), startTime: parts[2], endDate: new Date(parts[3]), endTime: parts[4], allDay: getBoolean(parts[5]), description: parts[6]});           
                    calendar.hideCreateWindow();
                });
            }
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