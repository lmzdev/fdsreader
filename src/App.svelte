<script>
  import Converter from "./lib/converter";
  import Footer from "./components/Footer.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";

  let fdsOutput = "";
  let fdsInput = "";

  function clickConvert() {
    const c = new Converter(fdsInput);
    fdsOutput = c.toString();
    console.log(c.fdsObject);
  }
  function copyContent() {
    navigator.clipboard.writeText(fdsOutput);
  }
</script>

<main>
  <div class="container-top container">
    <h1>FDS Reader</h1>
    <textarea
      placeholder="Inhalt der FDS-Datei hier einfügen..."
      rows={fdsOutput !== "" ? 3 : 8}
      bind:value={fdsInput}
      class="text-code"
    />
    <button on:click={clickConvert} disabled={!Converter.validate(fdsInput)}>
      Konvertieren
    </button>
  </div>
  <div class="container container-bot">
    <article
      style="visibility: {fdsOutput !== '' ? 'visible' : 'hidden'};"
      class="text-code"
    >
      <button
        on:click={copyContent}
        class="copy-btn outline secondary"
        data-tooltip="Kopieren"><Copy size={20} /></button
      >
      {fdsOutput}
    </article>
  </div>
  <Footer />
</main>

<style lang="css">
  .copy-btn {
    font-family: var(--font-family);
    position: absolute;
    right: 26px;
    top: 56px;
    width: 42px;
    height: 42px;
    padding: 0px;
  }

  @media screen and (max-width: 1200px) {
    .copy-btn {
      visibility: collapse;
    }
  }

  .container-top {
    max-width: 960px;
    padding: 2px 8px;
  }
  .container-bot {
    max-width: 1800px;
    overflow-x: auto;
    position: relative;
    padding: 0px 8px;
  }

</style>
