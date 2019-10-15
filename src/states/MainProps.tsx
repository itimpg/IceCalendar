import { CalendarItemModel } from "../models/CalendarItemModel";
import { Filter } from "../models/Filter";
import { CalendarCode } from "../models/CalendarCode";

export interface MainProps {
    calendarItems: CalendarItemModel[],
    calendarCodes: CalendarCode[],
    filter: Filter,
    doSaveCalendar: (item: CalendarItemModel, yearMonthId: number) => any;
    updateFilter: (yearMonthId: number) => void;
    doLoadCalendar: (yearMonthId: number) => any;
}
