<template>
  <div>
    <select
      class="select_line"
      v-model="selectedItem"
      @change="handle_change"
    >
      <option :id="0" value="" >Please select</option>
      <option v-for="item in items" :key="item.id">{{item.text}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    items: [Array, []]
  },
  data(){
    return {
      selectedItem: "",
    }
  },
  methods: {
    handle_change(){
      this.$emit("changed", this.selectedItem)
    }
  },
  watch:{
    items(){
      if(this.items.length == 0){
        this.selectedItem = "";
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .select_line{
    background-color: transparent;
    border: 1px solid black;
    border-radius: 20px;
    padding: 5px 20px;
    min-width: 300px;
    min-height: 40px;
    outline: none;
  }
</style>
