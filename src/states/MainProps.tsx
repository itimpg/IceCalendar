import { CalendarItemModel } from "../models/CalendarItemModel";
import { Filter } from "../models/Filter";
import { CalendarCode } from "../models/CalendarCode";

export interface MainProps {
    calendarItems: any,
    calendarCodes: CalendarCode[],
    filter: Filter,
    saveCalendarItem: (item: CalendarItemModel, yearMonthId: number) => void;
    updateFilter: (yearMonthId: number) => void;
}
