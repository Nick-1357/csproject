<template>
  <div id="app">
    <router-view :key="$route.path" class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="css">
html,
body,
#app,
.view {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.btn-primary {
  border: 1px solid #2c8ee1 !important;
  background-color: #2c8ee1 !important;
  color: #ffffff;
  border-radius: 6px;
}
.btn-primary:hover {
  border: 1px solid #0379e0 !important;
  background-color: #0379e0 !important;
  color: #ffffff;
  border-radius: 6px;
}
.btn-primary-outlined {
  border: 1px solid #2c8ee1 !important;
  background-color: #ffffff !important;
  border-radius: 6px !important;
  color: #2c8ee1 !important;
}
.btn-grey-outlined {
  border: 1px solid #bcbdbc !important;
  background-color: #ffffff !important;
  color: #888888 !important;
}
.btn-grey-outlined:hover {
  background-color: #efefef !important;
  color: #888888 !important;
}
.btn-grey-outlined.active {
  border: 1px solid #bcbdbc !important;
  background-color: #bcbdbc !important;
  color: #4a4a4a !important;
}

.btn-arrow-icon {
  height: 38px;
  width: 38px;
  display: grid;
  place-items: center;
}
.br-r {
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: 0 !important;
}
.br-l {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
  border-right: 0 !important;
}
.br-0 {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.btn-primary-outlined:hover {
  border: 1px solid #0379e0 !important;
  background-color: #0379e0 !important;
  border-radius: 6px !important;
  color: #ffffff !important;
}
.btn-red {
  border: 1px solid #d21617 !important;
  background-color: #d21617 !important;
  color: #ffffff;
  border-radius: 6px;
}
.btn-red:hover {
  border: 1px solid #ac1313 !important;
  background-color: #ac1313 !important;
  color: #ffffff;
  border-radius: 6px;
}
.app-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* sidebar always expand option */
  margin-left: 5rem;
  /*  */
}
#app {
  font-family: "Inter", "Roboto", "Arial", "san-serif";
  /* font-family: "Roboto", Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  background: #ffffff;
  display: flex;
}
#app::-webkit-scrollbar {
  display: none;
}
#app ::selection {
  /* Change highlight background color to black */
  background: #60c0f7;
  /* Change highlight text color to red */
  color: white;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c8de0;
  border-radius: 5px;
  border-left: 3px solid white;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
  cursor: pointer;
}
.modal::-webkit-scrollbar-thumb {
  background: #2c8de0;
  border-radius: 5px;
  border-left: 3px solid #7f7f7f;
  border-top: 3px solid #7f7f7f;
  border-bottom: 3px solid #7f7f7f;
  cursor: pointer;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #479bea;
  border-left: 5px solid #479bea;
  border-top: 5px solid #479bea;
  border-bottom: 5px solid #479bea;
}

@media screen and (max-width: 650px) {
  .row {
    line-height: 60%;
  }
}

@media screen and (max-width: 575px) {
  .row {
    line-height: 50%;
  }
}

button {
  cursor: pointer;
  appearance: none;
  border: transparent;
  outline: none;
  background: none;
}

:root {
  --sidebar-bg-colour: #ffffff;
  --sidebar-item-hover: #dce8f6;
  --sidebar-item-active: #013d82;
  --light: #f1f5f9;
  --white: #ffffff;
  --primary: #0e80ec;
  --sidebar-width: 250px;
  --color-primary: #2d8ee3;
  --color-primary-light: #d9e6f5;
  --color-darkgreen: #183b1c;
  --color-muted: #6c757d;
  --color-darkgrey: #333333;
}
.td-none {
  text-decoration: none;
  color: inherit;
}
.text-primary {
  color: var(--color-primary) !important;
}
.text-darkgrey {
  color: var(--color-darkgrey) !important;
}
.text-darkgreen {
  color: #183b1c;
}
.tooltip.b-tooltip-primary .tooltip-inner {
  background-color: #2289e3 !important;
}

