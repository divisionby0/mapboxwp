///<reference path="../../../lib/events/EventBus.ts"/>
///<reference path="../EditorEvent.ts"/>
class DateSelectView{
    private j$:any;

    private timepicker:any;
    private datePicker:any;
    private timePicker:any;
    private currentDate:any;

    constructor(j$:any){
        this.j$ = j$;
        this.j$("#currentTimeButton").click(()=>this.onCurrentTimeButtonClicked());
    }

    public setDate(data:any):void{
        console.log("setDate ",data);
        if(!this.datePicker){
            this.createDatepicker(data);
        }
        else{
            this.updateDatePicker(data);
        }
        if(!this.timePicker){
            this.createTimePicker(data);
        }
        else{
            this.updateTimePicker(data);
        }
        this.onUserDateChanged(data);

        this.currentDate = data;
        EventBus.dispatchEvent(EditorEvent.DATE_TIME_CHANGED, data);
    }

    private createDatepicker(currentDate:any):void{
        this.datePicker = this.j$("#datepicker");
        this.updateDatePicker(currentDate);

        this.j$("#datepicker").change(()=>this.onDateChanged());

        var userDate:any = this.createUserDate();
        this.onUserDateChanged(userDate);
    }

    private updateDatePicker(date:any):void{
        this.datePicker.val(date.year+"-"+date.month+"-"+date.day);
    }

    private createTimePicker(currentDate:any):void{
        var options = {
            now: currentDate.hours+":"+currentDate.minutes,
            twentyFour: true
        };

        this.timePicker = this.j$('.timepicker');

        this.j$('.timepicker').wickedpicker(options);

        this.updateTimePicker(currentDate);
        this.j$('#timeInput').change(()=>this.onTimeChanged());
    }

    private updateTimePicker(date:any):void{
        //console.log("updateTimePicker date=",date);

        var options = {
            now: date.hours+":"+date.minutes,
            twentyFour: true
        };

        //console.log("options:",options);
        this.timePicker.val(date.hours+":"+date.minutes);
        this.j$('#timeInput').wickedpicker(options);

        //this.timePicker.val(date.hours+":"+date.minutes);
        console.log("dispatch TIME_CHANGED...");
        EventBus.dispatchEvent("TIME_CHANGED", date);
    }

    private onDateChanged():void {
        var userDate:any = this.createUserDate();

        this.onUserDateChanged(userDate);
    }
    private onTimeChanged():void{
        var userDate:any = this.createUserDate();
        this.onUserDateChanged(userDate);
    }

    private onCurrentTimeButtonClicked():void {
        EventBus.dispatchEvent(EditorEvent.SET_CURRENT_DATE_TIME, null);
    }

    private createUserDate():any{
        var userDate:string = this.j$("#datepicker").val();

        var userTimeString:string = this.j$("#timeInput").val();
        var userTime:string[] = userTimeString.split(":");
        var userHours:string = userTime[0];
        var userMinutes:string = userTime[1];

        var day;
        var month;
        var year;

        var jsDate:any = new Date(userDate);

        if (jsDate !== null) { // if any date selected in datepicker
            jsDate instanceof Date; // -> true
            day = jsDate.getDate();
            month = parseInt(jsDate.getMonth())+1; // TODO эта единица переводит на 1 месяц врепед - разобраться. НО уменьшать надо чтобы получить правильные названия месяцев
            year = jsDate.getFullYear();
        }

        return {day:day, month:month, year:year, hours:userHours, minutes:userMinutes};
    }
    
    private onUserDateChanged(newDate:any):void{
        var isEquals:boolean = this.isEqual(this.currentDate, newDate);
        if(!isEquals){
            this.currentDate = newDate;
            EventBus.dispatchEvent(EditorEvent.DATE_TIME_CHANGED, newDate);
        }
    }

    private isEqual(date1:any, date2:any):boolean{
        if(!date1 || !date2){
            return false;
        }
        else{
            if(date1.day!=date2.day){
                return false;
            }
            else if(date1.month!=date2.month){
                return false;
            }
            else if(date1.year!=date2.tear){
                return false;
            }
            else if(date1.hours!=date2.hours){
                return false;
            }
            else if(date1.minutes!=date2.minutes){
                return false;
            }
            else{
                return true;
            }
        }
    }
}
