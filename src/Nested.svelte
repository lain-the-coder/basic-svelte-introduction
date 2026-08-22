<script>
  import { auth } from "./Auth.svelte";
</script>

<div>
  <h4>Nested Component (Sidebar / Header view)</h4>
  <p>Active User: {auth.user}</p>
  <p>Active Role: {auth.role}</p>
</div>