p,
span,
th,
td,
h1,
h2,
h3,
h4,
h5,
h6 {
  /* font-family: "Roboto" ,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  /* font-family: "Open Sans"; */
  font-family: "Inter", "Roboto", "Arial", "san-serif";
}
.vue-country-select .dropdown-list {
  overflow-x: hidden !important;
  width: 420px !important;
}
.input-border {
  border: 1px solid rgb(164, 164, 164);
}
/* date picker style */
.b-form-datepicker .dropdown-menu {
  background-color: #e6e6e6;
  /* border: 1px solid #2C8DE0; */
}
.b-form-datepicker .btn svg {
  fill: #2c8de0;
}
.b-form-datepicker .btn:hover {
  background-color: #c8c8c8;
}
.b-form-btn-label-control.form-control > .btn:hover {
  background-color: #fff;
}
/* sidebar right popover style */

.sidebar-right__popover {
  border: 1px solid transparent !important;
  background-color: #dce8f6 !important;
  translate: -10px 0px;
}

.sidebar-right__popover.info {
  translate: -10px -33px;
}
.sidebar-right__popover .popover-body {
  padding: 0.6rem 1rem 0.4rem !important;
  color: #6c6c6c !important;
  font-weight: 600;
  height: 42px;
}

/* custom popover */
.custom__popover {
  border: 1px solid transparent !important;
  background-color: #dce8f6 !important;
  translate: 10px 0px;
}
.custom__popover .popover-body {
  padding: 0.6rem 1rem 0.4rem !important;
  color: #6c6c6c !important;
  font-weight: 600;
  height: 42px;
}
/* route link css */
.route__linkpath p {
  display: flex;
  align-items: center;
}
.route__linkpath .btn-back {
  margin-right: 0.3rem;
  font-size: 26px;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0.1rem;
  border-radius: 50%;
  transition: 0.4s ease-out;
  color: #013d82;
}
.route__linkpath .btn-back:hover {
  border: 2px solid #013d82;
  transition: 0.4s ease-out;
}
.route__link {
  text-decoration: none;
  color: #6c757d;
}
.route__link:hover {
  text-decoration: none;
  color: #4f555b;
  text-decoration: underline;
  transition: all 0.5s ease-out;
}

/* user select none */
.us-0 {
  user-select: none;
}

/* font weight 600 */
.fw-600 {
  font-weight: 600;
}

/* card inputs */
.card__inputbody {
  margin: 0 auto;
  padding: 2rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}
.modal-card__title {
  color: #355239;
  font-weight: bold;
  margin: 1rem 0rem;
}
.card_inputgroup {
  display: flex;
  align-items: center;
  color: #355239;
  margin: 1rem 0;
}

.card_inputgroup__title {
  min-width: 200px;
  font-weight: bold;
}
.card_inputgroup__input {
  width: 100%;
}
.card_inputgroup__title .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}
.card_inputgroup__radio {
  display: flex;
  justify-content: start;
  margin-right: -1rem;
  user-select: none;
}
.card_inputgroup__radio .form-check .form-check-input {
  visibility: hidden;
}
.card_inputgroup__radio .form-check .form-check-label {
  transform: translate(-24px, 0px);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background-color: var(--white);
  border-radius: 20px;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
}
.card_inputgroup__radio .form-check .form-check-label:hover {
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  transition: all 0.3s ease-out;
}
.card_inputgroup__radio
  .form-check
  .form-check-input:checked
  ~ .form-check-label {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--white);
  transition: all 0.3s ease-out;
}

