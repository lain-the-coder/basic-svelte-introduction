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

  // State to capture plain data sent upward by the child
  let messageFromChild = $state("No message yet");

  $inspect(items).with((type, value) => {
    console.log("items updated to: ", value);
  });

  // mount once effect use
  $effect(() => console.log("im learning effects!!"));
  function increment() {
    count += 1;
  }

  /*
  // timer with effect
  $effect(() => {
    const timer = setInterval(() => (secondsActive += 1), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  */

  function mutation() {
    items.push("Cherry");
    items[1] = "Avacado";
  }

  function increasePrice() {
    price += 5;
    console.log("New price", $state.snapshot(price));
  }

  // Parent receives raw data arguments from child execution
  function handleChildNotification(rawMessage) {
    messageFromChild = rawMessage;
  }
</script>

<h1>Welcome, {name.toUpperCase()}</h1>

<!-- Child 1: Overrides defaults, passes live 'price' state, and binds parent callback -->
<Nested
  title="Live Inventory Unit"
  category="Electronics"
  currentPrice={price}
  onNotify={handleChildNotification}
/>

<!-- Child 2: Relies on default category="General" -->
<Nested
  title="Backup Inventory Unit"
  currentPrice={price}
  onNotify={handleChildNotification}
/>

<p>Parent received from child: <strong>{messageFromChild}</strong></p>

<!-- Auth Module Controls -->
<div>
  <h3>Auth Module (Universal Reactivity)</h3>
  <p>Current User: {auth.user}</p>
  <p>Access Token: {auth.accessToken}</p>
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
