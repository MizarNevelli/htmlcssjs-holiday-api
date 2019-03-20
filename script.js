

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

  var mom = moment().year(year).month(month).day(day);
  var date = mom.format("DD MMMM YYYY");
  return date;


}

function printDays(year, month){

  var dayCount = getMonthDayCount(year, month);
  var ul = $("#day-list");

  var template = $("#entry-template").html();
  var compiled = Handlebars.compile(template);

  for (var createdDay = 0; createdDay <= dayCount ; createdDay++) {

    var tempDate = {
      date : getHumanDate(year, month, createdDay)
      
    }

    var liDay = compiled(tempDate);
    ul.append(liDay);
  }
}

function init (){

  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);

}

$(document).ready(init);
