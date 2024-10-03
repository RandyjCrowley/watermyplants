<script lang="ts">
  import { Input, Label, Button, Textarea, Select } from "flowbite-svelte";
  import type { ActionData, PageServerLoad } from "./$types";
  export let data: PageServerLoad;
  export let form: ActionData;

  console.log(data);
  let selectedSunlight = "";
  let sunlightTypes = [
    { value: 0, name: "Full Sun" },
    { value: 1, name: "Partial Sun" },
    { value: 2, name: "Partial Shade" },
    { value: 3, name: "Shade" },
    { value: 4, name: "Full Shade" },
    { value: 5, name: "Dappled Sunlight" },
    { value: 6, name: "Adaptable" },
  ];

  let selectedWaterTypes = "";
  let wateringTypes = [
    { value: 0, name: "Daily" },
    { value: 1, name: "Every Other Day" },
    { value: 2, name: "Twice a Week" },
    { value: 3, name: "Once a Week" },
    { value: 4, name: "Every 10 Days" },
    { value: 5, name: "Biweekly" },
    { value: 6, name: "Monthly" },
    { value: 7, name: "As Needed" },
  ];
</script>

<form method="post" action="?/create">
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <Label for="plant_name" class="mb-2">Plant Name</Label>
      <Input
        type="text"
        id="plant_name"
        name="plant_name"
        placeholder="Rose"
        required
      />
    </div>
    <div>
      <Label for="website" class="mb-2">Plant Wiki URL</Label>
      <Input
        type="text"
        id="website"
        name="website"
        placeholder="https://watermyplants.com/wiki"
        required
      />
    </div>
    <div class="col-span-2">
      <Label for="plant_desc" class="mb-2">Plant Description</Label>
      <Textarea
        id="plant_desc"
        placeholder="Plant description..."
        rows="4"
        name="plant_desc"
      />
    </div>
  </div>
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <Label for="sunlight_type" class="mb-2">Sun Light Type</Label>
      <Select
        id="sunlight_type"
        name="sunlight_type"
        required
        items={sunlightTypes}
        bind:value={selectedSunlight}
      />
    </div>
    <div>
      <Label for="water_type" class="mb-2">Watering Frequency</Label>
      <Select
        id="water_type"
        name="water_type"
        required
        items={wateringTypes}
        bind:value={selectedWaterTypes}
      />
    </div>
  </div>
  <div class="w-full flex justify-center mt-10">
    <Button type="submit" class="md:w-2/12 w-full">Submit</Button>
  </div>
</form>
