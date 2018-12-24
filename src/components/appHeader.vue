<script>
export default {
  name: 'appHeader',
}
</script>

<template>
  <div class='bgc-mild-blue'>
    <div class="d-f mh-48 pv-6 tc-w w-100">
      <div class="fs-75 fw-b">V</div>
      <div class="as-c fs-30 tc-w">
        <div class="pl-3">Care</div>
        <div class="ml-n11 pl-3">Health</div>
      </div>      
      <ul class="ai-fe d-f fs-16 fw-b jc-se mb-12 w-50">
        <li><a href="/home" v-on:click.prevent="">Home</a></li>
        <li><a href="/plan" v-on:click.prevent="">Plan Information</a></li>
        <li class="td-u"><a href="/payments" v-on:click.prevent="">Payments</a></li>
        <li><a href="/profile" v-on:click.prevent="">Profile</a></li>
      </ul>
    </div>
  </div>
</template>