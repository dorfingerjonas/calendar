class Month {
    constructor(month, year) {
        this.month = month;
        this.year = year;
    }

    getDays() {
        return new Date(this.year, this.month, 0).getDate();
    }

    getDate() {
        return new Date(this.year, this.month, 0);
    }

    addTerm(term) {
        const startDate = term.startDate;
        const startTime = term.startTime;
        const subject = term.subject;
        const allDay = term.allDay;
        const tableCell = document.getElementById(`${getShortMonthName(startDate.getMonth() + 1)}${startDate.getDate()}${startDate.getFullYear()}`);       

        const newTerm = document.createElement('div');

        if (allDay) {
            const subjectText = document.createElement('span');
            subjectText.textContent = subject;

            newTerm.classList.add('termAllDay');
            newTerm.appendChild(subjectText);
        } else {
            const subjectText = document.createElement('strong');
            subjectText.textContent = subject;

            const circle = document.createElement('div');
            circle.classList.add('termCircle');

            const startTimeText = document.createElement('span');
            startTimeText.textContent = startTime;

            newTerm.classList.add('termTime');
            newTerm.appendChild(circle);
            newTerm.appendChild(startTimeText);
            newTerm.appendChild(subjectText);
        }
        
        tableCell.appendChild(newTerm);
    }

    printOverview(terms) {
        const overview = document.querySelector('#overview');

        // sort terms by timestamp
        for (let i = 0; i < terms.length; i++) {
            for (let j = i; j < terms.length; j++) {
                if (terms[i].startDate.getTime() > terms[j].startDate.getTime()) {
                    let temp = terms[i];
                    terms[i] = terms[j];
                    terms[j] = temp;
                }
            }
        }

        if (terms.length > 0) {
            for (const term of terms) {
                const newTerm = document.createElement('div');
                newTerm.classList.add('overviewTerm');

                const subject = document.createElement('p');
                subject.textContent = term.subject;

                subject.classList.add('overviewSubject');

                newTerm.appendChild(subject);

                const startDate = document.createElement('p');
                startDate.textContent = term.startDate.toLocaleDateString();
                newTerm.appendChild(startDate);

                if (!term.allDay) {
                    const time = document.createElement('p');
                    time.textContent = `${term.startTime} - ${term.endTime} Uhr`;
                    newTerm.appendChild(time);
                } else {
                    const time = document.createElement('p');
                    time.textContent = `Ganztägig`;
                    newTerm.appendChild(time);
                }

                overview.appendChild(newTerm);
            }
        } else {
            const error = document.createElement('p');
            error.textContent = 'Du hast in diesem Monat keine Termine.';
            error.classList.add('error');

            overview.appendChild(error);
        }
    }
}

function getWeekDay(date) {
    return date.getDay();
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