function showCalendar() {
    const date = new Date();
  
    const renderCalendar = () => {
        date.setDate(1);


        const monthDays = document.querySelector('.days');

        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        let firstDayIndex = date.getDay() - 1;

        if(firstDayIndex<0){
            firstDayIndex = 6;
        }

        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();


        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;

        const nextDays = 7 - lastDayIndex - 1;

        const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

        document.querySelector('.date').textContent = months[currentMonth] + " " + currentYear;

        let days = "";

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date day">${prevLastDay - x + 1}<div class="event-in-calendar"></div></div>`;

        }

        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                days += `<div class="today day">${i}<div class="event-in-calendar"></div></div>`;
            } else {
                days += `<div class="day">${i}<div class="event-in-calendar"></div></div>`;
            }
            // monthDays.innerHTML = days;
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="next-date day">${j}<div class="event-in-calendar"></div></div>`;
            monthDays.innerHTML = days;
        };
    }



    document.querySelector('.fa-chevron-left').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector('.fa-chevron-right').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}

export default showCalendar;