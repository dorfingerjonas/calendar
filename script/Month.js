class Month {
    constructor(month, year) {
        this.month = month;
        this.year = year;
    }

    getDays() {
        return new Date(this.year, this.month, 0).getDate();
    }

    printTable() {
        const contentwrapper = document.getElementById('tableWrapper');

        const table = document.createElement('div');
        
        const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

        let startDate;

        const firstDayOfMonth = new Date(this.year, this.month - 1, 1);
        let firstWeekDayOfMonth = getWeekDay(firstDayOfMonth);

        if (firstWeekDayOfMonth === 0) {
            firstWeekDayOfMonth = 7;
        }
        
        const daysOfPrevoiusMonth = 7 - (weekDays.length - firstWeekDayOfMonth) - 1;
        const lastDaysOfPreviousMonth = [];

        const previousMonth = new Date(this.year, this.month - 1, 0);

        startDate = firstDayOfMonth;

        for (let i = 0; i < daysOfPrevoiusMonth; i++) {
            lastDaysOfPreviousMonth.push(new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonth.getDate() - i));
            startDate =  new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonth.getDate() - i);
        }

        let row = document.createElement('div');
        row.classList.add('row');

        const currentDate = new Date(this.year, this.month, 0);

        for (let i = 0; i < currentDate.getDate() + weekDays.length + daysOfPrevoiusMonth; i++) {
            const weekDay = weekDays[i];

            const tableCell = document.createElement('div');

            const dateInfoWrapper = document.createElement('div');
            const dateText = document.createElement('span');
            
            if (i < 7) {
                const weekDayText = document.createElement('span');
                weekDayText.textContent = weekDay;
                dateInfoWrapper.appendChild(weekDayText);
            }

            if (startDate.getDate() === new Date().getDate() && startDate.getFullYear() === new Date().getFullYear() && startDate.getMonth() === new Date().getMonth()) {
                dateText.classList.add('currentDay');
            }

            if (startDate.getMonth() !== this.getDate().getMonth()) {
                dateInfoWrapper.classList.add('lastOrNextMonth');
            }

            dateText.classList.add('dayOfMonth');
            dateText.textContent = startDate.getDate();
            dateInfoWrapper.appendChild(dateText);

            tableCell.setAttribute('id', `${getShortMonthName(startDate.getMonth() + 1)}${startDate.getDate()}${startDate.getFullYear()}`);

            startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

            dateInfoWrapper.classList.add('dateInfoWrapper');
            
            tableCell.classList.add('tableCell');

            tableCell.style.width = contentwrapper.clientWidth / 7 + 'px';

            tableCell.appendChild(dateInfoWrapper);
            row.appendChild(tableCell);

            if ((i + 1) % 7 === 0) {
                
                table.classList.add('table');

                table.appendChild(row);

                row = document.createElement('div');
                row.classList.add('row');
            }
        }
        
        contentwrapper.appendChild(table);

        const rows = document.getElementsByClassName('row');

        for (const row of rows) {
            row.style.height = document.getElementById('tableWrapper').clientHeight / rows.length + 'px';
        }
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