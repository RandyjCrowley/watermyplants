<script lang="ts">
  import { Input, Label, Button } from "flowbite-svelte";
  import type { ActionData } from "./$types";

  let username = "";
  let password = "";
  let confirm_password = "";
  let error = "";
  let success = "";

  export let form: ActionData;
  console.log(form)
</script>

<form method="post" action="?/create">
  <div class="mb-6">
    <Label for="username" class="mb-2">Username</Label>
    <Input
      type="text"
      id="username"
      name="username"
      placeholder="Enter username"
      bind:value={username}
      required
    />
  </div>

  <div class="mb-6">
    <Label for="password" class="mb-2">Password</Label>
    <Input
      autocomplete="on"
      type="password"
      id="password"
      name="password"
      placeholder="Enter password"
      bind:value={password}
      required
    />
  </div>

  <div class="mb-6">
    <Label for="confirm_password" class="mb-2">Confirm Password</Label>
    <Input
      autocomplete="on"
      type="password"
      id="confirm_password"
      name="confirm_password"
      placeholder="Enter password"
      bind:value={confirm_password}
      required
    />
  </div>

  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}

  {#if success}
    <p class="text-green-500">{success}</p>
  {/if}

  <Button type="submit">Register</Button>
</form>
