import { StyleSheet } from "react-native"
import { colors } from "./utils"

export const styles = StyleSheet.create({
  calendarWrapper: {
    
  },
  currentMonthWrapper: {
    flexDirection: 'column',
  },
  currentMonthHeaderWrapper:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between"
  },
  currentMonthText: {
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    marginBottom:15,
    fontWeight:"bold",
    borderWidth:1,
    borderColor:colors.white
  },
  weekdaysWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:colors.lightGray,
  },
  weekdayWrapper: {
    width: '14%',
    alignItems: 'center',
    alignContent: 'center',
  },
  weekdayText: {
  
  },
  daysWrapper: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayWrapperPrevious: {
    width: '14%',
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
  },
  dayWrapper: {
    width: '14%',
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // borderRightWidth: 0.5,
    borderRadius:100,
  },
  dayNotSelectedWrapper: {
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius:100
  },
  disableDayWrapper: {
    backgroundColor: colors.white,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9,
    borderRadius:100,
  },
  daySelectedWrapper: {
    backgroundColor: colors.secondary,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderRadius:100,
  },
  daySelectedWrapperFirstAndLast: {
    backgroundColor: colors.primary,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderRadius:100,
  },
   daySelectedWrapperType1: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  daySelectedWrapperType2: {
    backgroundColor: colors.secondary,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius:100,
    zIndex: 10,
  },
   startDateBase: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderTopLeftRadius:100,
    borderBottomLeftRadius:100,
    left:2
  },
   endDateBase: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderTopRightRadius:100,
    borderBottomRightRadius:100,
    right:2,
  },
  daySelectedWrapperFirstAndLasType1: {
    backgroundColor: colors.primary,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderRadius:100,
    
  },
  daySelectedWrapperFirstAndLasType2: {
    backgroundColor: colors.primary,
    width: "90%",
    height: "90%",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    borderRadius:100,
  },
  
  dayText: {
    // padding:10
    // paddingTop: 5,
  },
  disableDayText: {
    // paddingTop: 5,
    color: colors.lightGray
  },
  daySelectedText: {
    // paddingTop: 5,
  },
  daySelectedTextFirstAndLast: {
    color: colors.white,
    // paddingTop: 5,
  }
  
})
