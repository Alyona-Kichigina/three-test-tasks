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
        line-height: 38px;
        padding: 0 30px;
        color: rgb(34, 34, 34);
        font-size: 1rem;
        margin-right: 7px;
        transition: all 0.3s ease-in-out;
	      text-transform: uppercase;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
	        font-weight: 700;
        }
        &.active {
	        font-weight: 700;
          border-bottom: 1px solid $gold-user;
        }
      }
    }
    .tab-content {
    
    }
  }
</style>
