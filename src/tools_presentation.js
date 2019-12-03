import DatePicker from './date_picker'
import DatePickerArrows from './date_picker_arrows'
import DateRangePicker from './date_range_picker'
import DateRangePickerSuggestions from './date_range_picker_suggestions'
import TimePicker from './time_picker'
import addDays from '/deps/date-fns/addDays'
import addMonths from '/deps/date-fns/addMonths'
import startOfDay from '/deps/date-fns/startOfDay'
import endOfDay from '/deps/date-fns/endOfDay'
import startOfMonth from '/deps/date-fns/startOfMonth'
import endOfMonth from '/deps/date-fns/endOfMonth'

export default {
    name: 'tools-presentation',
    components: {
        DatePicker,
        DatePickerArrows,
        DateRangePicker,
        DateRangePickerSuggestions,
        TimePicker
    },
    data: function(){
        return {
            datePickerDate: new Date(),
            datePickerDateArrows: new Date(),
            dateRangePickerDates: [addDays(new Date(), -7), new Date()],
            dateRangePickerSuggestionsDates: [addDays(new Date(), -7), new Date()],
            timePickerTime: new Date()
        }
    },

    methods: {
        startOfDay, endOfDay,
        startOfMonth, endOfMonth,
        addDays, addMonths
    },

    filters: {

    },

    template: `
        <div>
    <div>
        <div>{{ datePickerDate }}</div>
        <date-picker
                label="Date Picker"
                :date="datePickerDate"
                @change="range => {datePickerDate = range;}"
        ></date-picker>
    </div>
    <div>
        <div>{{ datePickerDateArrows }}</div>
        <date-picker-arrows
            label="Date Picker Arrows"
            :date="datePickerDateArrows"
            @change="range => {datePickerDateArrows = range;}"
        ></date-picker-arrows>
    </div>
    <div>
        <div>{{ dateRangePickerDates }}</div>
        <date-range-picker
            label="Date Range Picker"
            :date-range="dateRangePickerDates"
            @change="range => {dateRangePickerDates = range;}"
        ></date-range-picker>
    </div>
    <div>
        <div>{{ dateRangePickerSuggestionsDates }}</div>
        <date-range-picker-suggestions
            label="Date Range Picker Suggestions"
            :date-range="dateRangePickerSuggestionsDates"
            @change="range => {dateRangePickerSuggestionsDates = range;}"
            :suggestions="{
                today: [startOfDay(new Date()),new Date()],
                yesterday: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))],
                last7Days: [addDays(new Date(), -7), new Date()],
                last30Days: [addDays(new Date(), -30), new Date()],
                lastMonth: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
                custom: dateRangePickerSuggestionsDates
            }"
        ></date-range-picker-suggestions>
    </div>
    <div>
        <div>{{ timePickerTime }}</div>
        <time-picker
            label="Time Picker"
            :time="timePickerTime"
            @change="time=>{timePickerTime = time}"
        ></time-picker>
    </div>
</div>
    `
}
