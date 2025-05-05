<template>
  <nav ref="navbar" class="navbar" :class="{ 'navbar-scrolled': scrolled }">
    <div class="container navbar-container">
      <div class="logo">GWEN</div>
      <div class="nav-links">
        <a href="#" class="nav-link">Accueil</a>
        <RouterLink to="/collection" class="nav-link"> Collection </RouterLink>
        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
      </div>
      <div class="nav-icons">
        <!-- <a href="#" class="icon-link">
          <span class="material-icons">search</span>
        </a> -->

        <!-- Icône panier avec badge -->
        <RouterLink to="/panier" class="icon-link cart-icon-wrapper">
          <span class="material-icons">shopping_bag</span>
          <span v-if="user && cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </RouterLink>


        <div class="user-section">
          <template v-if="user">
            <div class="user-email" @click="toggleUserMenu">
              {{ user.email }}
              <span class="material-icons user-arrow">expand_more</span>
            </div>
            <div v-if="userMenuOpen" class="user-menu">
              <div class="user-menu-item" @click="handleLogout">Déconnexion</div>
            </div>
          </template>
          <RouterLink v-else to="/signing" class="icon-link">
            <span class="material-icons">person_outline</span>
          </RouterLink>
        </div>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">
      <a href="#" class="mobile-nav-link">Accueil</a>
      <a href="#" class="mobile-nav-link">Collection</a>
      <RouterLink to="/contact" class="mobile-nav-link">Contact</RouterLink>
      <div v-if="user" class="mobile-nav-link user-info">
        <div>{{ user.email }}</div>
        <div class="mobile-logout" @click="handleLogout">Déconnexion</div>
      </div>
      <RouterLink v-else to="/signing" class="mobile-nav-link">Connexion</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { useCartStore } from '../stores/carte'

const router = useRouter()
const navbar = ref(null)
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const user = ref(null)
const userMenuOpen = ref(false)

const cart = useCartStore()
const cartCount = computed(() =>
  cart.items.reduce((total, item) => total + item.quantity, 0)
)

const checkScroll = () => {
  scrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    router.push('/signing')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

const closeUserMenuOnOutsideClick = (event) => {
  if (userMenuOpen.value && !event.target.closest('.user-section')) {
    userMenuOpen.value = false
  }
}

const fetchUserData = async () => {
  try {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  window.addEventListener('click', closeUserMenuOnOutsideClick)
  checkScroll()
  fetchUserData()

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null
  })

  cart.loadFromLocalStorage()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
  window.removeEventListener('click', closeUserMenuOnOutsideClick)
})
</script>

<style scoped>
/* Position badge sur icône panier */
.cart-icon-wrapper {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color:#4a919e;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}

/* Reste du style utilisateur / responsive */
.user-section {
  position: relative;
  cursor: pointer;
}
.user-email {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  padding: 5px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: white;
}
.user-email:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.user-arrow {
  font-size: 18px;
  margin-left: 3px;
}
.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 1000;
}
.user-menu-item {
  padding: 10px 15px;
  transition: background-color 0.2s;
  cursor: pointer;
}
.user-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.user-info {
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.mobile-logout {
  margin-top: 8px;
  color: #d32f2f;
  font-weight: 500;
  cursor: pointer;
}
</style>
