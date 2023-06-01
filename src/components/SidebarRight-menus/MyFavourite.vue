<template>
  <div>
    <div class="menu-heading">
      <h4>My Favourite</h4>
    </div>
    <div class="menu-body">
      <!-- Search Bar -->
      <div class="input-wrapper">
        <div class="search input-group">
          <span class="input-group-prepend">
            <div class="input-group-text bg-transparent">
              <span class="material-icons-outlined">search</span>
            </div>
          </span>
          <input type="search" id="form1" class="form-control border-left-0" placeholder="Search"/>
        </div>
      </div>
      
      <!--  -->
      <div class="menu-favourite-collection pt-3" >

        <div class="menu-favourite py-1 d-flex">
          <div class="me-auto">
            <h6 class="fw-bold text-darkgrey">Name</h6>
            <p class="text-muted fs-small">http://url.com</p>
          </div>
          <button class="pe-0">
            <span class="material-icons-outlined">more_vert</span>
          </button>
        </div>

        <div class="menu-favourite py-1 d-flex">
          <div class="me-auto">
            <h6 class="fw-bold text-darkgrey">Name</h6>
            <p class="text-muted fs-small">http://url.com</p>
          </div>
          <button class="pe-0">
            <span class="material-icons-outlined">more_vert</span>
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyFavourite',
  data() {
    return {
      
    };
  },
}
</script>
<style lang="css">
.menu-favourite-collection{
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0rem 1rem 0rem 0rem;
}
</style>