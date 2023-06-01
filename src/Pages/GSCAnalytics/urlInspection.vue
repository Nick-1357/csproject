<template>
  <div>
    <div class="mt-5">
      <div class="nexcard">
        <div class="d-flex mb-1">
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
            <button class="btn btn-primary d-flex align-items-center"><span class="material-icons-outlined me-2"> add </span>Add URL</button>
          </div>
        </div>

        <table class="nextable">
          <thead class="nextable__head">
            <tr>
              <th class="w-30"><p>Site URL</p></th>
              <th class="w-25"><p>Indexability</p></th>

              <th class="w-10"><p>Status</p></th>
              <th class="w-20"><p>Language</p></th>
              <th class="w-10"><p>Created Date</p></th>
              <th class="w-5"><p>Action</p></th>
            </tr>
          </thead>
          <tbody class="nextable__body">
            <tr v-for="n in 15" :key="n">
              <td class="w-30"><p>www.nexmind.ai</p></td>
              <td class="w-25"><p>Client Name</p></td>

              <td class="w-10 campaign">
                <div class="status">
                  <img :src="require(`@/assets/icons/icon-status-blocked.svg`)" alt="" class="status__icon" />
                  <span class="status__text">blocked</span>
                </div>
              </td>
              <td class="w-20"><p>Language</p></td>
              <td class="w-10 date"><p>6 Apr 2023</p></td>
              <td class="w-5 action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
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
export default {};
</script>
<style lang="css" scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
}
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
  width: calc(100% - 4px);
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
  padding: 1rem 0.5rem;
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
</style>
