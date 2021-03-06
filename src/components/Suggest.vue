<template>
  <div class="select-owner">
    <input
      class="form-control selected-input dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      :placeholder="placeholder"
      @focus="focus"
      @blur="blur"
      @click="click"
      v-model="text"
    />
    <ul class="dropdown-menu select-list">
      <li
        v-for="(row, index) in dataFilteredSmall"
        :key="index"
        v-bind:value="getKey(row)"
        class="dropdown-item"
        @click="select(row)"
      >
        <slot :row="row" :format="format"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
const SEP = ",";
export default {
  props: {
    placeholder: String,
    data: Array,
    value: null,
    filterBy: String,
    idField: String,
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: null,
      text: "",
      dataFiltered: [],
      inputFocus: false
    };
  },
  computed: {
    dataFilteredSmall() {
      return this.dataFiltered.slice(0, 5);
    },
    textShown() {
      const text = this.text;
      const value = this.value;
      return this.inputFocus ? text : value;
    },
    selected() {
      let value = this.multiple
        ? this.value
          ? this.value.split(SEP)
          : []
        : this.value;
      if (this.multiple) {
        const selected = [];
        value.forEach(id => {
          selected.push(
            this.data.find(item => {
              return id === String(this.getKey(item));
            })
          );
        });
        return selected;
      } else {
        return this.data.find(item => {
          return value === String(this.getKey(item));
        });
      }
    }
  },
  watch: {
    data() {
      this.filter();
    },
    text(value) {
      this.$emit("input", value);
      this.filter();
    }
  },
  methods: {
    /**
     * Remove a selected item
     * @returns this
     */
    remove(item) {
      const value = this.value ? this.value.split(SEP) : [];
      const selected = String(this.getKey(item));
      const index = value.indexOf(selected);
      index !== -1 ? value.splice(index, 1) : null;
      this.$emit("input", value.join(SEP));
      this.$emit("change", this.selected);
    },
    updateText(event) {
      this.text = event.target.value;
    },
    getKey(row) {
      return Object.evaluateRef(row, this.idField ? this.idField : "id");
    },
    textValue(value) {
      return window.$("<i></i>")
        .text(value)
        .html();
    },
    format(input) {
      let value = this.textValue(input);
      if (!this.text) {
        return value;
      }
      let text = this.text;
      let length = text.length;
      let res = "";
      let u = -1;
      let i;
      while (
        (i = value
          .toLowerCase()
          .localeIndexOf(text, "en", { sensitivity: "base" })) > -1
      ) {
        res += value.substr(0, i);
        res += "<code>";
        res += value.substr(i, length);
        res += "</code>";
        u = i + length;
        value = value.substr(u);
      }
      res += value;
      return res;
    },
    filter() {
      var filterBy = this.filterBy ? this.filterBy.trim() : "";
      var filters = filterBy ? filterBy.split(/[, ]+/) : [];
      const dataFiltered = this.data.filterBy(
        filters,
        this.text,
        (item, value) => {
          return (
            this.textValue(item).localeIndexOf(value, "en", {
              sensitivity: "base"
            }) > -1
          );
        }
      );
      this.dataFiltered.splice(0);
      for (let i = 0, l = dataFiltered.length; i < l; i++) {
        this.dataFiltered.push(dataFiltered[i]);
      }
    },
    isOpen() {
      return window.$(this.$el)
        .find("ul:first")
        .is(":visible");
    },
    click() {
      setTimeout(() => {
        if (!this.isOpen()) {
          window.$(this.$el)
            .find(".dropdown-menu")
            .toggle();
        }
      }, 100);
    },
    focus() {
      this.inputFocus = true;
      setTimeout(() => {
        if (!this.isOpen()) {
          window.$(this.$el)
            .find(".dropdown-menu")
            .toggle();
        }
      }, 100);
    },
    blur() {
      this.inputFocus = false;
      setTimeout(() => {
        if (this.isOpen()) {
          window.$(this.$el)
            .find(".dropdown-menu")
            .toggle();
        }
      }, 500);
    },
    select(row) {
      if (this.multiple) {
        const value = this.value ? this.value.split(SEP) : [];
        const selected = String(this.getKey(row));
        value.indexOf(selected) === -1 ? value.push(selected) : null;
        this.text = value.join(SEP);
        this.$emit("input", value.join(SEP));
        this.$emit("change", this.selected);
      } else {
        this.text = String(this.getKey(row));
        this.$emit("input", String(this.getKey(row)));
        this.$emit("change", row);
      }
      window.$(this.$el)
        .find(".selected-option")
        .focus();
    }
  },
  mounted() {
    this.filter();
  }
};
</script>

<style lang="scss" scoped>
.select-owner {
  position: relative;
}
.selected-option {
  position: absolute;
  padding: 0.375rem 0.75rem;
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.select-list {
  max-width: 80vw;
  overflow: hidden;
}
.select-list .dropdown-item {
  font-weight: normal;
}
</style>
