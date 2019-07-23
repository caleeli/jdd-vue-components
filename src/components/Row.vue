<template>
  <div class="grid-row">
    <div
      v-for="(col, index) in config.columns"
      :key="index"
      :style="{width: config.colWidths[index]}"
    >
      <slot v-for="cell in col" :style="{width:cell.width}" :name="cell.name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    widths: Array
  },
  data() {
    return {
      width: 2000
    };
  },
  computed: {
    config() {
      const dist = this.distribute([], this.widths, Math.max(this.width, ...this.widths));
      const colWidths = [];
      const colSubWidths = [];
      let totalWidth = 0;
      dist.final.forEach(col => {
        let max = this.max(col);
        totalWidth += max;
        let w = 0;
        col.forEach(ci => {
          let c = ci;
          w += c;
          if (w > max) {
            colSubWidths.push(w - c);
            w = c;
          }
        });
        colSubWidths.push(w);
      });
      let j = 0,
        k = 1;
      const columns = [];
      dist.final.forEach(col => {
        let max = this.max(col);
        colWidths.push((max / totalWidth) * 100 + "%");
        let w = 0;
        const column = [];
        columns.push(column);
        col.forEach(ci => {
          let c = ci;
          w += c;
          column.push({
            name: "c" + k,
            width: (c / colSubWidths[j]) * 100 + "%"
          });
          k++;
          if (w > max) {
            j++;
            w = c;
          }
        });
        j++;
      });
      return {
        colWidths: colWidths,
        columns: columns
      };
    }
  },
  methods: {
    max(columns) {
      let max = -1;
      columns.forEach(col => (max = col > max ? col : max));
      return max;
    },
    distribute(left0, array, maxWidth) {
      const left = left0.slice();
      if (!array.length) {
        let points = 0;
        let width = 0;
        left.forEach(col => {
          let max = this.max(col);
          width += max;
          let w = 0;
          let perdida = 0;
          col.forEach(ci => {
            let c = ci;
            w += c;
            if (w > max) {
              perdida += max - w + c;
              w = c;
            }
          });
          perdida += max - w;
          points -= perdida / max;
        });
        return { final: left, points: points, width: width };
      } else {
        let j = left.length;
        let column = [];
        left.push(column);
        let better = [];
        let max = -1000000;
        let betterWidth = 0;
        array.forEach((w, i) => {
          column.push(w);
          left[j] = column.slice();
          let response = this.distribute(left, array.slice(i + 1), maxWidth);
          let final = response.final;
          let points = response.points;
          let width = response.width;
          if (points > max && width <= maxWidth) {
            better = final;
            max = points;
            betterWidth = width;
          }
        });
        return { final: better, points: max, width: betterWidth };
      }
    },
    colWidth(col) {
      let width = 0;
      col.forEach(cell => {
        width = cell.width > width ? cell.width : width;
      });
      return width;
    }
  },
  mounted() {
    this.updateWidth = () => {
      this.width = this.$el.clientWidth;
    };
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateWidth);
  }
};
</script>

<style lang="scss" scoped>
.grid-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
