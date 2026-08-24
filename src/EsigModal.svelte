<!-- EsigModal.svelte -->
<script>
  // 1. Receive data and callback functions from Parent
  let { meaning, onConfirm, onCancel } = $props();

  // 2. Local state to track user typing inside the modal
  let comment = $state("");
</script>

<div>
  <h4>Electronic Signature Modal</h4>
  <p>Signing Meaning: <strong>{meaning}</strong></p>

  <label>
    Signer Comment:
    <input
      type="text"
      placeholder="e.g., Verified in staging"
      value={comment}
      oninput={(e) => (comment = e.target.value)}
    />
  </label>

  <!-- Confirm button sends local comment back up to parent -->
  <button onclick={() => onConfirm(comment)}>Confirm & Sign</button>

  <!-- Cancel button runs parent's cancel handler -->
  <button onclick={onCancel}>Cancel</button>
</div>
