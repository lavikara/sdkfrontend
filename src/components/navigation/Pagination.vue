<template>
  <div id="pagination">
    <div
      class="pagination-container tw-text-xs tw-text-black-light tw-flex tw-items-center"
    >
      <span class="chevron-btn">
        <a
          class="page-link tw-bg-white tw-border tw-border-t tw-border-b tw-cursor-pointer tw-rounded-tl tw-rounded-bl tw-py-2 tw-px-4"
          :class="{
            disabled: currentPage === 1,
          }"
          @click="onPageClick(currentPage - 1)"
        >
          Prev
        </a>
      </span>

      <span
        v-for="(i, y) in pages"
        :key="i + y"
        class=""
        :class="{ 'page-item': 1, active: currentPage == i }"
      >
        <a
          v-if="y < maxVisible"
          class="page-link tw-bg-white tw-cursor-pointer tw-border-t tw-border-b tw-border-r tw-py-2 tw-px-4"
          @click="onPageClick(i)"
          >{{ i }}</a
        >
      </span>

      <span class="chevron-btn">
        <a
          class="page-link tw-bg-white tw-border-r tw-border-t tw-border-b tw-cursor-pointer tw-rounded-tr tw-rounded-br tw-py-2 tw-px-4"
          :class="{
            disabled: currentPage === totalPage,
          }"
          @click="onPageClick(currentPage + 1)"
        >
          Next
        </a>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      currentPage: { type: Number, default: () => 1, required: true },
      totalPage: { type: Number, default: () => 0, required: true },
      maxVisible: { type: Number, default: () => 5, required: true },
    },

    emits: ["pageChange"],

    data() {
      return {}
    },

    computed: {
      pages() {
        function range(start, end) {
          return Array.from(Array(end - start + 1), (_, i) => i + start)
        }

        const max = this.maxVisible
        const middle = Math.floor(this.maxVisible / 2)

        if (this.totalPage < max) {
          return range(1, this.totalPage)
        }

        let start = this.currentPage - middle
        let end = this.currentPage + middle

        if (this.currentPage >= this.totalPage - middle) {
          start = this.totalPage - max + 1
          end = this.totalPage
        }
        return range(Math.max(1, start), Math.max(end, max))
      },
    },

    methods: {
      onPageClick(page) {
        if (this.currentPage === page || page === 0 || page > this.totalPage) {
          return
        }
        this.$emit("pageChange", page)
      },
    },
  }
</script>

<style lang="scss" scoped>
  #pagination {
    .pagination-container {
      height: 40px;
      .page-item {
        &.active > .page-link {
          color: $brand-primary;
        }

        .active {
          cursor: not-allowed;
        }
      }

      .page-link {
        height: 40px;
      }

      .disabled {
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  }
</style>
