<template>
  <div class="panel card" v-bind:class="{'panel-vertical': !isHorizontal(), 'panel-horizontal': isHorizontal(), 'panel-collapsed': collapsed}"
       style="display: grid; grid-template-rows: 4em calc(100% - 4em);">
    <!-- div v-bind:class="{card: 1, 'h-100': !collapsed}" -->
    <div class="card-header panel-heading clearfix">
      <span class="panel-title">
        <slot v-if="hasSlot('header')" name="header"></slot>
        <template v-else>
            <i v-bind:class="icon" v-if="icon"></i> {{name}}
        </template>
      </span>
      <div class="panel-buttons panel-tool-options">
        <slot name="actions"></slot>
        <actions v-bind:actions="actions" v-bind:action-class="actionClass" @click="click" @collapse="collapse"></actions>
      </div>
    </div>
    <div :class="bodyClass" v-show="!collapsed" style="overflow: auto">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        icon: String,
        name: String,
        actions: Object,
        actionClass: String,
        direction: String,
        bodyClass: {
            type: null,
            default: "card-body panel-body"
        }
    },
    data() {
        return {
            collapsed: this.actions && this.actions.collapse ? this.actions.collapse.active : false,
        }
    },
    methods: {
        hasSlot(name) {
            return !!this.$scopedSlots[name];
        },
        isHorizontal() {
            return this.direction !== 'vertical';
        },
        collapse(key, action) {
            this.collapsed = action.active;
        },
        click(key, action) {
            this.$emit(key, action);
            this.$emit('click', key, action);
        }
    }
}
</script>

<style lang="scss" scoped>
  .panel-vertical {
      height: 100%;
  }
  .panel-vertical.panel-collapsed {
      width: 5em;
      height: 100%;
  }
  .panel-vertical.panel-collapsed .card-header {
      position: relative;
      /*display: inline-block;*/
      height: 100%;
  }
  .panel-vertical.panel-collapsed .panel-title {
      transform: rotate(-90deg) translate(0, 50%);
      transform-origin: 0 50%;
      position: absolute;
      white-space: pre;
      bottom: 0em;
  }
  .panel-vertical .panel-buttons {
      float: right;
  }
  .panel-vertical.panel-collapsed .panel-buttons {
      float: none;
  }

  .panel-horizontal {
      height: 100%;
  }
  .panel-horizontal .panel-buttons {
      float: right;
  }
  .panel-horizontal.panel-collapsed {
      height: auto;
  }
</style>
