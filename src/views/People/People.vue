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
            ref="table"
            :data="peoplesData"
            :settings="settings"
            v-if="show"
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
          @click="a"
          class="mb-button center-button"
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
        afterChange: this.dataEditing,
      },
      alphabetArray: [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
      ],
      show: false
    }
  },
  computed: {
    peoplesData () {
      return this.$store.getters[READ_PEOPLE_DATA]
    },
  },
  methods: {
    getData () {
      this.show = true
      return this.$store.dispatch(FETCH_PEOPLE_DATA)
    },
    async transferData () {
      const data = await this.exportData()
      return this.$store.dispatch(TRANSFER_PEOPLE_DATA, data)
    },
    dataEditing (arg) {
      if (arg !== null) {
        this.$store.commit(SAVE_PEOPLE_DATA, this.$refs.table.hotInstance.getSourceData())
      }
    },
    async a () {
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
      const wb = new Excel.Workbook()
      const ws = wb.addWorksheet('Export')
      this.settings.colHeaders.forEach((item, index) => {
        const header = ws.getCell(`${this.alphabetArray[index]}1`)
        header.value = item.toUpperCase()
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
      tableData.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          const cell = ws.getCell(`${this.alphabetArray[columnIndex]}${rowIndex + 2}`)
          cell.value = column
          cell.alignment = { wrapText: true }
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
      const data = await wb.xlsx.writeBuffer({ base64: true })
      return new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    }
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
<style lang="scss" src="./style-table.scss"></style>
