import DatePicker from './date_picker'
import DatePickerArrows from './date_picker_arrows'
import DateRangePicker from './date_range_picker'
import DateRangePickerSuggestions from './date_range_picker_suggestions'
import TimePicker from './time_picker'

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
            datePickerArrows: new Date(),
            dateRangePickerDates: '',
            dateRangePickerSuggestionsDates: '',
            timePickerTime: new Date()
        }
    },
    template: `
        <div>
    <div>
        <div>{{ datePickerDate }}</div>
        <date-picker
                label="date-picker"
        ></date-picker>
    </div>
    <div>
        <div>{{ datePickerArrows }}</div>
        <date-picker-arrows

        ></date-picker-arrows>
    </div>
    <div>
        <div>{{ dateRangePickerDates }}</div>
        <date-range-picker

        ></date-range-picker>
    </div>
    <div>
        <div>{{ dateRangePickerSuggestionsDates }}</div>
        <date-range-picker-suggestions

        ></date-range-picker-suggestions>
    </div>
    <div>
        <div>{{ timePickerTime }}</div>
        <time-picker

        ></time-picker>
    </div>
</div>
    `
}
