<script>
  import Nested from "./Nested.svelte";
  let items = $state(["Apple", "Banana"]);
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
  let count = $state(0);
  let price = $state(5);
  let quantity = $state(10);
  let total = $derived(price * quantity);
  function increment() {
    count += 1;
  }
  function mutation() {
    items.push("Cherry");
    items[1] = "Avacado";
  }
  function increasePrice() {
    price += 5;
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
<button onclick={increasePrice}> Increase Price by 5 </button>
<p>Price: {price}</p>
<p>Quantity: {quantity}</p>
<p>Total: {total}</p>