.page-wrapper-xl {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
.page-wrapper-lg {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
/* TODO: set page wrapper classes */
/* .page-wrapper-lg {
  position: relative;
  max-width: 1200px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
} */

/* additional width classes */
.w-5 {
  width: 5% !important;
}
.w-7-5 {
  width: 7.5% !important;
}
.w-10 {
  width: 10% !important;
}
.w-15 {
  width: 15% !important;
}
.w-20 {
  width: 20% !important;
}
.w-25 {
  width: 25% !important;
}
.w-30 {
  width: 30% !important;
}
.w-35 {
  width: 35% !important;
}
.w-40 {
  width: 40% !important;
}
.w-50 {
  width: 50% !important;
}
.w-55 {
  width: 55% !important;
}
.w-60 {
  width: 60% !important;
}
.w-70 {
  width: 70% !important;
}
.w-80 {
  width: 80% !important;
}
.w-85 {
  width: 85% !important;
}
.w-90 {
  width: 90% !important;
}
.w-120px {
  width: 120px !important;
}
.w-150px {
  width: 150px !important;
}

.cursor-pointer {
  cursor: pointer;
}
/* modal radio group */
.b-form-radio-buttons {
  display: flex;
}
.b-form-radio-buttons .btn-group > .btn {
  flex: none;
}
.b-form-radio-buttons input {
  display: none;
}
.b-form-radio-buttons .btn-primary {
  border: 1px solid var(--color-primary) !important;
  color: var(--color-primary) !important;
  background-color: var(--white) !important;
  border-radius: 20px !important;
  padding: 0.2rem 0.8rem !important;
  cursor: pointer !important;
  user-select: none !important;
}
.b-form-radio-buttons .btn-primary:not(:first-child) {
  margin-left: 0.5rem !important;
}
.b-form-radio-buttons .btn-primary:hover {
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  transition: all 0.3s ease-out;
}
.b-form-radio-buttons .btn-primary.active {
  background-color: var(--color-primary) !important;
  border: 1px solid var(--color-primary) !important;
  color: var(--white) !important;
  transition: all 0.3s ease-out !important;
}

/* screenshot */
.screenshot_web__img-wrapper {
  object-fit: cover;
  border: 1px solid #9a9a9a;
  background-color: #e8e8e8;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.screenshot_web__img-wrapper .expandable-image img {
  border-radius: 10px;
  max-height: 350px !important;
}

/*  */
.nextable td span img {
  max-width: 150px;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.table td span img {
  max-width: 150px;
  object-fit: contain;
  display: block;

  margin-left: auto;
  margin-right: auto;
}

.h-38px {
  height: 38px !important;
}

.border-blue {
  border: 1px solid #2c8ee1 !important;
  height: 38px !important;
}

/* input css */
.search.input-group {
  padding-bottom: 0px;
  height: 38px !important;
}
.search.input-group .input-group-text {
  padding-right: 0rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;

  border-right: 0;
  height: 38px;
}
/* .input-group .input-group-text .material-icons-outlined{
  color: #2C8EE1;
} */
.search.input-group input {
  border-left: 0;
}

.search.input-group input:focus {
  border-color: #ced4da;
  border-left: 0;
  box-shadow: none;
}
.search.input-group:focus-within {
  border-radius: 0.375rem;
}
/* Content Editor Tooltips */
.ql-size:hover::after {
  content: "Font Size";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  font-weight: 400;
}
.ql-font:hover::after {
  content: "Font";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  font-weight: 400;
}
.ql-header:hover::after {
  content: "Formatting";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  font-weight: 400;
}
.ql-bold:hover::after {
  content: "Bold";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
}
.ql-italic:hover::after {
  content: "Italic";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
}
.ql-underline:hover::after {
  content: "Underline";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
}
.ql-strike:hover::after {
  content: "Strikethrough";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
}
.ql-color:hover::after {
  content: "Text Color";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-background:hover::after {
  content: "Text Highlight";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-list[value="ordered"]:hover::after {
  content: "Ordered List";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-list[value="bullet"]:hover::after {
  content: "Bullet List";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-indent[value="+1"]:hover::after {
  content: "Indent";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-indent[value="-1"]:hover::after {
  content: "Indent Reverse";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-align.ql-icon-picker .ql-picker-label[aria-expanded="false"]:hover::after {
  content: "Text Align";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-align .ql-picker-item:first-child:hover::after {
  content: "Text Align Left";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-align .ql-picker-item:nth-child(2):hover::after {
  content: "Text Align Center";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-align .ql-picker-item:nth-child(3):hover::after {
  content: "Text Align Right";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-align .ql-picker-item:nth-child(4):hover::after {
  content: "Text Align Justify";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-link:hover::after {
  content: "Add Hyperlink";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
.ql-image:hover::after {
  content: "Add Image";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}

.ql-video:hover::after {
  content: "Add Video";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}

.ql-code-block:hover::after {
  content: "Code Block";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}

.ql-clean:hover::after {
  content: "Remove Styling";
  color: white;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  background-color: #2289e3;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 400;
}
</style>
