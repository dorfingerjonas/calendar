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

        // for (let i = 0; i < previousMonth.getDate() + weekDays.length; i++) {
        let currentDate = new Date(this.year, this.month, 0);

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

            dateText.textContent = startDate.getDate();
            dateInfoWrapper.appendChild(dateText);

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
}

function getWeekDay(date) {
    return date.getDay();
}