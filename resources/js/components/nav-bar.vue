<script>
import i18n from "../i18n";
import simplebar from "simplebar-vue";

/**
 * Nav-bar Component
 */
export default {
  name:'nav-bar',
  data() {
    return {
    notifications:[],
    notificationCount : '',
    username : '',
      languages: [
        {
          flag: "/images/flags/us.jpg",
          language: "en",
          title: "English",
        },
        {
          flag: "/images/flags/french.jpg",
          language: "fr",
          title: "French",
        },
        {
          flag: "/images/flags/spain.jpg",
          language: "es",
          title: "Spanish",
        },
        {
          flag: "/images/flags/chaina.png",
          language: "zh",
          title: "Chinese",
        },
        {
          flag: "/images/flags/arabic.png",
          language: "ar",
          title: "Arabic",
        },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  components: { simplebar },
  mounted() {
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
   
    this.getNotification();
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    getNotification(){
      axios
      .get('/api/notification').then((response)=>{
      console.log(response.data)
      this.notifications = response.data.data;
      this.notificationCount = response.data.notificationCount;
      this.username = response.data.username;

      
      })
      .catch((response) => {
        console.log('error');
      })
    },
    clearAll(){
      axios
      .get('/api/notification/delete').then((response)=>{
      console.log(response)
      window.location.reload();
      
      })
    },
  },
};
</script>

<template>
  <header id="page-topbar" class="SADADSA">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="/dashboard/home" class="logo logo-dark">
            <span class="logo-sm">
              <img src="/images/logo.svg" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="/images/logo-dark.png" alt height="17" />
            </span>
          </a>

          <a href="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="/images/users/dealmih.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="/images/logo-light.png" alt height="29" />
            </span>
          </a>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />
            <span class="bx bx-search-alt"></span>
          </div>
        </form>

        <b-dropdown
          variant="black"
          class="dropdown-mega d-none d-lg-block ms-2"
          toggle-class="header-item"
          menu-class="dropdown-megamenu dropdown-menu-end"
        >
          <!-- <template v-slot:button-content>
            {{ $t('navbar.dropdown.megamenu.text') }}
            <i class="mdi mdi-chevron-down"></i>
          </template> -->

          <div class="row">
            <div class="col-sm-8">
              <div class="row">
                <div class="col-md-4">
                  <h5 class="font-size-14 mt-0">{{ $t('navbar.dropdown.megamenu.uicontent.title') }}</h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.lightbox') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.rangeslider') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.sweetalert') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.rating') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.forms') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.tables') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.charts') }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-md-4">
                  <h5
                    class="font-size-14 mt-0"
                  >{{ $t('navbar.dropdown.megamenu.application.title') }}</h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.ecommerce') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.calendar') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.email') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.projects') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.tasks') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.application.list.contacts') }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-md-4">
                  <h5
                    class="font-size-14 mt-0"
                  >{{ $t('navbar.dropdown.megamenu.extrapages.title') }}</h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.lightsidebar') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.compactsidebar') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.horizontallayout') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.maintenance') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.comingsoon') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.timeline') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.extrapages.list.faqs') }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="font-size-14 mt-0">{{ $t('navbar.dropdown.megamenu.uicontent.title') }}</h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.lightbox') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.rangeslider') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.sweetalert') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.rating') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.forms') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.tables') }}</a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                      >{{ $t('navbar.dropdown.megamenu.uicontent.list.charts') }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-sm-5">
                  <div>
                    <img
                      src="/images/megamenu-img.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-dropdown>
      </div>

      <div class="d-flex">
        <b-dropdown
          class="d-inline-block d-lg-none ms-2"
          variant="black"
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          right
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>

        <!-- <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{text}}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :class=" {'active' : lan === entry.language}"
          >
            <img :src="`${entry.flag}`" alt="user-image" class="me-1" height="12" />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown> -->

        <!-- <b-dropdown
          class="d-none d-lg-inline-block noti-icon"
          menu-class="dropdown-menu-lg dropdown-menu-end"
          right
          toggle-class="header-item"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-customize"></i>
          </template>

          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/github.png" alt="Github" />
                  <span>{{ $t('navbar.dropdown.site.list.github') }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/bitbucket.png" alt="bitbucket" />
                  <span>{{ $t('navbar.dropdown.site.list.github') }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/dribbble.png" alt="dribbble" />
                  <span>{{ $t('navbar.dropdown.site.list.dribbble') }}</span>
                </a>
              </div>
            </div>

            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/dropbox.png" alt="dropbox" />
                  <span>{{ $t('navbar.dropdown.site.list.dropbox') }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/mail_chimp.png" alt="mail_chimp" />
                  <span>{{ $t('navbar.dropdown.site.list.mailchimp') }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="/images/brands/slack.png" alt="slack" />
                  <span>{{ $t('navbar.dropdown.site.list.slack') }}</span>
                </a>
              </div>
            </div>
          </div>
        </b-dropdown> -->

      
       <div class="dropdown d-none d-lg-inline-block ms-1 mt-4">
         
            <a href="/" class="noti-icon"><i class="bx bx-home"></i></a>
         
        </div>

        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button type="button" class="btn header-item noti-icon" @click="initFullScreen">
            <i class="bx bx-fullscreen"></i>
          </button>
        </div>

        <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span
              class="badge bg-danger rounded-pill"
            >{{notificationCount}}</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">{{ $t('navbar.dropdown.notification.text')}}</h6>
              </div>
              <div class="col-auto">
                <button @click="clearAll()" class="small" style="border: none;background-color: transparent;color: #567df4;font-weight: 500;">Clear All</button>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px;">
            <div v-for="notification in notifications" :key="notification.id" class="notify">
            <a :href="'/product/detail/' +notification.slug" target="_balnk" class="text-reset notification-item">
              <div class="media" style="align-items:center;">
                
                <div class="media-body">
                  <h6 class="mt-0 mb-1"></h6>
                  <div  class="font-size-12 text-muted">
                  <p class="mb-1 mt-3 text-align">{{ notification.notification }}</p>
                    <p class="mb-0 text-end">
                      <i class="mdi mdi-clock-outline"></i>
                        <span>{{ new Date(notification.created_at).toLocaleString("TR") }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
            </div>
            </a>
            <!-- <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">{{ $t('navbar.dropdown.notification.james.title')}}</h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">{{ $t('navbar.dropdown.notification.james.text')}}</p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.james.time')}}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span class="avatar-title bg-success rounded-circle font-size-16">
                    <i class="bx bx-badge-check"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">{{ $t('navbar.dropdown.notification.item.title')}}</h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">{{ $t('navbar.dropdown.notification.item.text')}}</p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.item.time')}}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">{{ $t('navbar.dropdown.notification.salena.title')}}</h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">{{ $t('navbar.dropdown.notification.salena.text')}}</p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.salena.time')}}
                    </p>
                  </div>
                </div>
              </div>
            </a> -->
          </simplebar>
         <div class="p-2 border-top d-grid">
            <a href="/dashboard/notification/" target="_balnk" class="btn btn-sm btn-link font-size-14 text-center" >
              <i class="mdi mdi-arrow-down-circle me-1"></i>
              <span key="t-view-more"> {{ $t('navbar.dropdown.notification.button')}} </span>
            </a>
          </div>
        </b-dropdown>

        <b-dropdown right variant="black" toggle-class="header-item" menu-class="dropdown-menu-end">
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="/images/users/dealmih.png"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ms-1">{{ username }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
      
          <b-dropdown-item href="/profile">
            <i class="bx bx-user font-size-16 align-middle me-1"></i>
            {{ $t('navbar.dropdown.henry.list.profile') }}
          </b-dropdown-item>
        
          <b-dropdown-item href="/dashboard/settings">
            <i class="bx bx-cog font-size-16 align-middle me-1"></i>
          Settings
          </b-dropdown-item>
          <!-- <b-dropdown-item class="d-block" href="javascript: void(0);">
            <span class="badge bg-success float-end">11</span>
            <i class="bx bx-wrench font-size-16 align-middle me-1"></i>
            {{ $t('navbar.dropdown.henry.list.settings') }}
          </b-dropdown-item> -->
          <!-- <b-dropdown-item href="javascript: void(0);">
            <i class="bx bx-lock-open font-size-16 align-middle me-1"></i>
            {{ $t('navbar.dropdown.henry.list.lockscreen') }}
          </b-dropdown-item> -->
          <b-dropdown-divider></b-dropdown-divider>
          <a href="/logout" class="dropdown-item text-danger">
            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
            {{ $t('navbar.dropdown.henry.list.logout') }}
          </a>
        </b-dropdown>

           <div class="dropdown d-none d-lg-inline-block ms-1 mt-4">
         
            <a href="/dashboard/settings" class="noti-icon"><i class="bx bx-cog bx-spin toggle-right"></i></a>
         
        </div>

        <!-- <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="bx bx-cog bx-spin toggle-right"></i>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</template>
