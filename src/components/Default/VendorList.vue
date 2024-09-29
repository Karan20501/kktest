<template>
  <div class="container mx-auto max-w-7xl" style="padding: 0 1rem;">
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-medium">{{ $t('pages.vendors') }}</h1>
      <router-link
        :to="{ name: 'DefaultVendors', params: { id: $route.params.id, slug: $route.params.slug }}"
        class="text-xs font-light">
        {{ $t('pages.seeall') }}
      </router-link>
    </div>

    <div
      class="vendor-list"
      style="display: flex; overflow-x: auto; white-space: nowrap; padding: 10px 0; scrollbar-width: none; -ms-overflow-style: none; border: 1px solid #ddd; border-radius: 8px;"
      onmouseover="this.style.overflowY='hidden';"
      onmouseleave="this.style.overflowY='auto';"
    >
      <div style="display: flex; gap: 20px;">
        <router-link
          v-for="vendor in vendors"
          :key="vendor.id"
          :to="{ name: 'DefaultVendor', params: { id: vendor.id, slug: sanitizeTitle(vendor.name) }}"
          class="vendor-box"
          style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px; min-width: 150px; transition: background-color 0.3s ease, transform 0.3s ease; display: flex; flex-direction: column; align-items: center; cursor: pointer;"
          @mouseover="event.target.style.backgroundColor = '#ffcccc'"
          @mouseleave="event.target.style.backgroundColor = '#f9f9f9'"
        >
          <img v-if="vendor" v-bind:src="vendor.logo" class="vendor-logo" style="width: 64px; height: 64px; margin: 0 auto;" alt="">
          <div style="text-align: center; margin-top: 10px;">
            <h1 style="font-size: 0.875rem; font-weight: bold;">{{ truncate(vendor.name, 15) }}</h1>
            <p style="margin-top: 4px; font-size: 0.75rem; font-weight: 300; color: gray;">{{ vendor.delivery_time ?? '0' }} mins away</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VendorHome',
  props: {
    vendors: Object,
  },

  methods: {
    truncate(str, n) {
      return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    },
    sanitizeTitle(title) {
      let slug = title.toLowerCase()
        .replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
        .replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
        .replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
        .replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
        .replace(/đ/gi, 'd')
        .replace(/\s*$/g, '')
        .replace(/\s+/g, '-');

      return slug;
    },
  }
}
</script>
