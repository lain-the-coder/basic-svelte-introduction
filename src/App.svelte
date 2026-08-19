<script>
  import Nested from "./Nested.svelte";
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
</script>

<h1>Welcome, {name.toUpperCase()}</h1>
<Nested></Nested>
<p>{@html string}</p>
