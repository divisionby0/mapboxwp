///<reference path="../../../lib/events/EventBus.ts"/>
///<reference path="../EditorEvent.ts"/>
var DateSelectView = (function () {
    function DateSelectView(j$) {
        var _this = this;
        this.j$ = j$;
        this.j$("#currentTimeButton").click(function () { return _this.onCurrentTimeButtonClicked(); });
    }
    DateSelectView.prototype.setDate = function (data) {
        console.log("setDate ", data);
        if (!this.datePicker) {
            this.createDatepicker(data);
        }
        else {
            this.updateDatePicker(data);
        }
        if (!this.timePicker) {
            this.createTimePicker(data);
        }
        else {
            this.updateTimePicker(data);
        }
        this.onUserDateChanged(data);
        this.currentDate = data;
        EventBus.dispatchEvent(EditorEvent.DATE_TIME_CHANGED, data);
    };
    DateSelectView.prototype.createDatepicker = function (currentDate) {
        var _this = this;
        this.datePicker = this.j$("#datepicker");
        this.updateDatePicker(currentDate);
        this.j$("#datepicker").change(function () { return _this.onDateChanged(); });
        var userDate = this.createUserDate();
        this.onUserDateChanged(userDate);
    };
    DateSelectView.prototype.updateDatePicker = function (date) {
        this.datePicker.val(date.year + "-" + date.month + "-" + date.day);
    };
    DateSelectView.prototype.createTimePicker = function (currentDate) {
        var _this = this;
        var options = {
            now: currentDate.hours + ":" + currentDate.minutes,
            twentyFour: true
        };
        this.timePicker = this.j$('.timepicker');
        this.j$('.timepicker').wickedpicker(options);
        this.updateTimePicker(currentDate);
        this.j$('#timeInput').change(function () { return _this.onTimeChanged(); });
    };
    DateSelectView.prototype.updateTimePicker = function (date) {
        //console.log("updateTimePicker date=",date);
        var options = {
            now: date.hours + ":" + date.minutes,
            twentyFour: true
        };
        //console.log("options:",options);
        this.timePicker.val(date.hours + ":" + date.minutes);
        this.j$('#timeInput').wickedpicker(options);
        //this.timePicker.val(date.hours+":"+date.minutes);
        console.log("dispatch TIME_CHANGED...");
        EventBus.dispatchEvent("TIME_CHANGED", date);
    };
    DateSelectView.prototype.onDateChanged = function () {
        var userDate = this.createUserDate();
        this.onUserDateChanged(userDate);
    };
    DateSelectView.prototype.onTimeChanged = function () {
        var userDate = this.createUserDate();
        this.onUserDateChanged(userDate);
    };
    DateSelectView.prototype.onCurrentTimeButtonClicked = function () {
        EventBus.dispatchEvent(EditorEvent.SET_CURRENT_DATE_TIME, null);
    };
    DateSelectView.prototype.createUserDate = function () {
        var userDate = this.j$("#datepicker").val();
        var userTimeString = this.j$("#timeInput").val();
        var userTime = userTimeString.split(":");
        var userHours = userTime[0];
        var userMinutes = userTime[1];
        var day;
        var month;
        var year;
        var jsDate = new Date(userDate);
        if (jsDate !== null) {
            jsDate instanceof Date; // -> true
            day = jsDate.getDate();
            month = parseInt(jsDate.getMonth()) + 1; // TODO эта единица переводит на 1 месяц врепед - разобраться. НО уменьшать надо чтобы получить правильные названия месяцев
            year = jsDate.getFullYear();
        }
        return { day: day, month: month, year: year, hours: userHours, minutes: userMinutes };
    };
    DateSelectView.prototype.onUserDateChanged = function (newDate) {
        var isEquals = this.isEqual(this.currentDate, newDate);
        if (!isEquals) {
            this.currentDate = newDate;
            EventBus.dispatchEvent(EditorEvent.DATE_TIME_CHANGED, newDate);
        }
    };
    DateSelectView.prototype.isEqual = function (date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        else {
            if (date1.day != date2.day) {
                return false;
            }
            else if (date1.month != date2.month) {
                return false;
            }
            else if (date1.year != date2.tear) {
                return false;
            }
            else if (date1.hours != date2.hours) {
                return false;
            }
            else if (date1.minutes != date2.minutes) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    return DateSelectView;
}());
//# sourceMappingURL=DateSelectView.js.map