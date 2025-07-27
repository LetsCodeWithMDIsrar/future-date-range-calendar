import { type TextStyle, type ViewStyle } from "react-native"

interface CalendarViewProps{
    width?:number
    calendarType?:"type1" | "type2"
    horizontal?:boolean
    dayCustomStyle?:ViewStyle
    weekDaysCustomStyle?:ViewStyle
    weekDayCustomStyle?:ViewStyle
    monthTextCustomStyle?:TextStyle
    rangeDaysBackgroundColor?:string
    rangeDaysTextColor?:string
    startAndEndDateBackgroundColor?:string
    startAndEndDateTextColor?:string
    nonRangeDaysCustomStyle?:ViewStyle
    nonRangeDaysCustomTextStyle?:TextStyle
    disabledDaysCustomStyle?:ViewStyle
    disabledDaysCustomTextStyle?:TextStyle
    months?:string[]
    weekDays?:string[]
    /** if this is true then month will rendered like "Jan"
     * if this is false then only month will be rendered lik "Jan 2025"
     * 
     * default value is false
     */
    disableHeaderYearAppearance?:boolean
    renderPreviousIcon?:React.ReactNode
    renderNextIcon?:React.ReactNode
    /**
     * default value is 12
     * it will render the total limit month
     * for example: current month is July 2025 then it will render till July 2026
     * 
     * if totalMonthsRenderLimit will be 2 then it'll only render July and August of 2025
     */
    totalMonthsRenderLimit?:number

    /** it will accept index value
     * for example : current month is July, and I want to set August as default then 
     * index value will be "1"
     * 
     * default value is current month means 0
     */
    intialVisibleMonth?:number

    /** this will prevent user to select previous date.
     * for example: my startDate is 27 July 2025 and endDate is 30 July 2025,
     * then user can select after 30th July 2025 not before this date.
     */
    disablePreviousDateSelection?:boolean
    activeOpacity?:number
    

    /** it will return current index */
    onSwipe?:(index:number)=>void
    onDateSelect?:({startDate, endDate}:{startDate:string, endDate:string})=>void
}

interface DaysViewProps{
    date:string;
    onPress?:()=>void;
    key?:string;

    /**
     * custom style
     */

    style?:ViewStyle;
    textStyle?:TextStyle
}


type IconPropsTypes = {
    size?:number
    color?:string
}