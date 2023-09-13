<template>
  <section
    class="search tw-flex md:tw-mb-0 md:tw-justify-end tw-items-center tw-h-12"
    :class="[showSearchField ? 'search--expanded' : 'md:tw-w-32 md:tw-mr-6']"
  >
    <transition name="fade-transform" mode="out-in">
      <form
        @submit.prevent=""
        v-if="showSearchField"
        class="search__form"
        :class="{ 'md:tw-mr-2': !showSearchField }"
      >
        <input
          type="search"
          name="search"
          id="search"
          v-model="searchValue"
          placeholder="Search ..."
          ref="searchInput"
          v-focus
          @keyup.enter="
            $emit('search-enter', {
              value: searchValue.toLowerCase(),
              type: 'name',
            })
          "
          @input="
            $emit('search-input', {
              value: searchValue.toLowerCase(),
              type,
            })
          "
          class="tw-h-12 tw-pl-5 search__input tw-w-full tw-rounded tw-text-secondary"
          @blur="$emit('search-click')"
        />
      </form>
      <button
        class="md:tw-w-28 tw-h-10 search__button tw-bg-gray-light tw-flex tw-items-center tw-justify-between"
        @click="$emit('search-click')"
        v-else
      >
        <span class="tw-hidden md:tw-block">Search</span>
        <img
          src="@/assets/img/search.svg"
          class="tw-w-5 tw-h-5"
          alt="search"
          loading="lazy"
        />
      </button>
    </transition>
  </section>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        searchValue: "",
      }
    },
    emits: ["search-click", "search-input", "search-enter"],
    props: {
      showSearchField: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    transition: width 300ms ease-in-out;
    &--expanded {
      width: 100%;
      max-width: 100%;
      @media (min-width: 768px) {
        width: 370px;
      }
    }
    &__form {
      flex-basis: 100%;
      display: block;
    }
    &__button {
      color: #4c5b90;
      font-size: 15px;
      padding: 8px 14px;
      border-radius: 4px;
      &:hover {
        background: transparent;
        cursor: pointer;
      }
    }
    &__input {
      border: 1px solid #dde1e9;
    }
  }
</style>
