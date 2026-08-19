<script>
  import Nested from "./Nested.svelte";
  let items = $state(["Apple", "Banana"]);
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
  let count = $state(0);
  function increment() {
    count += 1;
  }
  function mutation() {
    items.push("Cherry");
    items[1] = "Avacado";
  }
</script>

<h1>Welcome, {name.toUpperCase()}</h1>
<Nested></Nested>
<p>{@html string}</p>
<button onclick={increment}>
  Button Clicks: {count}
</button>
<button onclick={mutation}>
  Mutated variable: {items.join(" , ")}
</button>
