let month = new Month(new Date().getMonth() + 1, new Date().getFullYear());

class Calendar {
    constructor(response) {
        this.response = response;
    }

    init() {
        const displayMonth = document.querySelector('#displayMonth');
        month = new Month(new Date().getMonth() + 1, new Date().getFullYear());
        displayMonth.textContent = getMonthFullName(month.getDate().getMonth() + 1) + ' ' + month.getDate().getFullYear();
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