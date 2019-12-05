<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">Gu-Calender</b-navbar-brand>

        <b-navbar-toggle target="nav-header-collapse"></b-navbar-toggle>

        <b-collapse id="nav-header-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
    <div id="footer">
      <b-navbar toggleable="md" type="light" variant="light">
        <b-navbar-brand href="#">Gu-Calender</b-navbar-brand>

        <b-navbar-toggle target="nav-footer-collapse"></b-navbar-toggle>

        <b-collapse id="nav-footer-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-text id="footer-text">Designed and built by <strong>Chenyu</strong>, <strong>Haoyang</strong> and <strong>Xiang</strong>.</b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#footer-text {
  text-align: center;
}
</style>
