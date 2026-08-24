<script>
  import { auth } from "./Auth.svelte";

  // explicitly declared props to be passed from parent
  // 3 data variables, 1 default in it
  // 1 function passed
  let { title, currentPrice, category = "General", onNotify } = $props();
</script>

<div>
  <h4>Nested Component (Sidebar / Header view)</h4>

  {#if auth.role === "Admin"}
    <p><strong>[ADMIN PRIVILEGES ACTIVE]</strong></p>
  {/if}

  <!-- Reading Global State -->
  <p>Active User: {auth.user}</p>

  <!-- Reading Props passed directly from Parent -->
  <p>Card Title: {title}</p>
  <p>Category: {category}</p>
  <p>Live Price in Child: ${currentPrice}</p>

  <!-- Child calls the parent's function, passing RAW data back up -->
  <button onclick={() => onNotify("Action completed inside child!")}>
    Send signal to Parent
  </button>
</div>
