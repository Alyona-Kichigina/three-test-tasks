<template>
  <div class="сommerce-block">
    <div class="container">
      <div class="title">
        {{settings.colHeaders[indexTitle]}} {{dataRange}}
      </div>
      <div class="schedule">
        <line-chart :chart-data="arrayDay" height="120px" :style="{borderColor: 'transparent'}"/>
      </div>
      <div class="table">
        <HotTable
          ref="table"
          :data="CommerceDate"
          :settings="settings"
          className="tableOfCommerce"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { READ_COMMERCE_DATA, SAVE_COMMERCE_DATA } from '@/views/Commerce/Module'
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
        activeHeaderClassName: 'active-header',
        currentRowClassName: 'active-row',
        rowHeights: '50px',
        columnHeaderHeight: 50,
        colWidths: [40, 20, 20, 20],
        stretchH: 'all',
        manualColumnResize: true,
        manualRowResize: true,
        tableClassName: 'table-style',
        columnSummary: [
          {
            sourceColumn: 1,
            destinationRow: 5,
            destinationColumn: 1,
            type: 'average',
            forceNumeric: true,
          },
          {
            sourceColumn: 2,
            destinationRow: 5,
            destinationColumn: 2,
            type: 'average',
            forceNumeric: true,
          },
          {
            sourceColumn: 3,
            destinationRow: 5,
            destinationColumn: 3,
            type: 'average',
            forceNumeric: true,
          }
        ],
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
      currentChartDataKey: 'visit',
      afterChange: this.dataEditing,
      indexTitle: 1
    }
  },
  computed: {
    CommerceDate () {
      return this.$store.getters[READ_COMMERCE_DATA].concat({ day: 'ИТОГО В СРЕДНЕМ' })
    },
    // состояние графика
    arrayDay () {
      const { days, data } = this.CommerceDate.reduce((acc, value) => {
        acc.days.push(value.day)
        acc.data.push(value[this.currentChartDataKey])
        return acc
      }, { days: [], data: [] })
      data.pop()
      days.pop()
      return {
        // период измерения
        labels: days,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'transparent',
            borderColor: '#DFC800',
            borderWidth: 4,
            pointBorderColor: 'transparent',
            data: data
          }
        ]
      }
    },
    dataRange () {
      return `${this.CommerceDate[0].day.slice(0, 5)} - ${this.CommerceDate[this.CommerceDate.length - 2].day.slice(0, 5)}`
    }
  },
  methods: {
    handleSelectTable (row, column) {
      if (column !== 0) this.currentChartDataKey = this.settings.columns[column].data
      if (column !== 0) this.indexTitle = column
    },
    dataEditing (arg) {
      if (arg !== null) {
        this.$store.commit(SAVE_COMMERCE_DATA, this.$refs.table.hotInstance.getSourceData())
      }
    }
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
<style lang="scss" src="./style-table.scss"></style>
