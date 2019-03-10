import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    // this.chartData создается в миксине.
    // Если вы хотите передать параметры, создайте объект локальных параметров
    this.renderChart(this.chartData, this.options)
  }
}
