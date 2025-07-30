/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react';
import {Dimensions, FlatList, ScrollView, TouchableOpacity, View} from 'react-native';

import {
  colors,
  findTwoDatesDifference,
  months,
  weekDays,
} from './utils'
import {type CalendarViewProps} from './@types';
import {styles} from './calendar-styles';
import moment from 'moment';
import CustomText from './components/CustomText';
import { LeftChevron } from './icons/left-chevron';
import { RightChevron } from './icons/right-chevron';

interface DateTypes {
  previousMonth: [{date: number; month: number; year: number}];
  currentMonth: [
    {
      date: number;
      month: number;
      year: number;
      firstDayOfTheMonth: number;
      lastDateOfTheMonth: number;
      completeDate: string;
      type: string;
    },
  ];
  nextMonth: [{date: number; month: number; year: number}];
}

export const FutureDateRangeCalendar: React.FC<CalendarViewProps> = React.memo((props: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [disableDays, setDisableDays]: any = React.useState([]);
  const initialDate = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = React.useState(moment().format("YYYY-MM-DD"))
  const [endDate, setEndDate] = React.useState(moment().add("days", 2).format("YYYY-MM-DD"))
  const [dateSelected, setDateSelected] = React.useState(false);
  const flatListRef:any = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const monthsList = props?.months ? props?.months : months
  const weekdays = props?.weekDays ? props?.weekDays : weekDays
  const renderMonthsLimit = props?.totalMonthsRenderLimit ?? 12

  const cardWidth = props?.width ?? Dimensions.get("screen").width
  
  const {calendarType = 'type1'} = props

  const handlePrev = () => {
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };
  const handleNext = () => {
    if (currentIndex < renderMonthsLimit) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  const handleScroll = (event:any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setCurrentIndex(index);
    if(props?.onSwipe){
      props?.onSwipe(index)
    }
  };

  const monthsToScroll = React.useMemo(() => {
    return new Array(1).fill(0);
  }, []);
  /**
   * Today Date
   */
  const todayDate = new Date(initialDate);
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth() + 1;
  /**
   * Previous Days Count
   */
  const currentDate = moment(initialDate).format('YYYY-MM-DD');

  const currentMonthDate =
    currentYear +
    '-' +
    (currentMonth < 10 ? '0' + currentMonth : currentMonth) +
    '-' +
    '01';
  const onDateSelect = (startDate:string, endDate:string)=>{
    const currentTime = moment().format("HH:mm:ss")
    const startDateWithTime = startDate + " " + currentTime
    const endDateWithTime = endDate + " " + currentTime
    const startDateTimestamp = startDate ? moment(startDateWithTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ssZ") : '';
    const endDateTimestamp = endDate ? moment(endDateWithTime, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ssZ") : '';

    if(props?.onDateSelect){
      props?.onDateSelect({startDate:startDateTimestamp, endDate:endDateTimestamp})
    }
  }
  const dateRangeHandler = (date: any) => {
    
    if(date==startDate){
      return
    }
    if (startDate === '') {
      setStartDate(date);
      /** this method is handling onDateSelect props
       * with the help of this props user can access startDate and endDate timestamp
       */
      onDateSelect(date, '')
    }

    const d1 = new Date(startDate);
    const d2 = new Date(date);

    if (!props?.disablePreviousDateSelection && startDate !== '' && d1 > d2) {
      setStartDate(date);
      setEndDate('');
       /** this method is handling onDateSelect props
       * with the help of this props user can access startDate and endDate timestamp
       */
      onDateSelect(date, '')
    } else if (startDate !== '' && endDate === '') {
      setEndDate(date);
       /** this method is handling onDateSelect props
       * with the help of this props user can access startDate and endDate timestamp
       */
      onDateSelect(startDate, date)
    } else if (
      startDate !== '' &&
      endDate !== '' &&
      props.disablePreviousDateSelection &&
      d2 > d1
    ) {
      setEndDate(date);
      /** this method is handling onDateSelect props
       * with the help of this props user can access startDate and endDate timestamp
       */
      onDateSelect(startDate, date)
    }else if(
      startDate !== '' &&
      endDate !== '' &&
      d2 > d1
    ){
      setStartDate(date);
      setEndDate('');
      /** this method is handling onDateSelect props
       * with the help of this props user can access startDate and endDate timestamp
       */
      onDateSelect(date, '')
    }
    setSelectedDate(date);
  };

  const disablePreviousDays = () => {
    let totalDays = 0;
    const date1: any = new Date(currentMonthDate);
    const date2: any = new Date(currentDate);
    const diffTime = Math.abs(date1 - date2);
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isNaN(totalDays)) {
      totalDays = 0;
    }

    /**
     * disable last months's days
     */

    const totalScrollMonths = renderMonthsLimit;
    const yearAfter12 = currMonth === 0 ? currYear : currYear + 1;
    const leftMonthsOfCurrentYear = totalScrollMonths - currentMonth;
    const nextYearLastMonth = totalScrollMonths - leftMonthsOfCurrentYear - 1;
    const totalDaysOfNextYearLastMonth = new Date(
      yearAfter12,
      nextYearLastMonth,
      0,
    ).getDate(); // getting last date of the month
    const lastActiveDay = 15 + totalDays + 3;
    const listOfDisabledDates = [];
    for (let i = lastActiveDay; i <= totalDaysOfNextYearLastMonth; i++) {
      const completeDate =
        yearAfter12.toString() +
        '-' +
        (nextYearLastMonth < 10 ? '0' + nextYearLastMonth : nextYearLastMonth) +
        '-' +
        i;

      listOfDisabledDates.push(completeDate);
    }
    for (let i = 0; i <= totalDays; i++) {
      const date = new Date(currentMonthDate);
      date.setDate(date.getDate() + i);
      const cdYear = date.getFullYear();
      const cdMonth = (date.getMonth() + 1).toString();
      const cdDate = date.getDate().toString();
      const completeDate =
        cdYear.toString() +
        '-' +
        (cdMonth.length === 1 ? '0' + cdMonth : cdMonth) +
        '-' +
        (cdDate.length === 1 ? '0' + cdDate : cdDate);
      listOfDisabledDates.push(completeDate);
    }

    setDisableDays(listOfDisabledDates);
    return totalDays;
  };
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const days: DateTypes | any = {
    previousMonth: [{date: 0, month: 0, year: 0}],
    currentMonth: [
      {
        date: 0,
        month: 0,
        year: 0,
        firstDayOfTheMonth: 0,
        lastDateOfTheMonth: 0,
        completeDate: '',
        type: '',
      },
    ],
    nextMonth: [{date: 0, month: 0, year: 0}],
  };
  const monthLimit = 11 - currMonth;
  let count = 0;
  let totalScrolledDays = 0;
  const renderCalendar = ({index}: any) => {
    const month = new Date(currYear, currMonth + index, 1).getMonth();
    let year = new Date(currYear, currMonth, 1).getFullYear();
    if (index > 0 && month === 0) {
      if (count < 1) {
        count = count + 1;
      }
    }
    if (index > monthLimit) {
      year = new Date(currYear + count, currMonth, 1).getFullYear();
    }
    const firstDayOfTheMonth = new Date(
      currYear,
      currMonth + index,
      1,
    ).getDay(); // getting first day of the month
    const lastDateOfTheMonth = new Date(
      currYear,
      currMonth + index + 1,
      0,
    ).getDate(); // getting last date of the month
    const lastDateOfTheLastMonth = new Date(
      currYear,
      currMonth + index,
      0,
    ).getDate(); // getting last date of the last month
    const lastDayOfTheMonth = new Date(
      currYear,
      currMonth,
      lastDateOfTheMonth,
    ).getDay(); // getting last day of the month
    /**
     * totalScrolledDays
     */
    if (totalScrolledDays <= 351 - lastDateOfTheLastMonth) {
      totalScrolledDays += lastDateOfTheMonth;
    }

    days.previousMonth = [];
    days.currentMonth = [];
    days.nextMonth = [];
    for (let i = firstDayOfTheMonth; i > 0; i--) {
      const data = {
        date: lastDateOfTheLastMonth - i + 1,
        month: month + 1,
        year,
      };
      days.previousMonth.push(data);
    }
    const daysDiff = findTwoDatesDifference(currentDate, currentMonthDate);
    for (let i = 1; i <= lastDateOfTheMonth; i++) {
      const data = {
        date: i,
        month: month + 1,
        year,
        firstDayOfTheMonth,
        lastDateOfTheMonth,
        completeDate:
          year +
          '-' +
          (month + 1 < 10 ? '0' + (month + 1) : month + 1) +
          '-' +
          (i < 10 ? '0' + i : i),
        type:
          i <= daysDiff && month + 1 === currentMonth && year === currentYear
            ? 'disable'
            : 'enable',
      };
      days.currentMonth.push(data);
    }

    for (let i = lastDayOfTheMonth; i < 6; i++) {
      const data = {
        date: i - lastDayOfTheMonth + 1,
        month: month + 1,
        year,
      };
      days.nextMonth.push(data);
    }
    const getSelectedDatesStyle = (runningDate:string)=>{
      const dayNumber = moment(runningDate, "YYYY-MM-DD").day()
      const day0Style = dayNumber === 0 ? {left:10} : {}
      if(runningDate === startDate || runningDate === endDate){
        if(calendarType=="type1"){
          if(props?.startAndEndDateBackgroundColor){
            return {...styles.daySelectedWrapperFirstAndLasType1, backgroundColor:props.startAndEndDateBackgroundColor}
          }
          return styles.daySelectedWrapperFirstAndLasType1
        }else{
          if(props?.startAndEndDateBackgroundColor){
            return {...styles.daySelectedWrapperFirstAndLasType2, backgroundColor:props.startAndEndDateBackgroundColor}
          }
          return styles.daySelectedWrapperFirstAndLasType2
        }
      }else{
        if(calendarType=="type1"){
          if(props?.rangeDaysBackgroundColor){
            return {...styles.daySelectedWrapperType1, ...day0Style, backgroundColor:props?.rangeDaysBackgroundColor}
          }
          return {...styles.daySelectedWrapperType1, ...day0Style}
        }else{
          if(props?.rangeDaysBackgroundColor){
            return {...styles.daySelectedWrapperType2, backgroundColor:props?.rangeDaysBackgroundColor}
          }
          return {...styles.daySelectedWrapperType2}
        }
      }
    }
    const getSelectedDatesTextStyle = (runningDate:string)=>{
      if(runningDate === startDate || runningDate === endDate){
        if(props?.startAndEndDateTextColor){
          return {...styles.daySelectedTextFirstAndLast, color:props?.startAndEndDateTextColor}
        }
        return styles.daySelectedTextFirstAndLast
      }else{
        if(props?.rangeDaysTextColor){
          return {...styles.daySelectedTextFirstAndLast, color:props?.rangeDaysTextColor}
        }
        return styles.daySelectedText
      }
    }
    const getStartEndDateBaseStyle = (runningDate:string)=>{
      const dayNumber = moment(runningDate, "YYYY-MM-DD").day()
      const day0Style = dayNumber === 0 ? {width:0} : {}
      if(runningDate === startDate && endDate){
        return styles.startDateBase
      }
      if(runningDate === endDate){
        return {...styles.endDateBase, ...day0Style}
      }
      if(props?.rangeDaysBackgroundColor){
        return {backgroundColor:props?.rangeDaysBackgroundColor}
      }
    }
    return (
      <View style={{width:cardWidth, backgroundColor:colors.white}}>
        <View style={styles.calendarWrapper}>
          <View style={styles.currentMonthWrapper}>
            <View style={styles.currentMonthHeaderWrapper}>
              <TouchableOpacity onPress={handlePrev}>
                {
                  props?.horizontal ? 
                    props?.renderPreviousIcon ? props?.renderPreviousIcon : <LeftChevron/>
                  : null
                }
              </TouchableOpacity>
              <CustomText
                value={props?.disableHeaderYearAppearance ? `${monthsList[month]}` :  `${monthsList[month]} ${year}`}
                textStyle={[styles.currentMonthText, props?.monthTextCustomStyle]}
                size={22}
              />
              <TouchableOpacity onPress={handleNext}>
                {
                  props?.horizontal ? 
                    props?.renderNextIcon ? props?.renderNextIcon : <RightChevron/>
                  : null
                }
              </TouchableOpacity>
            </View>

            <View style={[styles.weekdaysWrapper, props?.weekDaysCustomStyle]}>
              {weekdays.map((v, i) => {
                return (
                  <View key={i.toFixed()} style={[styles.weekdayWrapper, props?.weekDayCustomStyle]}>
                    <CustomText
                      value={v}
                      textStyle={styles.weekdayText}
                      size={18}
                    />
                  </View>
                );
              })}
            </View>
            <View style={styles.daysWrapper}>
              {/* Pevious Month's Days */}
              {days.previousMonth.map((v: any, i: any) => {
                return (
                  <View
                    key={i}
                    style={[styles.dayWrapperPrevious]}
                  />
                );
              })}
              {/* Current Month's Days */}
              {days.currentMonth.map((v:any, i:number) => {
                let fd = v.firstDayOfTheMonth;
                fd = Math.abs(fd - 7) - 1;

                const runningDate =
                  v.year +
                  '-' +
                  (v.month < 10 ? '0' + v.month : v.month) +
                  '-' +
                  (v.date < 10 ? '0' + v.date : v.date);
                const rDate = new Date(runningDate);
                const sDate = new Date(startDate);
                const eDate = new Date(endDate);

                return (
                  <View key={i} style={[styles.dayWrapper, props?.dayCustomStyle]}>
                    <React.Fragment key={i}>
                      {((rDate >= sDate && rDate <= eDate) ||
                        runningDate === startDate) && (
                          <>
                          {
                            calendarType == "type1" && <View style={getStartEndDateBaseStyle(runningDate)}/>
                          }
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              setSelectedDate(v.completeDate);
                              const selectedD =
                                v.year +
                                '-' +
                                (v.month < 10 ? '0' + v.month : v.month) +
                                '-' +
                                (v.date < 10 ? '0' + v.date : v.date);
                              dateRangeHandler(selectedD);
                              setDateSelected(!dateSelected);
                            }}
                            key={runningDate}
                            style={getSelectedDatesStyle(runningDate)}>
                            <CustomText
                              value={`${v.date}`}
                              textStyle={getSelectedDatesTextStyle(runningDate)}
                              size={18}
                            />
                          </TouchableOpacity>
                          </>
                      )}
                    </React.Fragment>

                    {v.type === 'disable' ? (
                      <View style={[styles.disableDayWrapper, props?.disabledDaysCustomStyle]}>
                        <CustomText
                          value={`${v.date}`}
                          textStyle={[styles.disableDayText, props?.disabledDaysCustomTextStyle]}
                          size={18}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={props?.activeOpacity ?? 1}
                        onPress={() => {
                          setSelectedDate(v.completeDate);
                          const selectedD =
                            v.year +
                            '-' +
                            (v.month < 10 ? '0' + v.month : v.month) +
                            '-' +
                            (v.date < 10 ? '0' + v.date : v.date);
                          dateRangeHandler(selectedD);
                        }}
                        style={[styles.dayNotSelectedWrapper, props?.nonRangeDaysCustomStyle]}>
                        <CustomText
                          value={`${v.date}`}
                          textStyle={[styles.dayText, props?.nonRangeDaysCustomTextStyle]}
                          size={18}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    // markedDates()
    if (selectedDate === '') {
      disablePreviousDays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, dateSelected]);
  return (
    <>
    {
      props?.horizontal?
      <FlatList
      ref={flatListRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth} // Optional but improves snapping
      decelerationRate="fast" // Optional: makes swipe faster and snappier
      bounces={false} // Optional: removes bounce at edges
      overScrollMode='never'
      showsVerticalScrollIndicator={false}
      data={monthsToScroll}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCalendar}
      onEndReached={() => {
        if (monthsToScroll?.length <= renderMonthsLimit) {
          monthsToScroll.push(0);
        }
      }}

      initialScrollIndex={props?.intialVisibleMonth ?? 0}
    />
    :<FlatList
      showsVerticalScrollIndicator={false}
      data={monthsToScroll}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCalendar}
      onEndReached={() => {
        if (monthsToScroll?.length <= renderMonthsLimit) {
          monthsToScroll.push(0);
        }
      }}

      initialScrollIndex={props?.intialVisibleMonth ?? 0}
    />
    }
    </>
  );
});
