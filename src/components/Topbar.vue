<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <slot name="logo"></slot>

    <div class="navbar-right">
      <ul class="navbar-nav mr-auto">
        <template v-for="menu in menus(0)">
          <li v-if="menu.route==='#'" class="nav-item dropdown" :key="menu.id">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{menu.name}}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link
                v-for="submenu in menus(menu.id)"
                v-bind:key="submenu.id"
                class="dropdown-item"
                :to="submenu.route"
              >{{submenu.name}}</router-link>
            </div>
          </li>
          <li v-else class="nav-item" :key="menu.id">
            <router-link class="nav-link" :to="menu.route">{{menu.name}}</router-link>
          </li>
        </template>
      </ul>
      <slot name="right"></slot>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    csrfToken() {
      let tag = document.head.querySelector('meta[name="csrf-token"]');
      return tag ? tag.content : null;
    }
  },
  methods: {
    menus(id) {
      return this.value.filter(item => item.parent === id);
    }
  }
};
</script>

<style scoped>
.navbar-right {
  display: flex;
  flex-grow: 1;
}
</style>
