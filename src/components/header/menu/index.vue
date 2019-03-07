<template>
	<div class="menu">
		<router-link
			v-for="link in linksArray"
			:key="link.id"
			:to="link.url"
			class="menu-item RobotoSlab"
		>{{ link.title}}</router-link>
	</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      linksArray: [
	      {
	        id: 1,
		      title: 'Media',
		      url: '/media',
	      },
        {
          id: 2,
          title: 'Digital',
          url: '/digital',
        },
        {
          id: 3,
          title: 'Social',
          url: '/social',
        },
        {
          id: 4,
          title: 'Commerce',
          url: '/commerce',
        },
        {
          id: 5,
          title: 'People',
          url: '/people',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
