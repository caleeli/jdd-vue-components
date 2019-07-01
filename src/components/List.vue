<template>
  <ul class="list-group">
    <template v-for="item in items(null)">
      <slot :item="item" :control="status[indexItem(item)]" :level="'level-1'"></slot>
      <template v-if="status[indexItem(item)].status.open">
        <template v-for="item in items(item.id)">
          <slot :item="item" :control="status[indexItem(item)]" :level="'level-2'"></slot>
          <template v-if="status[indexItem(item)].status.open">
            <template v-if="status[indexItem(item)].status.open">
              <template v-for="item in items(item.id)">
                <slot :item="item" :control="status[indexItem(item)]" :level="'level-3'"></slot>
                <template v-if="status[indexItem(item)].status.open">
                  <template v-for="item in items(item.id)">
                    <slot :item="item" :control="status[indexItem(item)]" :level="'level-4'"></slot>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
      </template>
    </template>
  </ul>
</template>

<script>
function NodeControl(item) {
  this.item = item;
  this.status = {
    open: true
  };
}
NodeControl.prototype.close = function() {
  this.status.open = false;
};
NodeControl.prototype.open = function() {
  this.status.open = open;
};
NodeControl.prototype.toggle = function(owner) {
  this.status.open = !this.status.open;
  return {
    hasAction: this.action(owner)
  };
};
NodeControl.prototype.action = function(owner) {
  if (typeof this.item.action === "string") {
    const action = new Function(this.item.action).bind(owner);
    action();
    return true;
  }
  return false;
};
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      status: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.status.splice(0);
        this.value.forEach(element => {
          this.status.push(new NodeControl(element));
        });
      }
    }
  },
  methods: {
    indexItem(item) {
      return this.value.indexOf(item);
    },
    items(id) {
      return this.value.filter(item => item.parent === id);
    }
  }
};
</script>

<style scoped>
.level-1 {
  padding-left: 1em;
}
.level-2 {
  padding-left: 2em;
}
.level-3 {
  padding-left: 3em;
}
.level-4 {
  padding-left: 4em;
}
</style>
