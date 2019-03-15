<template>
  <svg />
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'CustomChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      chartContainer: undefined,
      margin: {
        top: 13, // отвечает за оступ графика сверху
        right: 30,
        bottom: 30,
        left: 60
      },
      width: 900,
      height: 120
    }
  },
  watch: {
    data () {
      this.draw()
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      const x = d3.scaleTime()
        .domain(d3.extent(this.data, d => d.date))
        .range([this.margin.left, this.width - this.margin.right])

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.value)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

      // линия х
      const xAxis = g => g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))
        .attr('font-size', '12px')
        .attr('color', '#424242')
        .attr('class', 'line-x')

      // .ticks - отображение цитфр у линии х
      const yAxis = g => g
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(this.data.y))

      const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

      this.chartContainer = d3.select(this.$el)
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('class', 'show-all-option')
        // .attr('background', 'red')

      this.chartContainer.append('g')
        .call(xAxis)
      //
      // this.chartContainer.append('g')
      //   .call(yAxis)

      this.chartContainer.append('path')
        .datum(this.data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line)
        // .style('fill', 'red')
    }
  }
}
</script>
<style lang="scss">
  .show-all-option {
    width: 100%;
  }
</style>
