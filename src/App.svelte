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

  let changeRequests = $state([
    { id: 101, title: "Database Migration", status: "Approved" },
    { id: 102, title: "Token Auth Refactor", status: "Pending" },
    { id: 103, title: "Add SSL Middleware", status: "Initiated" },
  ]);

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

  function removeFirstRecord() {
    changeRequests.shift();
  }

  function addRecord() {
    const newId = Date.now();
    changeRequests.push({
      id: newId,
      title: `Patch Fix #${changeRequests.length + 1}`,
      status: "Initiated",
    });
  }
</script>

<h1>Welcome, {name.toUpperCase()}</h1>

{#if auth.isLoggedIn}
  <div>
    <p>Signed in as: <strong>{auth.user}</strong> (Role: {auth.role})</p>
    <button onclick={LogOut}>Log Out</button>
  </div>
{:else}
  <div>
    <p>You are currently browsing as a Guest.</p>
    <button onclick={LogIn}>Log In as Admin</button>
  </div>
{/if}

<hr />

<!-- Child: Overrides defaults, passes live 'price' state, and binds parent callback -->
<Nested
  title="Live Inventory Unit"
  category="Electronics"
  currentPrice={price}
  onNotify={handleChildNotification}
/>

<p>Parent received from child: <strong>{messageFromChild}</strong></p>

<hr />

<h3>Change Requests Table (Keyed Loop)</h3>

<button onclick={addRecord}>+ Add Request</button>
<button onclick={removeFirstRecord}>Remove Top Request</button>

<ul>
  {#each changeRequests as cr (cr.id)}
    <li>
      <!-- Multi-branch status tag -->
      {#if cr.status === "Approved"}
        <span>[FINALIZED]</span>
      {:else if cr.status === "Pending"}
        <span>[AWAITING REVIEW]</span>
      {:else}
        <span>[DRAFT]</span>
      {/if}

      <strong>{cr.title}</strong> (ID: {cr.id}) -

      <input placeholder="Type note for this row..." />
    </li>
  {:else}
    <!-- Fallback when array is empty -->
    <li>No change requests currently in the queue.</li>
  {/each}
</ul>

<hr />

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

<hr />
