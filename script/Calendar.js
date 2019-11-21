let month = new Month(new Date().getMonth() + 1, new Date().getFullYear());

class Calendar {
    constructor(response) {
        this.response = response;
    }

    init() {
        const displayMonth = document.querySelector('#displayMonth');
        month = new Month(new Date().getMonth() + 1, new Date().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
        initInputValues();
    }

    nextMonth() {
        this.removeCurrentTable();
        this.removeCurrentOverviewTerms();
        
        const displayMonth = document.querySelector('#displayMonth');
        month = new Month(month.getDate().getMonth() + 2, month.getDate().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
        this.printCurrentMonth();
        this.printCurrentOverview();
    }

    previousMonth() {
        this.removeCurrentTable();
        this.removeCurrentOverviewTerms();

        const displayMonth = document.querySelector('#displayMonth');
        month = new Month(month.getDate().getMonth(), month.getDate().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
        this.printCurrentMonth();
        this.printCurrentOverview();
    }

    printCurrentMonth() {
        month.printTable();
    }

    printCurrentOverview() {
        for (const term of this.getTermsOfSpecificMonth(month.getDate().getMonth() + 1)) {
            month.addTerm(term);
        }
        
        month.printOverview(this.getTermsOfSpecificMonth(month.getDate().getMonth() + 1));
    }
    
    removeCurrentTable() {
        const wrapper = document.querySelector('#tableWrapper');

        while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    }

    removeCurrentOverviewTerms() {
        let elements = document.querySelectorAll('#overview .overviewTerm');

        if (elements.length > 0) {
            for (const term of elements) {
                document.querySelector('#overview').removeChild(term);
            }
        }

        elements = document.querySelectorAll('#overview .error');

        if (elements.length > 0) {
            for (const term of elements) {
                document.querySelector('#overview').removeChild(term);
            }
        }
    }

    getTermsOfSpecificMonth(monthNumber) {
        const terms = [];        
    
        for (const term of this.response) {
            if (term.startDate.getMonth() + 1 === monthNumber) {
                terms.push(term);
            }
        }
    
        return terms;
    }

    showCreateWindow() {
        document.querySelector('#addTermWrapper').classList.remove('hide');
        document.querySelector('#createTermContainer').classList.remove('hide');

        setTimeout(() => {
            document.querySelector('#calendarWrapper').classList.add('lowOpacity');
            document.querySelector('#addTermWrapper').classList.add('showCreateWindow');
        }, 25);

        handleCheckbox();
    }

    hideCreateWindow() {
        document.querySelector('#createTermContainer').classList.add('hide');
        document.querySelector('#calendarWrapper').classList.remove('lowOpacity');
        document.querySelector('#addTermWrapper').classList.remove('showCreateWindow');

        setTimeout(() => {
            initInputValues();
            document.querySelector('#addTermWrapper').classList.add('hide');
        }, 110);

        handleCheckbox();
    }

    getSubmittedString() {
        const subject = document.querySelector('#dateSubject');
        let startDate = document.querySelector('#startDate');
        const startTime = document.querySelector('#startTime');
        let endDate = document.querySelector('#endDate');
        const endTime = document.querySelector('#endTime');
        const checkbox = document.querySelector('#checkbox');

        startDate = new Date(startDate.value);
        endDate = new Date(endDate.value);

        startDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
        endDate = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;

        const output = [subject.value, startDate, startTime.value, endDate, endTime.value, checkbox.checked];

        let submittedString = '';

        for (const elm of output) {
            submittedString += `${elm};`; 
        }

        return submittedString.substring(0, submittedString.length - 1);;
    }

    printCreatedTerm(term) {
        month.addTerm(term);
        month.printOverview([term]);
    }
}

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

function getBoolean(string) {
    if (string.includes('false')) {
        return false;
    } else if (string.includes('true')) {
        return true;
    }

    return -1;
}

function initInputValues() {
    const dates = [document.querySelector('#startDate'), document.querySelector('#endDate')];
    const times = [document.querySelector('#startTime'), document.querySelector('#endTime')];
    
    const currentDate = new Date();

    document.querySelector('#dateSubject').value = '';

    for (const date of dates) {
        date.value = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    }

    if (currentDate.getMinutes() >= 30) {
        times[0].value = `${("0" + (currentDate.getHours() + 1)).slice(-2)}:00`;
        times[1].value = `${("0" + (currentDate.getHours() + 2)).slice(-2)}:00`;
    } else {
        times[0].value = `${("0" + currentDate.getHours()).slice(-2)}:30`;
        times[1].value = `${("0" + (currentDate.getHours() + 1)).slice(-2)}:30`;
    }

    const checkbox = document.querySelector('#checkbox');
    checkbox.checked = false;
    checkbox.style.color = 'white';
}

function handleCheckbox() {
    const allDay = document.querySelector('#allDayWrapper');
    const checkbox = document.querySelector('#checkbox');
    
    checkbox.checked = false;

    allDay.addEventListener('click', () => {
        if (checkbox.checked) {
            checkbox.checked = false;
            checkbox.style.color = 'white';
            toggleTimeInputs(false);
        } else {
            checkbox.checked = true;
            checkbox.style.color = 'black';
            toggleTimeInputs(true);
        }
    });

    function toggleTimeInputs(enable) {
        const times = [document.querySelector('#startTime'), document.querySelector('#endTime')];

        if (enable) {
            for (const time of times) {
                time.disabled = true;
                time.style.cursor = 'not-allowed';
            }
        } else {
            for (const time of times) {
                time.disabled = false;
                time.style.cursor = 'default';
            }
        }
    }
}