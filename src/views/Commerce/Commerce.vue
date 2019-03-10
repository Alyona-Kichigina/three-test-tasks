<template>
  <div class="сommerce-block">
    <div class="container">
      <div class="title">
        Визиты
      </div>
      <div class="schedule">
        <line-chart :chart-data="arrayDay" height="120px" :style="{borderColor: 'transparent'}"/>
      </div>
      <div class="table">
        <HotTable
          ref="table"
          :data="CommerceDate"
          :settings="settings"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { READ_COMMERCE_DATA } from '@/views/Commerce/Module'
import LineChart from './LineChart.js'

export default {
  name: 'Commerce',
  components: {
    HotTable, LineChart
  },
  data () {
    return {
      datacollection: null,
      settings: {
        dataSchema: {
          day: null,
          visit: null,
          visitors: null,
          views: null
        },
        afterSelection: this.handleSelectTable,
        width: '100%',
        // height: 300,
        rowHeights: 40,
        colHeaders: [
          'Дни',
          'Визиты',
          'Посетители',
          'Просмотры'
        ],
        columns: [
          { data: 'day' },
          { data: 'visit' },
          { data: 'visitors' },
          { data: 'views' }
        ],
      },
      currentChartDataKey: 'visit'
    }
  },
  computed: {
    CommerceDate () {
      return this.$store.getters[READ_COMMERCE_DATA]
    },
    // состояние графика
    arrayDay () {
      const { days, data } = this.CommerceDate.reduce((acc, value) => {
        acc.days.push(value.day)
        acc.data.push(value[this.currentChartDataKey])
        return acc
      }, { days: [], data: [] })
      return {
        // период измерения
        labels: days,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'transparent',
            borderColor: '#DFC800',
            boxShadow: '0px 6px 8px rgba(133, 117, 74, 0.31)',
            borderWidth: 4,
            pointBorderColor: 'transparent',
            data: data
          }
        ]
      }
    },
  },
  beforeMount () {
    // запускаем действие
    // return this.$store.getters[READ_COMMERCE_DATA]
  },
  methods: {
    handleSelectTable (row, column) {
      if (column !== 0) this.currentChartDataKey = this.settings.columns[column].data
    }
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
