// Your code here

// populates a record from an Array
// 1) has a function called createEmployeeRecord
// createEmployeeRecord
//   2) populates a firstName field from the 0th element
//   3) populates a familyName field from the 1th element
//   4) populates a title field from the 2th element
//   5) populates a payPerHour field from the 3th element
//   6) initializes a field, timeInEvents, to hold an empty Array
//   7) initializes a field, timeOutEvents, to hold an empty Array

function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
};

// process an Array of Arrays into an Array of employee records
// 1) has a function called createEmployeeRecords
// createEmployeeRecords
//   2) creates two records
//   3) correctly assigns the first names
//   4) creates more than 2 records

function createEmployeeRecords(array){
  return array.map(el => createEmployeeRecord(el));
}

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
// 1) has a function called createTimeInEvent
// createTimeInEvent
//   2) creates the correct type
//   3) extracts the correct date
//   4) extracts the correct hour

function parseDate(dateTime){
  return dateTime.match(/^\d{4}-\d{2}-\d{2}/)[0];
}

function parseHour(dateTime){
  return parseInt(dateTime.match(/\d{4}$/)[0], 10);
}

function createEvent(dateTime, type){
  return {
    date: parseDate(dateTime),
    hour: parseHour(dateTime),
    type: type
  };
}

function createTimeInEvent(record, dateTime){
  let event = createEvent(dateTime, "TimeIn")
  record.timeInEvents.push(event);
  return record
}

function createTimeOutEvent(record, dateTime){
  let event = createEvent(dateTime, "TimeOut");
  record.timeOutEvents.push(event);
  return record
}

function hoursWorkedOnDate(record, date){
  let timeIn = record.timeInEvents.find(el => el.date == date);
  let timeOut = record.timeOutEvents.find(el => el.date == date);
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date){
  return (hoursWorkedOnDate(record, date) * record.payPerHour)
}

function allWagesFor(record){
  let dates = record.timeInEvents.map(el => el.date)
  let wages = dates.reduce((memo, current) => memo + wagesEarnedOnDate(record, current), 0);
  return wages;
}

function calculatePayroll(array){
  return array.reduce((memo, el) => memo + allWagesFor(el), 0)
}

function findEmployeeByFirstName(emps, name){
  return emps.find(el => el.firstName === name)
}