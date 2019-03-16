<template>
  <div class="сommerce-block">
    <div class="container">
      <div class="title">
        {{ settings.colHeaders[indexTitle] }} {{ dataRange }}
      </div>
      <div class="schedule">
        <line-chart
          :chart-data="arrayDay"
          :style="{borderColor: 'transparent'}"
        />
      </div>
      <div class="table space-container">
        <HotTable
          ref="tableCommerce"
          :data="CommerceDate"
          :settings="settings"
          class-name="tableOfCommerce"
        />
      </div>
      <CustomChart :data="customData" />
    </div>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { READ_COMMERCE_DATA, SAVE_COMMERCE_DATA } from '@/views/Commerce/Module'
import LineChart from './LineChart.js'
import CustomChart from '@/components/CustomChart'

export default {
  name: 'Commerce',
  components: {
    HotTable, LineChart, CustomChart
  },
  data () {
    return {
      settings: {
        dataSchema: {
          day: null,
          visit: null,
          visitors: null,
          views: null
        },
        // для того чтобы при выборе каких-либо данных в таблице вызывть эту функцию
        afterSelection: this.handleSelectTable,
        width: '100%',
        // добавляем класс активному заголовку колонки
        activeHeaderClassName: 'active-header',
        // добавляем класс активной строке, кроме выбраной ячейки
        currentRowClassName: 'active-row',
        // высота строки
        rowHeights: '50px',
        // высота хеадера таблицы
        columnHeaderHeight: 50,
        // ширина колонок
        colWidths: [40, 20, 20, 20],
        stretchH: 'all',
        // изменение размеров колонок
        manualColumnResize: true,
        manualRowResize: true,
        // добавляем класс хеадеру таблицы
        tableClassName: 'table-style',
        // получам среднее значение
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
        // для изменения данных в таблице
        afterChange: this.dataEditingA,
      },
      // то что выводится на графике
      currentChartDataKey: 'visit',
      // заголовок выбраных данных таблицы
      indexTitle: 1
    }
  },
  computed: {
    CommerceDate () {
      // выводим в таблице данные
      // и добавляем новую строку в таблицу прописав в первую колонку текст
      return this.$store.getters[READ_COMMERCE_DATA].concat({ day: 'ИТОГО В СРЕДНЕМ' })
    },
    // состояние старого графика
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
    // вывод данных в новом графике
    customData () {
      return this.CommerceDate.map(({ day, [this.currentChartDataKey]: value }) => {
        // разбиваем объект на массивы для того что бы в дате передать правильно
        const [dayA, month, year] = day.split('/')
        return ({ date: new Date(year, month, dayA), value })
      })
    },
    // вывод первой и последней даты
    dataRange () {
      return `${this.CommerceDate[0].day.slice(0, 5)} - ${this.CommerceDate[this.CommerceDate.length - 2].day.slice(0, 5)}`
    }
  },
  methods: {
    handleSelectTable (row, column) {
      // вывод выбраных данных в графике, кроме даты
      if (column !== 0) this.currentChartDataKey = this.settings.columns[column].data
      // вывод заголовка выбраных данных
      if (column !== 0) this.indexTitle = column
    },
    dataEditingA (arg) {
      if (arg !== null && this.$refs.tableCommerce.hotInstance) {
        this.$store.commit(SAVE_COMMERCE_DATA, this.$refs.tableCommerce.hotInstance.getSourceData())
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
<style lang="scss" src="./style-table.scss"></style>
