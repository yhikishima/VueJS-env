<style lang="stylus">
@import './src/stylus/extends/sample'
</style>

<template>
<div class="sample">
    <div class="title">{{title}}</div>
        <div class="body">
        <img v-attr="src: logo">
        <div>{{description}}</div>
        <a href="{{url}}">{{url}}</a>
    </div>
</div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            title: "",
            logo: "",
            url: "",
            description: ""
        };
    }
};
</script>