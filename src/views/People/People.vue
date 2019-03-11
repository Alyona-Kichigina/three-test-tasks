<template>
  <div class="people-block">
    <div class="container">
      <div class="title">
        Посетители
      </div>
      <div class="table-people">
        <HotTable
          :data="peoplesData"
          :settings="settings"
          className="tableOfVisitors"
          ref="table"
        />
      </div>
      <div class="bnt-groups">
        <PrimaryButton
          class="btn"
          @click="getData"
        >
          Загрузить с сервера
        </PrimaryButton>
        <PrimaryButton
          @click="transferData"
          class="btn"
        >
          Загрузить на сервер
        </PrimaryButton>
        <PrimaryButton
          class="btn"
        >
          скачать в .xls
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/Buttons/PrimaryButton'
import { HotTable } from '@handsontable/vue'
import { READ_PEOPLE_DATA, FETCH_PEOPLE_DATA, SAVE_PEOPLE_DATA, TRANSFER_PEOPLE_DATA } from '@/views/People/Module'

export default {
  name: 'People',
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
        afterChange: this.dataEditing
      },
    }
  },
  computed: {
    peoplesData () {
      return this.$store.getters[READ_PEOPLE_DATA]
    },
  },
  methods: {
    getData () {
      return this.$store.dispatch(FETCH_PEOPLE_DATA)
    },
    transferData () {
      return this.$store.dispatch(TRANSFER_PEOPLE_DATA, this.peoplesData)
    },
    dataEditing (arg) {
      if (arg !== null) {
        this.$store.commit(SAVE_PEOPLE_DATA, this.$refs.table.hotInstance.getSourceData())
      }
    }
  },
  components: {
    PrimaryButton, HotTable
  }
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
<style lang="scss" src="./style-table.scss"></style>
