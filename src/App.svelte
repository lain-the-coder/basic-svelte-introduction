<script>
  import Nested from "./Nested.svelte";
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
  let count = $state(0);
  function increment() {
    count += 1;
  }
</script>

<h1>Welcome, {name.toUpperCase()}</h1>
<Nested></Nested>
<p>{@html string}</p>
<button onclick={increment}>
  Clicks: {count}
</button>
