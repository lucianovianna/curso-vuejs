<template>
  <div class="modal">
    <div class="modal-content">
      <slot name="header"></slot>
      <slot name="body"></slot>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  mounted() {
    $(this.$el).modal();
  },
  methods: {
    show() {
      this.getModal().open();
    },
    close() {
      this.getModal().close();
    },
    getModal() {
      return window.M.Modal.getInstance(this.$el);
    },
  },
};
</script>