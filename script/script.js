window.addEventListener('load', () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {}
    xhttp.open('GET', './php/calendar.php', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('request=dataRequest');

    const displayMonth = document.querySelector('#displayMonth');
    const nextMonth = document.querySelector('#nextMonth');
    const previousMonth = document.querySelector('#previousMonth');
    let month = new Month(new Date().getMonth() + 1, new Date().getFullYear());

    displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
    month.printTable();

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
            
            for (const term of getTermsOfSpecificMonth(month.getDate().getMonth() + 1)) {
                month.addTerm(term);
            }

            month.printOverview(getTermsOfSpecificMonth(month.getDate().getMonth() + 1));
        }
    };

    previousMonth.addEventListener('click', () => {
        removeCurrentTable();
        month.removeOverviewTerms();

        month = new Month(month.getDate().getMonth(), month.getDate().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
        month.printTable();

        for (const term of getTermsOfSpecificMonth(month.getDate().getMonth() + 1)) {
            month.addTerm(term);
        }

        month.printOverview(getTermsOfSpecificMonth(month.getDate().getMonth() + 1));
    });

    nextMonth.addEventListener('click', () => {
        removeCurrentTable();
        month.removeOverviewTerms();
        
        month = new Month(month.getDate().getMonth() + 2, month.getDate().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
        month.printTable();

        for (const term of getTermsOfSpecificMonth(month.getDate().getMonth() + 1)) {
            month.addTerm(term);
        }

        month.printOverview(getTermsOfSpecificMonth(month.getDate().getMonth() + 1));
    });

    function getTermsOfSpecificMonth(monthNumber) {
        const terms = [];

        for (const term of response) {
            if (term.startDate.getMonth() + 1 === monthNumber) {
                terms.push(term);
            }
        }

        return terms;
    }
});

function getMonthFullName(monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'Jänner';
        case 2:
            return 'Februar';
        case 3:
            return 'März';
        case 4:
            return 'April';
        case 5:
            return 'Mai';
        case 6:
            return 'Juni';
        case 7:
            return 'Juli';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'Oktober';
        case 11:
            return 'November';
        case 12:
            return 'Dezember';                                                                                                                                                                                                                                                                                                                                                                                                    
    }
}

function getShortMonthName(monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'jan';
        case 2:
            return 'feb';
        case 3:
            return 'mar';
        case 4:
            return 'apr';
        case 5:
            return 'may';
        case 6:
            return 'jun';
        case 7:
            return 'jul';
        case 8:
            return 'aug';
        case 9:
            return 'sep';
        case 10:
            return 'oct';
        case 11:
            return 'nov';
        case 12:
            return 'dec';                                                                                                                                                                                                                                                                                                                                                                                                    
    }
}

function removeCurrentTable() {
    const wrapper = document.querySelector('#tableWrapper');

    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
}

function getBoolean(string) {
    if (string.includes('false')) {
        return false;
    } else if (string.includes('true')) {
        return true;
    }

    return -1;
}