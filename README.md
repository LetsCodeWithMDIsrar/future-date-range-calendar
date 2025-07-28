# 📅 react-native-future-date-range-calendar

A customizable and lightweight **future date range picker** for React Native. This component allows users to select only future dates with flexible styling and swipeable calendar views.

---

![Calendar Demo](https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg)
![Calendar Range Selection](https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg)

---

## 🚀 Installation

```bash
npm install react-native-future-date-range-calendar
yarn add react-native-future-date-range-calendar
```

## 📦 Usage

```bash
import { CalendarView } from 'react-native-future-date-range-calendar';

export default function App() {
  return (
    <CalendarView
      onDateSelect={({ startDate, endDate }) => {
        console.log('Selected Range:', startDate, endDate);
      }}
    />
  );
}
```

## ✨ Props

| Prop                             | Type                               | Description                                          | Default               |
| -------------------------------- | ---------------------------------- | ---------------------------------------------------- | --------------------- |
| `width`                          | `number`                           | Width of the calendar view                           | `device size`    |
| `calendarType`                   | `"type1"` \| `"type2"`             | Calendar display layout type                         | `"type1"`             |
| `horizontal`                     | `boolean`                          | Renders calendar in horizontal scroll                | `false`               |
| `dayCustomStyle`                 | `ViewStyle`                        | Custom style for each day cell                       | `undefined`           |
| `weekDaysCustomStyle`            | `ViewStyle`                        | Style for the week days container                    | `undefined`           |
| `weekDayCustomStyle`             | `ViewStyle`                        | Individual week day style (Mon, Tue...)              | `undefined`           |
| `monthTextCustomStyle`           | `TextStyle`                        | Style for the month label text                       | `undefined`           |
| `rangeDaysBackgroundColor`       | `string`                           | Background color for range-selected days             | `#D3E3FC`             |
| `rangeDaysTextColor`             | `string`                           | Text color for range-selected days                   | `#000`                |
| `startAndEndDateBackgroundColor` | `string`                           | Background color for selected start & end date       | `#1E90FF`             |
| `startAndEndDateTextColor`       | `string`                           | Text color for start & end date                      | `#FFF`                |
| `nonRangeDaysCustomStyle`        | `ViewStyle`                        | Style for days outside the selected range            | `undefined`           |
| `nonRangeDaysCustomTextStyle`    | `TextStyle`                        | Text style for non-range days                        | `undefined`           |
| `disabledDaysCustomStyle`        | `ViewStyle`                        | Style for disabled (past) days                       | `undefined`           |
| `disabledDaysCustomTextStyle`    | `TextStyle`                        | Text style for disabled days                         | `undefined`           |
| `months`                         | `string[]`                         | Custom list of month names                           | `["Jan", ..., "Dec"]` |
| `weekDays`                       | `string[]`                         | Custom list of week day names                        | `["Sun", ..., "Sat"]` |
| `disableHeaderYearAppearance`    | `boolean`                          | If `true`, shows only month, not year                | `false`               |
| `renderPreviousIcon`             | `React.ReactNode`                  | Custom component for previous month icon             | Chevron icon          |
| `renderNextIcon`                 | `React.ReactNode`                  | Custom component for next month icon                 | Chevron icon          |
| `totalMonthsRenderLimit`         | `number`                           | Number of total months to render (e.g., 12)          | `12`                  |
| `intialVisibleMonth`             | `number`                           | Index of month to show initially (0 = current month) | `0`                   |
| `disablePreviousDateSelection`   | `boolean`                          | Prevents selection of past dates                     | `true`                |
| `activeOpacity`                  | `number`                           | Touchable opacity value                              | `0.7`                 |
| `onSwipe`                        | `(index: number) => void`          | Callback on swipe between months                     | `undefined`           |
| `onDateSelect`                   | `({ startDate, endDate }) => void` | Callback with selected date range                    | `undefined`           |


## 🖼 Screenshots
## 📆 Type 1 Calendar

## 🔄 Type 2 Calendar (Horizontal)


## 🧪 Example App

A fully working example is available in the `example/` directory.

## 🎨 Customization

You can easily style and theme the calendar using the available props. Customize:

    Day cell colors and text

    Header and month appearance

    Disabled days, weekdays, and more

    Navigation icons

    Orientation (horizontal/vertical)

    Number of months to show


## 🙌 Contributing

Pull requests and suggestions are welcome!
Feel free to file an issue if you find a bug or need a feature.

## 📅 License

MIT
