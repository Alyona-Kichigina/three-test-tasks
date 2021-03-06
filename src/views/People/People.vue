<template>
  <div class="people-block">
    <div class="container">
      <div class="title">
        Посетители
      </div>
      <div class="table-people space-container">
        <transition
          name="fade"
          mode="out-in"
        >
          <HotTable
            v-if="show"
            ref="table"
            :data="peoplesData"
            :settings="settings"
            class-name="tableOfVisitors"
          />
        </transition>
      </div>
      <div class="bnt-groups space-container">
        <PrimaryButton
          class="mr-button mb-button center-button"
          @click="getData"
        >
          Загрузить с сервера
        </PrimaryButton>
        <PrimaryButton
          class="mr-button mb-button center-button"
          @click="transferData"
        >
          Загрузить на сервер
        </PrimaryButton>
        <PrimaryButton
          class="mb-button center-button"
          @click="downloadData"
        >
          скачать в .xls
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import Excel from 'exceljs/dist/es5/exceljs.browser'
import PrimaryButton from '@/components/Buttons/PrimaryButton'
import { HotTable } from '@handsontable/vue'
import { READ_PEOPLE_DATA, FETCH_PEOPLE_DATA, SAVE_PEOPLE_DATA, TRANSFER_PEOPLE_DATA } from '@/views/People/Module'

export default {
  name: 'People',
  components: {
    PrimaryButton, HotTable
  },
  data () {
    return {
      settings: {
        dataSchema: {
          id: null,
          name: null,
          username: null,
          email: null,
          address: {
            street: null,
            suite: null,
            city: null,
            zipcode: null,
            geo: { lat: null, lng: null } },
          phone: null,
          website: null,
          company: {
            name: null,
            catchPhrase: null,
            bs: null
          }
        },
        width: '100%',
        rowHeights: '50px',
        height: 365,
        columnHeaderHeight: 50,
        currentRowClassName: 'active-row',
        activeHeaderClassName: 'active-header',
        manualColumnResize: true,
        manualRowResize: true,
        tableClassName: 'table-style',
        colHeaders: [
          'ID',
          'Name',
          'username',
          'email',
          'street',
          'suite',
          'city',
          'zipcode',
          'lat',
          'lng',
          'phone',
          'website',
          'name',
          'catchPhrase',
          'bs'
        ],
        columns: [
          { data: 'id' },
          { data: 'name' },
          { data: 'username' },
          { data: 'email' },
          { data: 'address.street' },
          { data: 'address.suite' },
          { data: 'address.city' },
          { data: 'address.zipcode' },
          { data: 'address.geo.lat' },
          { data: 'address.geo.lng' },
          { data: 'phone' },
          { data: 'website' },
          { data: 'company.name' },
          { data: 'company.catchPhrase' },
          { data: 'company.bs' },
        ],
        // для изменения данных в таблице
        afterChange: this.dataEditing,
      },
      // алфавит для формированния файла с данными из таблицы
      alphabetArray: [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
      ],
      // не показывать таблицу пока не нажата кнопка
      show: false
    }
  },
  computed: {
    // передаем данные для таблицы
    peoplesData () {
      return this.$store.getters[READ_PEOPLE_DATA]
    },
  },
  methods: {
    // получаем данные для таблицы
    getData () {
      this.show = true
      return this.$store.dispatch(FETCH_PEOPLE_DATA)
    },
    // передаем данные из таблицы
    async transferData () {
      // получаем таблицу
      const data = await this.exportData()
      return this.$store.dispatch(TRANSFER_PEOPLE_DATA, data)
    },
    // изменяем данные в таблице
    dataEditing (arg) {
      // если изменение произошло
      if (arg !== null) {
        this.$store.commit(SAVE_PEOPLE_DATA, this.$refs.table.hotInstance.getSourceData())
      }
    },
    // скачиваем данные из таблицы файлом
    async downloadData () {
      const data = await this.exportData()
      const a = document.createElement('a')
      const url = URL.createObjectURL(data)
      a.href = url
      a.download = 'export.xlsx'
      document.body.appendChild(a)
      a.click()
      setTimeout(function () {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 0)
    },
    async exportData () {
      const tableData = this.$refs.table.hotInstance.getData()
      // создаем новую таблицу
      const wb = new Excel.Workbook()
      // даем название таблице
      const ws = wb.addWorksheet('Export-Visitors')
      // выводим хэадер таблицы
      this.settings.colHeaders.forEach((item, index) => {
        // добавляем названия колонок
        const header = ws.getCell(`${this.alphabetArray[index]}1`)
        // добавляем содержимое в верхнем регистре
        header.value = item.toUpperCase()
        // стилизация хэадера таблицы
        header.font = {
          name: 'Roboto',
          color: { argb: 'FF000000' },
          family: 2,
          size: 14
        }
        header.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true
        }
      })
      // добавляем остальные данные
      tableData.forEach((rowArray, rowIndex) => {
        // rowArray - массив данных, rowIndex - номер строки
        // делаем еще один цикл чтобы добавить данные построчно, а не по ячейкам
        rowArray.forEach((columnValue, columnIndex) => {
          // columnValue - элемент из массива, columnIndex - номер в колонке
          const cell = ws.getCell(`${this.alphabetArray[columnIndex]}${rowIndex + 2}`)
          cell.value = columnValue
          cell.font = {
            name: 'Roboto',
            color: { argb: 'FF000000' },
            family: 2,
            size: 14
          }
          cell.alignment = {
            horizontal: 'center',
            vertical: 'middle',
            wrapText: true
          }
        })
      })
      // записываем данные
      const data = await wb.xlsx.writeBuffer({ base64: true })
      // создаем файл с сылкой
      return new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    }
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
<style lang="scss" src="./style-table.scss"></style>
