<script>
export default {
  name: 'PrimaryButton',
  functional: true,
  render (createElement, { data, children }) {
    return createElement('button', { class: ['btn-def'], ...data }, children)
  },
}
</script>

<style scoped lang="scss">
.btn-def {
	border-radius: 4px;
	transition: all 0.3s ease-in-out;
	display: inline-block;
	font-weight: 700;
	font-size: 1rem;
	line-height: 2.1875rem;
	padding: 6px 2.5rem;
	color: $white;
	text-align: center;
	white-space: nowrap;
	cursor: pointer;
	background-color: $gold;
	border-color: transparent;
	text-transform: uppercase;
  box-sizing: border-box;
	min-width: 184px;
  &:hover, &:focus, &:active {
    outline: none;
  }
	&:hover{
		background-color: $grey;
		}
	&:focus, &:active {
		background-color: $black;
	}
}
</style>
