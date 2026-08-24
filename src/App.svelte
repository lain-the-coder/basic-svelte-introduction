<script>
  import Nested from "./Nested.svelte";
  import { auth, LogIn, LogOut } from "./Auth.svelte";
  import EsigModal from "./EsigModal.svelte";

  let items = $state(["Apple", "Banana"]);
  let name = "lain";
  let string = `this is body with some <strong>HTML!!!</strong>`;
  let count = $state(0);
  let price = $state(5);
  let quantity = $state(10);
  let total = $derived(price * quantity);
  let secondsActive = $state(0);
  let newTitle = $state("");

  let changeRequests = $state([
    { id: 101, title: "Database Migration", status: "Approved" },
    { id: 102, title: "Token Auth Refactor", status: "Pending" },
    { id: 103, title: "Add SSL Middleware", status: "Initiated" },
  ]);

  // State to capture plain data sent upward by the child
  let messageFromChild = $state("No message yet");

  let selectedRecord = $state(null);

  let showSignModal = $state(false);
  let targetCR = $state(null);
  let auditLog = $state("No approvals performed yet.");

  // Opens modal targeting a specific row
  function openSignModal(cr) {
    targetCR = cr;
    showSignModal = true;
  }

  // Callback executed when modal confirms
  function handleSignConfirm(signerComment) {
    if (targetCR) {
      targetCR.status = "Approved";
      auditLog = `Approved CR-${targetCR.id} ("${targetCR.title}") with comment: "${signerComment}" by ${auth.user}`;
    }
    showSignModal = false;
    targetCR = null;
  }

  function handleSignCancel() {
    showSignModal = false;
    targetCR = null;
  }

  function inspectRecord(cr) {
    selectedRecord = cr;
  }

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

  function handlerSubmit(e) {
    // 1. Stop the browser from wiping the page and reloading
    e.preventDefault();

    // 2. Validate input is not empty
    if (!newTitle.trim()) return;

    // 3. Add to reactive state array
    changeRequests.push({
      id: Date.now(),
      title: newTitle,
      status: "Initiated",
    });

    // 4. Clear the text input field
    newTitle = "";
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

{#if showSignModal}
  <EsigModal
    meaning={`Submit Approval for: ${targetCR?.title}`}
    onConfirm={handleSignConfirm}
    onCancel={handleSignCancel}
  />
{/if}

<p>Audit Trail: <em>{auditLog}</em></p>
<hr />

<form onsubmit={handlerSubmit}>
  <label>
    <strong>Create Change Request: </strong>
    <input
      type="text"
      placeholder="Enter request title..."
      value={newTitle}
      oninput={(e) => (newTitle = e.target.value)}
    />
  </label>
  <button type="submit">Submit Request</button>
</form>

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
<button onclick={removeFirstRecord}>Remove Top Request</button>

<ul>
  {#each changeRequests as cr (cr.id)}
    <li>
      {#if cr.status === "Approved"}
        <span>[FINALIZED]</span>
      {:else if cr.status === "Pending"}
        <span>[AWAITING REVIEW]</span>
      {:else}
        <span>[DRAFT]</span>
      {/if}

      <strong>{cr.title}</strong> (ID: {cr.id}) -

      <button onclick={() => inspectRecord(cr)}>Inspect</button>

      <!-- 🔹 PART 3: Sign button only for non-approved records -->
      {#if cr.status !== "Approved"}
        <button onclick={() => openSignModal(cr)}>Sign & Approve</button>
      {/if}

      <input placeholder="Type note for this row..." />
    </li>
  {:else}
    <li>No change requests currently in the queue.</li>
  {/each}
</ul>

{#if selectedRecord}
  <div>
    <h4>Currently Inspecting Record:</h4>
    <p>ID: {selectedRecord.id}</p>
    <p>Title: {selectedRecord.title}</p>
    <p>Status: {selectedRecord.status}</p>

    <!-- Inline arrow handler to reset state -->
    <button onclick={() => (selectedRecord = null)}>Close Details</button>
  </div>
{/if}

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
