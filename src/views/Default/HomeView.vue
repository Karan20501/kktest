<template>
  <div>
    <HomeBanner />
    <div class="container p-8 mx-auto mt-10 max-w-7xl" v-if="settings">
      <div class="relative"> <!-- Relative for positioning the scroll buttons -->

        <button @click="scrollLeft" class="scroll-button left-button">
          <img src="/img/icons/arrow-left.svg" alt="Scroll Left" />
        </button>

        <button @click="scrollRight" class="scroll-button right-button">
          <img src="/img/icons/arrow-right.svg" alt="Scroll Right" />
        </button>

        <div class="overflow-x-auto vendor-container"> <!-- Container for horizontal scrolling -->
          <div class="flex space-x-4"> <!-- Flex for horizontal layout -->
            <router-link
              :to="{
                name: 'VendorHome',
                params: {
                  id: vendor.id,
                  slug: vendor.name ? sanitizeTitle(vendor.name) : sanitizeTitle(vendor.slug),
                },
              }"
              class="flex flex-col items-center p-2 transition-transform duration-200 hover:scale-95 rounded"
              v-for="vendor in vendors"
              :key="vendor.id"
            >
              <div
                class="flex items-center justify-center w-16 h-16 md:w-40 md:h-40"
                :style="{ 'background-color': vendor.color }"
              >
                <img v-if="vendor" :src="vendor.logo" class="w-full h-full object-contain" alt="" />
              </div>
              <div class="text-center mt-2">
                <h1 class="text-sm font-bold">{{ vendor.name }}</h1>

              </div>
            </router-link>
          </div>
        </div>

      </div>

      <!-- Other content remains unchanged -->
      <div class="container mx-auto mt-20 bg-blue-50 rounded-none md:max-w-7xl">
        <div class="flex flex-row">
          <div class="p-5 mr-10 md:w-6/12 md:p-9">
            <h1 class="text-base font-extrabold text-black md:text-3xl">
              {{ $t("landingpageJoin") }}
            </h1>
            <p class="mt-1 mb-2 text-xs font-light text-gray-500 md:text-sm md:w-96">
              {{ $t("landingpageJoinSubHeader") }}
            </p>
            <a
              :style="{ 'background-color': settings.colors.primaryColor }"
              :href="`${this.$store.state.baseUrl}register/vendor`"
              target="__blank"
              class="flex items-center justify-center h-10 px-2 py-2 mt-5 mb-5 text-xs font-light text-center text-white rounded-none w-30 md:w-44 md:text-base md:h-14"
            >
              {{ $t("landingpageSellerHeader") }}
            </a>
            <hr class="mt-2" />
            <div class="flex justify-between mt-3">
              <div class="flex">
                <img src="/img/icons/money.svg" class="w-5 h-5" alt="" />
                <div class="ml-2">
                  <h1 class="text-xs font-medium md:text-sm">
                    {{ $t("landingpageSellerFeat1") }}
                  </h1>
                  <p class="text-xs font-light text-gray-500">
                    {{ $t("landingpageSellerFeat3") }}
                  </p>
                </div>
              </div>
              <div class="flex">
                <img
                  src="/img/icons/list.svg"
                  class="w-5 h-5 font-light rotate-180"
                  alt=""
                />
                <div class="ml-2">
                  <h1 class="text-xs font-medium md:text-sm">
                    {{ $t("landingpageSellerFeat2") }}
                  </h1>
                  <p class="text-xs font-light text-gray-500">
                    {{ $t("landingpageSellerFeat4") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/img/woman.JPG"
            class="hidden w-6/12 rounded-none md:h-80 md:flex"
            alt=""
          />
        </div>
      </div>

      <div class="container flex flex-col items-center justify-center mx-auto my-20 md:max-w-7xl">
        <h1 class="text-base font-bold tracking-wide text-center md:text-3xl">
          {{ $t("landingpageRide.landingpageRiderHeader") }}
        </h1>
        <p class="mt-2 text-xs font-light tracking-wide text-center text-gray-500 md:text-sm md:w-96">
          {{ $t("landingpageRide.landingpageRiderSubHeader") }}
        </p>
        <a
          :style="{ 'background-color': settings.colors.primaryColor }"
          :href="`${this.$store.state.baseUrl}register/driver`"
          target="__blank"
          class="flex items-center justify-center h-10 px-2 py-2 mt-5 mb-5 text-xs font-light text-center text-white rounded-none w-30 md:w-40 md:text-base md:h-14"
        >
          {{ $t("landingpageRide.landingpageRiderButton") }}
        </a>
      </div>
    </div>

    <div class="mt-5 bg-blue-50">
      <div class="container max-w-full mx-auto">
        <div class="grid grid-cols-1 md:gap-5 py-14 md:grid-cols-2">
          <div>
            <img
              src="/img/phone.png"
              class="mx-auto md:w-72 md:h-72 h-52 w-52"
              alt=""
            />
          </div>
          <div class="p-5 md:w-9/12">
            <h1 class="text-xl font-bold tracking-wide md:text-3xl">
              {{ $t("downloadPage.header") }}
            </h1>
            <p class="my-3 text-sm font-light tracking-wide text-gray-500">
              {{ $t("downloadPage.subHeader") }}
            </p>
            <hr />
            <div class="flex flex-row mt-6" v-if="settings">
              <a :href="settings.strings.androidDownloadLink" target="__blank">
                <img src="/img/play-store.png" class="h-9 md:h-20" />
              </a>
              <a :href="settings.strings.iosDownloadLink" target="__blank">
                <img src="/img/app-store.png" class="h-9 md:h-20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HomeBanner from "@/components/Default/HomeBanner.vue";

export default {
  name: "HomeView",
  components: {
    HomeBanner,
  },
  data() {
    return {
      vendors: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      search: null,
      types: null,
      scrollAmount: 300, // Amount to scroll on button click
    };
  },
  mounted() {
    let selectedLanguage = localStorage.getItem("selectedLanguage");
    const headers = { lang: selectedLanguage };
    this.$store.commit("loading", true);

    axios
      .get(this.base_url + "api/vendor/types", { headers })
      .then((response) => {
        this.vendors = response.data;
        this.$store.commit("loading", false);
      })
      .catch((error) => console.log(error));

    this.$store.dispatch("fetchSettings", this.items).then(() => {
      this.settings = this.$store.state.settings;
      this.currency = this.settings.strings.currency;
    });
  },
  methods: {
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },
    sanitizeTitle(title) {
      let slug = title.toLowerCase()
        .replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e")
        .replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a")
        .replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o")
        .replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u")
        .replace(/đ/gi, "d")
        .replace(/\s*$/g, "")
        .replace(/\s+/g, "-");
      return slug;
    },
    scrollLeft() {
      const container = this.$el.querySelector('.vendor-container');
      container.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    },
    scrollRight() {
      const container = this.$el.querySelector('.vendor-container');
      container.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
.vendor-container {
  overflow-x: hidden; /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
}

.vendor-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

.scroll-button {
  position: absolute;
  top: 10px; /* Adjusted for top placement */
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
}

.left-button {
  right: 60px; /* Positioning to the right */
}

.right-button {
  right: 10px; /* Positioning to the right */
}

.scroll-button img {
  width: 20px;
  height: 20px;
}

/* Zoom out effect on vendor hover */
.router-link {
  transition: transform 0.2s; /* Smooth transition */
}

.router-link:hover {
  transform: scale(0.95); /* Zoom out */
}
</style>
