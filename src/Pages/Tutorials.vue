<template>
  <div>
    <div class="page-wrapper-md">
      <div class="route__linkpath fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / Tutorials
        </p>
      </div>

      <h3 class="text-darkgreen mb-3">Tutorials</h3>
      <div class="nexcard">
        <!-- <div id="carouselVideoExample" class="carousel slide carousel-fade" data-mdb-ride="carousel" style="max-width: 900px; margin: 0 auto">
          <div class="carousel-indicators">
            <button type="button" data-mdb-target="#carouselVideoExample" data-mdb-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-mdb-target="#carouselVideoExample" data-mdb-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-mdb-target="#carouselVideoExample" data-mdb-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <video class="img-fluid" autoplay loop muted>
                <source src="https://mdbcdn.b-cdn.net/img/video/Tropical.mp4" type="video/mp4" />
              </video>
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>

            <div class="carousel-item">
              <video class="img-fluid" autoplay loop muted>
                <source src="https://mdbcdn.b-cdn.net/img/video/forest.mp4" type="video/mp4" />
              </video>
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            <div class="carousel-item">
              <video class="img-fluid" autoplay loop muted>
                <source src="https://mdbcdn.b-cdn.net/img/video/Agua-natural.mp4" type="video/mp4" />
              </video>
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-mdb-target="#carouselVideoExample" data-mdb-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-mdb-target="#carouselVideoExample" data-mdb-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="mt-3">
          <h3 class="text-darkgreen">Video Title</h3>
          <p>Video Description Lorem Ipsum is simply dummy text of the printing</p>
        </div>
        <div class="more-videos mt-5">
          <h5 class="mb-3 text-darkgreen">More Tutorials</h5>
          <div class="row">
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
          </div>
          <div class="row mt-3">
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
            <div class="col-3"><img src="https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg" alt="" /></div>
          </div>
        </div> -->
        <h3 class="text-darkgreen text-center">Coming Soon</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
.page-wrapper-md {
  position: relative;
  max-width: 900px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
.more-videos img {
  width: 100%;
  border: 1px solid #183b1c;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}
</style>
