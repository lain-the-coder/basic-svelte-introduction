<script>
  import Nested from "./Nested.svelte";
  import { auth, LogIn, LogOut } from "./Auth.svelte";

  let items = $state(["Apple", "Banana"]);
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
  let count = $state(0);
  let price = $state(5);
  let quantity = $state(10);
  let total = $derived(price * quantity);
  let secondsActive = $state(0);

  $inspect(items).with((type, value) => {
    console.log("items updated to: ", value);
  });

  // mount once effect use
  $effect(() => console.log("im learning effects!!"));
  function increment() {
    count += 1;
  }

  // timer with effect
  $effect(() => {
    const timer = setInterval(() => (secondsActive += 1), 1000);
    return () => {
      clearInterval(timer);
    };
  });

  function mutation() {
    items.push("Cherry");
    items[1] = "Avacado";
  }

  function increasePrice() {
    price += 5;
    console.log("New price", $state.snapshot(price));
  }
</script>

<h1>Welcome, {name.toUpperCase()}</h1>

<!-- Shared state read inside child component -->
<Nested></Nested>

<!-- Shared state read and controlled in parent component -->
<div>
  <h3>Auth Module (Universal Reactivity)</h3>
  <button onclick={LogIn}>Log In as Admin</button>
  <button onclick={LogOut}>Log Out</button>
</div>

<p>{@html string}</p>
<p>Active Session: {secondsActive}</p>

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
