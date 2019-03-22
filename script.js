

function getMonthName(month){

  var mom = moment();
  mom.month(month);
  var monthName = mom.format("MMMM")
  return monthName;
}

function printTitle(year, month){

  var h1Text = $("#month-name");
  var monthName = getMonthName(month);
  var dayCount = getMonthDayCount(year, month);

  h1Text.text(monthName + ":1-" + dayCount);

}

function getMonthDayCount(year, month){

  var mom = moment().month(month).year(year);
  var dayCount = mom.daysInMonth();
  return dayCount;

}

function getHumanDate(year, month, day){

  var mom = moment().year(year).month(month).date(day);
  var date = mom.format("DD MMMM YYYY");
  return date;
}

function getMachineDate(year, month, day){

  var mom = moment().year(year).month(month).date(day);
  var date = mom.format("YYYY-MM-DD");
  return date;
}

function printDays(year, month){

  var dayCount = getMonthDayCount(year, month);
  var ul = $("#day-list");

  var template = $("#entry-template").html();
  var compiled = Handlebars.compile(template);

  for (var createdDay = 1; createdDay <= dayCount ; createdDay++) {

    var tempDate = {

      date : getHumanDate(year, month, createdDay),
      machineDate: getMachineDate(year, month, createdDay)
    }

    var liDay = compiled(tempDate);
    ul.append(liDay);
  }
}

function printHolidays(year, month){

  var output = {
    year: year,
    month: month
  }

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: output,
    success: function(data, state){

      if (data.success) {

        printHolidayDays(data.response)
      }
    },
    error: function(request, state, error){}

  })
}

function printHolidayDays(holidays){

  for (var i = 0; i < holidays.length; i++) {

    var holiday = holidays[i];
    var holidayDate = holiday.date;
    var holidayName = holiday.name;
    var liHoliday = $("[data-date='" + holidayDate + "']");
    liHoliday.addClass("holiday");
    liHoliday.text(liHoliday.text() + " - " + holidayName);

  }
}

function getNextMonth(year, month){

  piallaTutto();
  month ++;
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);
  return month;

}

function getPrevMonth(year, month){

  piallaTutto();
  month --;
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);
  return month;
}

function piallaTutto() {

  var h1 = $(".month-name");
  h1.text("");

  var li = $("li");
  li.remove();
}

function init (){

  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);

  var clickArrow = $(".fa-arrow-right");
  clickArrow.click(function() {

    if (month < 11) {
      month = getNextMonth(year, month);
    } else {
      alert("Non puoi più andare avanti");
    }
  });

  var clickArrow = $(".fa-arrow-left");
  clickArrow.click(function() {
    if (month > 0) {

      month = getPrevMonth(year, month);
    } else {
      alert("Non puoi più tornare indietro");
    }
  });

}

$(document).ready(init);
