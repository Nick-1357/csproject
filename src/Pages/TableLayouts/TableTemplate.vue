<template>
  <div>
    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/content_image/add_content" class="route__link">AI Content Generation</router-link>
          / View All
        </p>
      </div>

      <!-- nextable flexbox row col -->
      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <div class="search input-group" style="">
              <span class="input-group-prepend">
                <div class="input-group-text bg-transparent">
                  <span class="material-icons-outlined">search</span>
                </div>
              </span>
              <input type="search" id="form1" class="form-control border-left-0" placeholder="Search" autocorrect="off" autocomplete="off" />
            </div>
          </div>
          <div class="ms-auto">
            <button class="btn btn-primary">Add Content</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col profile"><p>Profile</p></div>
            <div class="col"><p>Campaign Name</p></div>
            <div class="col"><p>Project Name</p></div>
            <div class="col"><p>Type</p></div>
            <div class="col"><p>Created By</p></div>
            <div class="col"><p>Create/Update Date</p></div>
            <div class="col action"><p>Action</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="n in 10" :key="n">
              <div class="col profile">
                <img :src="require(`@/assets/icons/icon-blogwriting-blue.svg`)" alt="" class="profile__icon" />
              </div>
              <div class="col campaign">
                <p>Demo Campaign</p>
                <div class="status">
                  <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                  <p class="status__text">pending</p>
                </div>
              </div>
              <div class="col"><p>Demo Project</p></div>
              <div class="col"><p>Demo</p></div>
              <div class="col"><p>Name</p></div>
              <div class="col date"><p>6 Apr 2023</p></div>
              <div class="col action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <span class="star"><span class="material-icons-outlined">star_border</span>Star</span>
                    <span class="edit"><span class="material-icons-outlined">edit</span>Edit</span>
                    <span class="move"><span class="material-icons-outlined">unfold_more</span>Move</span>
                    <span class="delete"><span class="material-icons-outlined">delete</span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- nextable table tags -->
      <div class="nexcard">
        <table class="nextable">
          <thead class="nextable__head">
            <tr>
              <!-- <th class="w-5"><p>Profile</p></th> -->
              <th class="w-20"><p>Campaign Name</p></th>
              <th class="w-20"><p>Project Name</p></th>
              <th class="w-15"><p>Type</p></th>
              <th class="w-20"><p>Created By</p></th>
              <th class="w-15"><p>Created Date</p></th>
              <th class="w-5"><p>Action</p></th>
            </tr>
          </thead>
          <tbody class="nextable__body">
            <tr v-for="n in 15" :key="n">
              <!-- <td class="profile w-5">
                <img :src="require(`@/assets/icons/icon-blogwriting-blue.svg`)" alt="" class="profile__icon" />
              </td> -->
              <td class="campaign w-20">
                <p>Demo Campaign</p>
                <div class="status">
                  <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                  <span class="status__text">pending</span>
                </div>
              </td>
              <td class="w-20"><p>Demo Project</p></td>
              <td class="w-15"><p>Demo</p></td>
              <td class="w-20"><p>Name</p></td>
              <td class="date w-15"><p>6 Apr 2023</p></td>
              <td class="action w-5">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <!-- <span class="star"><span class="material-icons-outlined">star_border</span>Star</span> -->
                    <span class="edit"><span class="material-icons-outlined">edit</span>Edit</span>
                    <span class="move"><span class="material-icons-outlined">unfold_more</span>Move</span>
                    <span class="delete"><span class="material-icons-outlined">delete</span>Delete</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "content_image_view_all",
  data() {
    return {
      n: 1,
    };
  },
};
</script>
<style lang="css" scoped>
.view-all-table-wrapper {
  position: relative;
  max-width: calc(1600px + 3rem);
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head {
  border-bottom: 1px solid #e6e6e6;
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
}
.nextable .nextable__body {
  border-bottom: 1px solid #e6e6e6;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body__collection {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body__collection {
    height: 53vh;
  }
}
.nextable .nextable__head {
  /* scroll-bar width */
  margin-right: 8px;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  /* border: 1px solid black; */
}
.nextable .nextable__head .col.profile {
  text-align: end;
  max-width: 100px;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col {
  padding: 1rem;
  align-items: center;
  display: flex;
  /* border: 1px solid black; */
}
.nextable .nextable__body .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
.nextable .nextable__body .col:last-child {
  text-align: center;
  max-width: 100px;
}
p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.col.campaign {
  display: flex;
  flex-direction: column;
  align-items: start !important;
}
.profile img {
  max-height: 35px;
  margin-top: 5px;
}
.date p {
  font-weight: normal;
}

.btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
.btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
.status {
  display: flex;
}

.status .col {
  padding: 0.2rem 0.9rem !important;
}
.status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
.status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
.profile__icon {
  margin-left: auto;
}

/* action menu css */
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-80px, -10px);
  width: 120px;
  color: #272727;
}
.action-menu:hover .action-menu-dropdown {
  display: flex;
}
.action-menu-dropdown span {
  cursor: pointer;
  user-select: none;
  padding: 0.1rem 0.5rem 0.1rem 0.2rem;
  margin: 0.1rem 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;
  color: #ff9800;
}
.action-menu-dropdown span:hover.edit {
  transition: all 0.2s ease-out;
  color: #4caf50;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
  color: #2d8fe2;
}
.action-menu-dropdown span:hover.delete {
  transition: all 0.2s ease-out;
  color: #d30000;
}

/* nextable table css */
table.nextable {
  width: 100%;
}

table.nextable tbody {
  width: 100%;
  display: block;
  overflow: auto;
}
table.nextable thead tr,
table.nextable tbody tr {
  display: table;
  width: 100%;
}
table.nextable thead tr {
  width: calc(100% - 8px);
}
table.nextable .nextable__head {
  border-bottom: 2px solid #e8e8e8;
}
table.nextable .nextable__head {
  overflow-y: scroll;
  position: relative;
  height: 10px;
}
table.nextable .nextable__head tr th {
  padding: 1rem 0.5rem;
}
table.nextable .nextable__body {
  overflow-y: scroll;
  position: relative;
}
table.nextable .nextable__body tr {
  border-bottom: 1px solid #e6e6e6;
}
table.nextable .nextable__body tr td {
  padding: 0.5rem;
  vertical-align: center;
}
@media screen and (min-height: 917px) {
  table.nextable .nextable__body {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  table.nextable .nextable__body {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  table.nextable .nextable__body {
    height: 53vh;
  }
}

table.nextable p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}

table.nextable .profile img {
  max-height: 35px;
  margin-top: 5px;
}
table.nextable .date p {
  font-weight: normal;
}

table.nextable .btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
table.nextable .btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
table.nextable .status {
  display: flex;
}

table.nextable .status .status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
table.nextable .status .status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
</style>
