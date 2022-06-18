export class DatetimeHelper {
    public static dateFormat: string = "y-MM-dd";
    public static dateFormatAr: string = "dd-MM-y";
    public static timeFormat: string = "HH:mm"
    public static datetimeFormat: string = `${DatetimeHelper.dateFormat} ${DatetimeHelper.timeFormat}`;

    public static convertToUTCDate(dateString: string){
        if (!dateString){
            return dateString;
        }

        let isUTCDate = dateString.toLowerCase().includes("z");
        if (isUTCDate){
            return dateString; 
        }

        return `${dateString}Z`;
    }
}