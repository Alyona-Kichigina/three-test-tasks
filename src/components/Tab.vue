<script>
export default {
  name: 'Tab',
  props: {
    tabTitles: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    clickTab (i) {
      this.activeTab = i
    }
  },
  render (h) {
    const tabsHeaders = this.tabTitles.map((header, index) => (
      <div
        onClick={() => this.clickTab(index)}
        class={`${index === this.activeTab && 'active'} tab-item`}
      >
        {header}
      </div>
    ))
    return (
      <div class="tab">
        <div class="tabs">
          {tabsHeaders}
        </div>
        <div class="tab-content">
          <div class="tab-pane">
            {this.$slots.default[this.activeTab]}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
  .tab {
    .tabs {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid $border-color;
      margin-bottom: 35px;
      .tab-item {
        line-height: 24px;
        padding: 0 30px;
        margin-right: 7px;
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          font-weight: 700;
        }
        &.active {
          font-weight: 700;
          &:before {
            background: $gold-user;
          }
        }
        &:before {
          content: '';
          transition: all .3s ease-in-out;
          position: absolute;
          bottom: -1px;
          height: 1px;
          background: transparent;
          left: 0;
          right: 0;
        }
      }
    }
  }
</style>
