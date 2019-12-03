<template>
    <div>
        <div>
            <div>{{ datePickerDate }}</div>
            <date_picker
                    label="date-picker"
            ></date_picker>
        </div>
        <div>
            <div>{{ datePickerArrows }}</div>
            <date_picker_arrows

            ></date_picker_arrows>
        </div>
        <div>
            <div>{{ dateRangePickerDates }}</div>
            <date_range_picker

            ></date_range_picker>
        </div>
        <div>
            <div>{{ dateRangePickerSuggestionsDates }}</div>
            <date_range_picker_suggestions

            ></date_range_picker_suggestions>
        </div>
        <div>
            <div>{{ timePickerTime }}</div>
            <time_picker

            ></time_picker>
        </div>
    </div>
</template>
<script>
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
        }
    }
</script>
